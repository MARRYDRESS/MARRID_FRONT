import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { person_b64 } = await req.json();

    if (!person_b64) {
      return NextResponse.json({ error: "person_b64 required" }, { status: 400 });
    }

    const garmentPath = path.join(process.cwd(), "public", "images", "body_example.jpg");
    if (!fs.existsSync(garmentPath)) {
      console.error("[tryon] garment not found:", garmentPath);
      return NextResponse.json({ error: "garment file not found" }, { status: 500 });
    }

    const garmentB64 =
      "data:image/jpeg;base64," +
      fs.readFileSync(garmentPath).toString("base64");

    const fashnRes = await fetch("https://api.fashn.ai/v1/run", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.FASHN_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model_name: "tryon-max",
        inputs: {
          model_image: person_b64,
          product_image: garmentB64,
        },
      }),
    });

    const data = await fashnRes.json();
    console.log("[tryon] run response:", JSON.stringify(data));
    return NextResponse.json(data, { status: fashnRes.status });
  } catch (err) {
    console.error("[tryon] error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
