import express from "express";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { z } from "zod";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";

const app = express();
app.use(express.json());

const server = new Server(
  {
    name: "job-discovery-mcp",
    version: "0.0.1",
  },
  {
    tools: {
      scan_jobs: {
        description: "Scan remote job boards",
        inputSchema: z.object({
          resumeVariant: z.enum(["US", "EU", "GULF", "ASIA"]),
          continents: z.array(
            z.enum(["NORTH_AMERICA", "EUROPE", "ASIA"])
          ),
        }),
        handler: async () => ({
          content: [
            {
              type: "text",
              text: JSON.stringify({ jobs: [] }, null, 2),
            },
          ],
        }),
      },
    },
  }
);

const transport = new StreamableHTTPServerTransport({
  app,
  path: "/mcp",
});

await server.connect(transport);

app.listen(3333, () => {
  console.log("MCP server running at http://localhost:3333/mcp");
});
