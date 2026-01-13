export function appendAnchorEntry(entry, log) {
  if (!entry || typeof entry !== "object") {
    throw new Error("appendAnchorEntry: entry must be an object");
  }

  if (!Array.isArray(log)) {
    throw new Error("appendAnchorEntry: log must be an array");
  }

  log.push({
    ...entry,
    timestamp: new Date().toISOString()
  });

  return log;
}

export function verifyAnchorLog(log) {
  if (!Array.isArray(log)) {
    throw new Error("verifyAnchorLog: log must be an array");
  }

  return log.every(
    e =>
      typeof e === "object" &&
      typeof e.timestamp === "string"
  );
}
