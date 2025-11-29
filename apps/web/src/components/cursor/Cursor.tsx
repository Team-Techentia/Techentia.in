"use client";
import dynamic from "next/dynamic";

// Load cursor logic only on client
const CursorContent = dynamic(() => import("./CursorContent"), { ssr: false, });

export default function Cursor() {
  return <CursorContent />;
}