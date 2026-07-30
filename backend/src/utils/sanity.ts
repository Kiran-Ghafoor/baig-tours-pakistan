import { createClient, type SanityClient } from "@sanity/client";
import { env } from "../config/env";

let readClient: SanityClient | null = null;
let writeClient: SanityClient | null = null;

function getClient(token?: string): SanityClient {
  return createClient({
    projectId: env.sanityProjectId,
    dataset: "production",
    apiVersion: "2026-07-28",
    useCdn: !token,
    token: token ?? env.sanityApiToken,
  });
}

export function getReadClient(): SanityClient {
  if (!readClient) readClient = getClient();
  return readClient;
}

export function getWriteClient(): SanityClient {
  if (!writeClient) writeClient = getClient(env.sanityApiToken);
  return writeClient;
}
