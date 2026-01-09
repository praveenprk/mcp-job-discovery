import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

const transport = new StreamableHTTPClientTransport(
  "http://localhost:3333/mcp"
);

const client = new Client({
  name: "job-discovery-client",
  version: "0.0.1",
});

await client.connect(transport);

const result = await client.callTool("scan_jobs", {
  resumeVariant: "US",
  continents: ["NORTH_AMERICA"],
});

console.log(JSON.stringify(result, null, 2));

await client.close();
