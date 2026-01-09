import express from "express";

const app = express();
app.use(express.json());

let initialized = false;

app.post("/mcp", (req, res) => {
  const { id, method, params } = req.body;

  // 1. initialize
  if (method === "initialize") {
    initialized = true;
    return res.json({
      jsonrpc: "2.0",
      id,
      result: {
        serverInfo: {
          name: "job-discovery-mcp",
          version: "0.0.1",
        },
        capabilities: {
          tools: {},
        },
      },
    });
  }

  // 2. tools/list
  if (method === "tools/list") {
    return res.json({
      jsonrpc: "2.0",
      id,
      result: {
        tools: [
          {
            name: "scan_jobs",
            description: "Scan remote job boards",
            inputSchema: {
              type: "object",
              properties: {
                resumeVariant: {
                  type: "string",
                  enum: ["US", "EU", "GULF", "ASIA"],
                },
                continents: {
                  type: "array",
                  items: {
                    type: "string",
                    enum: ["NORTH_AMERICA", "EUROPE", "ASIA"],
                  },
                },
              },
              required: ["resumeVariant", "continents"],
            },
          },
        ],
      },
    });
  }

  // 3. tools/call
  if (method === "tools/call") {
    if (params?.name === "scan_jobs") {
      return res.json({
        jsonrpc: "2.0",
        id,
        result: {
          content: [
            {
              type: "text",
              text: JSON.stringify({ jobs: [] }, null, 2),
            },
          ],
        },
      });
    }
  }

  // fallback
  res.status(400).json({
    jsonrpc: "2.0",
    id,
    error: {
      code: -32601,
      message: "Method not found",
    },
  });
});

app.listen(3333, () => {
  console.log("MCP server running at http://localhost:3333/mcp");
});