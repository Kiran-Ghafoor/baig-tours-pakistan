"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity/sanity.config";

export default function StudioPage({ params }: { params: { tool: string[] } }) {
  return <NextStudio config={config} />;
}
