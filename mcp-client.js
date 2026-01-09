import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const transport = new StdioClientTransport({
  command: "node",
  args: ["mcp-server/index.js"],
});

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
