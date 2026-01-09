#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new Server(
  {
    name: "job-discovery-mcp",
    version: "0.0.1",
  },
  {
    tools: {},
    resources: {},
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
