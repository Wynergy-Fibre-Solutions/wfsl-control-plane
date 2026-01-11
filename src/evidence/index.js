/**
 * WFSL Control Plane – Evidence Adapter
 * Always emits deterministic evidence objects.
 * No I/O. No crypto. No persistence.
 */

module.exports = {
  emit(result) {
    const now = new Date().toISOString();

    const safe = result && typeof result === "object" ? result : {
      executed: false,
      decision: "DENY",
      reason_code: "EVIDENCE_INVALID_RESULT",
      reason: "Invalid result provided to evidence emitter",
      stage: "evidence",
      trace: [],
      timestamp: now
    };

    return {
      system: "wfsl-control-plane",
      evidence_version: "1.1.0",
      ruleset_id: "wfsl-control-plane-core",
      ruleset_version: "1.1.0",
      schema_version: "1.1.0",
      executed: safe.executed === true,
      decision: safe.decision || (safe.executed ? "ALLOW" : "DENY"),
      reason_code: safe.reason_code || (safe.executed ? "OK" : "DENY"),
      reason: safe.reason || (safe.executed ? "Executed" : "Denied"),
      stage: safe.stage || "unknown",
      timestamp: safe.timestamp || now,
      trace: Array.isArray(safe.trace) ? safe.trace : [],
      payload: safe
    };
  }
};
