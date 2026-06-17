import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { dressGalleryItems, dressFilterTagOptions } from "@/src/mock/mock";
import type { DressGalleryItem } from "@/src/mock/mock";

export type RecommendBlock = {
  title: string;
  dresses: DressGalleryItem[];
};

export async function POST(req: Request) {
  try {
    const { hall, style, hashtags } = await req.json();

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" } as never,
    });

    const prompt = `당신은 웨딩 드레스 전문가입니다. 신부의 취향을 분석하여 최적의 웨딩 드레스를 추천해주세요.

신부 정보:
- 웨딩홀 분위기: ${hall || "미정"}
- 선호 드레스 스타일: ${style || "미정"}
- 스타일 키워드: ${Array.isArray(hashtags) && hashtags.length ? hashtags.join(", ") : "미정"}

아래 필터 태그 중에서 선택하여 두 가지 드레스 그룹을 추천해주세요.
사용 가능한 태그: ${dressFilterTagOptions.join(", ")}

다음 JSON 형식으로만 응답해주세요:
{
  "blocks": [
    {
      "title": "추천 설명 문장 (예: '가장 잘 어울리는 드레스는 A라인이에요')",
      "tagFilters": ["#태그1", "#태그2"]
    },
    {
      "title": "두 번째 추천 설명 문장",
      "tagFilters": ["#태그1", "#태그2"]
    }
  ]
}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    let parsed: { blocks: Array<{ title: string; tagFilters: string[] }> };
    try {
      parsed = JSON.parse(text);
    } catch {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("Gemini 응답에서 JSON을 파싱할 수 없어요");
      parsed = JSON.parse(jsonMatch[0]);
    }

    const blocks: RecommendBlock[] = parsed.blocks.slice(0, 2).map((block, i) => {
      const matched = dressGalleryItems.filter((d) =>
        d.filterTags.some((tag) => block.tagFilters.includes(tag))
      );
      const limit = i === 0 ? 2 : 4;
      return {
        title: block.title,
        dresses: matched.slice(0, limit),
      };
    });

    return NextResponse.json({ blocks });
  } catch (err) {
    console.error("Gemini recommend error:", err);
    return NextResponse.json({ error: "추천을 불러올 수 없어요" }, { status: 500 });
  }
}
