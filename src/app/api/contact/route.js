// src/app/api/contact/route.js
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    const endpoint = process.env.GAS_ENDPOINT; // set di .env.local
    if (!endpoint) {
      return NextResponse.json(
        { ok: false, error: "Missing GAS_ENDPOINT env" },
        { status: 500 }
      );
    }

    const upstream = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // kirim apa adanya ke Apps Script
      body: JSON.stringify(body),
      // optional: timeout sederhana
      // cache: "no-store",
      // next: { revalidate: 0 },
    });

    const text = await upstream.text(); // GAS kadang return text
    if (!upstream.ok) {
      return NextResponse.json(
        { ok: false, error: "Upstream error", detail: text },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, detail: text });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
