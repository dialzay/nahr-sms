import { NextResponse } from 'next/server';

export async function POST() {
  console.log('🔥 LIVE SERVER CODE EXECUTED', new Date().toISOString());
  return NextResponse.json({ ok: true });
}
