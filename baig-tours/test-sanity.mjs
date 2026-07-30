import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "83xxlo2o",
  dataset: "production",
  apiVersion: "2026-07-28",
  useCdn: true,
});

const timeout = new Promise((_, reject) =>
  setTimeout(() => reject(new Error("TIMEOUT after 15s")), 15000)
);

try {
  const result = await Promise.race([
    client.fetch('*[_type == "tourPackage"][0..2]{_id, title}'),
    timeout,
  ]);
  console.log("RESULT:", JSON.stringify(result, null, 2));
} catch (e) {
  console.error("ERROR:", e.message);
}

process.exit(0);
