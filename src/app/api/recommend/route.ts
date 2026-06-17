import { NextResponse } from "next/server";
import { supabase } from "@/src/lib/supabase";

export type SupaDress = {
  id: string;
  image_url: string;
  silhouette: string;
  material: string;
  shop_name: string;
  price_range: number | null;
};

export type RecommendBlock = {
  title: string;
  dresses: SupaDress[];
};

// 이 홀을 선택하면 비즈 드레스를 우선 추천
const BEADS_HALLS = new Set(["어두운 홀", "밝은 홀", "야외 웨딩", "채플 웨딩"]);

const ZONE_LABEL: Record<string, string> = {
  shoulder: "어깨 라인",
  arm:      "팔 라인",
  chest:    "가슴·데콜테",
  abdomen:  "복부·허리",
  lower:    "하체(골반·허벅지)",
  overall:  "전체 실루엣",
};

async function attachShops(rows: { id: string; image_url: string; silhouette: string; material: string; shop_id: string }[]): Promise<SupaDress[]> {
  if (rows.length === 0) return [];
  const shopIds = [...new Set(rows.map((d) => d.shop_id))];
  const { data: shops } = await supabase.from("shops").select("id, shop_name, price_range").in("id", shopIds);
  const shopMap = new Map((shops ?? []).map((s) => [s.id, s]));
  return rows.map((d) => ({
    id: d.id,
    image_url: d.image_url,
    silhouette: d.silhouette ?? "",
    material: d.material ?? "",
    shop_name: shopMap.get(d.shop_id)?.shop_name ?? "",
    price_range: shopMap.get(d.shop_id)?.price_range ?? null,
  }));
}

async function fetchBySilhouette(silhouettes: string[], limit: number): Promise<SupaDress[]> {
  const { data: exact } = await supabase
    .from("dresses")
    .select("id, image_url, silhouette, material, shop_id")
    .in("silhouette", silhouettes)
    .limit(limit);

  if (exact && exact.length > 0) return attachShops(exact);

  const keyword = silhouettes[0] ?? "";
  const { data: like } = await supabase
    .from("dresses")
    .select("id, image_url, silhouette, material, shop_id")
    .ilike("silhouette", `%${keyword}%`)
    .limit(limit);

  if (like && like.length > 0) return attachShops(like);

  const { data: fallback } = await supabase
    .from("dresses")
    .select("id, image_url, silhouette, material, shop_id")
    .limit(limit);

  return attachShops(fallback ?? []);
}

async function fetchBeadedDresses(limit: number): Promise<SupaDress[]> {
  const { data: exact } = await supabase
    .from("dresses")
    .select("id, image_url, silhouette, material, shop_id")
    .eq("material", "비즈")
    .limit(limit);

  if (exact && exact.length > 0) return attachShops(exact);

  // DB에 비즈 데이터가 없으면 비즈 키워드를 label에서 탐색하거나 전체 폴백
  const { data: fallback } = await supabase
    .from("dresses")
    .select("id, image_url, silhouette, material, shop_id")
    .limit(limit);

  return attachShops(fallback ?? []);
}

export async function POST(req: Request) {
  const { hall, style, hashtags, silhouetteZones } = await req.json();

  // DB에 실제 존재하는 실루엣 종류 조회
  const { data: silRows } = await supabase
    .from("dresses")
    .select("silhouette")
    .not("silhouette", "is", null);

  const dbSilhouettes = [...new Set((silRows ?? []).map((r) => r.silhouette).filter(Boolean))];
  const silhouetteList = dbSilhouettes.length > 0
    ? dbSilhouettes.join(", ")
    : "A라인, 머메이드, 볼가운, 쉬스, 프린세스, 엠파이어";

  const zoneText = Array.isArray(silhouetteZones) && silhouetteZones.length
    ? silhouetteZones.map((z: string) => ZONE_LABEL[z] ?? z).join(", ")
    : "없음";

  const wantsBeads = BEADS_HALLS.has(hall);
  const beadsNote  = wantsBeads
    ? `\n- 소재 우선순위: 비즈 장식이 포함된 드레스를 첫 번째 블록에 반드시 추천할 것`
    : "";

  const prompt = `당신은 웨딩 드레스 전문가입니다. 신부의 취향과 체형 고민을 바탕으로 최적의 드레스를 추천해주세요.

[신부 정보]
- 웨딩홀 분위기: ${hall || "미정"}
- 선호 스타일: ${style || "미정"}
- 스타일 키워드: ${Array.isArray(hashtags) && hashtags.length ? hashtags.join(", ") : "미정"}
- 보완하고 싶은 부위: ${zoneText}${beadsNote}

[DB에 존재하는 실루엣 종류 - 반드시 이 목록에서만 선택]
${silhouetteList}

두 가지 드레스 그룹을 추천해주세요. 반드시 위 실루엣 목록에 있는 값만 사용하세요.
설명 없이 JSON만 출력하세요:
{
  "blocks": [
    {
      "title": "추천 이유를 담은 자연스러운 한국어 문장",
      "silhouettes": ["위 목록의 실루엣값"],
      "material": "비즈 또는 null"
    },
    {
      "title": "두 번째 추천 문장",
      "silhouettes": ["위 목록의 실루엣값"],
      "material": null
    }
  ]
}`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0 },
        }),
      }
    );

    if (!res.ok) throw new Error(`Gemini ${res.status}`);

    const data = await res.json();
    const text: string = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("no json");

    const parsed = JSON.parse(jsonMatch[0]);

    const blocks: RecommendBlock[] = await Promise.all(
      parsed.blocks.slice(0, 2).map(async (
        block: { title: string; silhouettes: string[]; material?: string | null },
        i: number
      ) => {
        const limit = i === 0 ? 2 : 4;
        const useBeads = wantsBeads && i === 0 && block.material === "비즈";
        const dresses = useBeads
          ? await fetchBeadedDresses(limit)
          : await fetchBySilhouette(block.silhouettes, limit);
        return { title: block.title, dresses };
      })
    );

    return NextResponse.json({ blocks, source: "gemini" });
  } catch (err) {
    console.error("Gemini error, fallback:", err);

    // 룰 기반 폴백
    const HALL_SILHOUETTE: Record<string, string> = {
      "야외 웨딩": "A라인", "밝은 홀": "A라인", "어두운 홀": "머메이드",
      "채플 웨딩": "볼가운", "하우스 웨딩": "쉬스", "한옥 웨딩": "엠파이어",
    };
    const ZONE_SIL: Record<string, string> = {
      abdomen: "A라인", lower: "볼가운", chest: "쉬스",
      arm: "볼가운", shoulder: "볼가운", overall: "A라인",
    };

    const primary = HALL_SILHOUETTE[hall] ?? "A라인";
    const fromZone = (silhouetteZones ?? []).map((z: string) => ZONE_SIL[z]).filter(Boolean)[0];
    const best = fromZone ?? primary;
    const alt  = dbSilhouettes.find((s) => s !== best) ?? "볼가운";

    // 비즈 홀 → 첫 번째 블록은 비즈 드레스로
    const [block1, block2] = await Promise.all([
      wantsBeads ? fetchBeadedDresses(2) : fetchBySilhouette([best], 2),
      fetchBySilhouette([alt], 4),
    ]);

    const beadsTitle: Record<string, string> = {
      "어두운 홀": "어두운 홀에서 빛나는 비즈 드레스를 추천해요",
      "밝은 홀":   "밝은 홀 조명 아래 반짝이는 비즈 드레스를 추천해요",
      "야외 웨딩": "자연광 아래 빛나는 비즈 드레스를 추천해요",
      "채플 웨딩": "채플의 고즈넉한 빛과 어울리는 비즈 드레스를 추천해요",
    };

    return NextResponse.json({
      source: "fallback",
      blocks: [
        {
          title: wantsBeads
            ? (beadsTitle[hall] ?? "비즈 장식이 빛나는 드레스를 추천해요")
            : `${hall || "웨딩"} 분위기에 어울리는 ${best} 라인을 추천해요`,
          dresses: block1,
        },
        { title: `다른 느낌으로는 ${alt} 라인도 잘 어울려요`, dresses: block2 },
      ],
    });
  }
}
