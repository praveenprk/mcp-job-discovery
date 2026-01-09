const call = async (method, params) => {
  const res = await fetch("http://localhost:3333/mcp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: Date.now(),
      method,
      params,
    }),
  });
  return res.json();
};

await call("initialize", {});
console.log(await call("tools/list", {}));

const result = await call("tools/call", {
  name: "scan_jobs",
  arguments: {
    resumeVariant: "US",
    continents: ["NORTH_AMERICA"],
  },
});

console.log(JSON.stringify(result, null, 2));
