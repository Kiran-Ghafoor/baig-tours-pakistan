import fs from "node:fs";
import { createClient } from "@sanity/client";

const env = {};
for (const line of fs.readFileSync(".env.local", "utf8").split("\n")) {
  const m = line.match(/^([A-Z_]+)="?(.*?)"?\s*$/);
  if (m) env[m[1]] = m[2];
}

const c = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2026-07-28",
  token: env.SANITY_API_TOKEN,
  useCdn: false,
});

const updates = [
  { id: "gal-01", caption: "Mushkpuri Top", location: "Abbottabad" },
  { id: "gal-02", caption: "Forest Trek - Mushkpuri Top", location: "Nathia Gali" },
  { id: "gal-03", caption: "Mountain Memories", location: "Naran Valley" },
  { id: "gal-04", caption: "Happy Travelers", location: "Swat Valley" },
  { id: "gal-05", caption: "Snowy Escape", location: "Murree" },
  { id: "gal-06", caption: "Into The Wild", location: "Mushkpuri Top" },
  { id: "gal-07", caption: "Little Explorer", location: "Babusar Top" },
  { id: "gal-08", caption: "Discovering the hidden Gems of the north", location: "Murree" },
  { id: "gal-09", caption: "Horse Riding in Mountains", location: "Hunza Valley" },
  { id: "gal-10", caption: "Abbottabad lake", location: "Hunza Valley" },
  { id: "gal-11", caption: "Enjoying the Scenic Views", location: "Kalam Valley" },
  { id: "gal-12", caption: "Adventure Awaits", location: "Naran" },
  { id: "gal-13", caption: "Happy Travelers", location: "Swat Valley" },
  { id: "gal-14", caption: "Chilling in the Mountains", location: "Hunza Valley" },
  { id: "gal-15", caption: "Mountain Hikers", location: "Mushkpuri Top" },
];

for (const u of updates) {
  try {
    const r = await c.patch(u.id).set({ caption: u.caption, location: u.location }).commit();
    console.log("PATCHED", u.id, "->", r.caption, "|", r.location);
  } catch (e) {
    console.error("ERR", u.id, e.message);
  }
}
