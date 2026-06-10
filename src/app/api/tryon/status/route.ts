import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "id required" }, { status: 400 });
  }

  try {
    const res = await fetch(`https://api.fashn.ai/v1/status/${id}`, {
      headers: {
        Authorization: `Bearer ${process.env.FASHN_API_KEY}`,
      },
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("[tryon/status] error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
