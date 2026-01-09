#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new Server(
  {
    name: "job-discovery-mcp",
    version: "0.0.1",
  },
  {
    tools: {
      scan_jobs: {
        description: "Scan configured remote job boards and return relevant engineering jobs based on resume variant and target continents.",
        inputSchema: z.object({
          resumeVariant: z.enum(["US", "EU", "GULF", "ASIA"]),
          continents: z.array(
            z.enum(["NORTH_AMERICA", "EUROPE", "ASIA"])
          ),
        }),
        outputSchema: z.object({
          jobs: z.array(
            z.object({
              id: z.string(),
              title: z.string(),
              company: z.string(),
              applyUrl: z.string(),
              relevanceScore: z.number(),
              relevanceReason: z.string(),
            })
          ),
        }),
        handler: async () => {
          return {
            jobs: [],
          };
        },
      },
    },
    resources: {},
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);