import { NextResponse } from "next/server";

let identities: any[] = [];

export async function GET() {
    return NextResponse.json(identities)
}

export async function POST(req: Request) {
    const newIdentity = await req.json();
    identities.push(newIdentity);
    return NextResponse.json({ status: "ok", newIdentity})
}