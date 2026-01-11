/**
 * WFSL Control Plane – Validation Gate
 * Minimal deterministic shape validation. No external libraries.
 */

module.exports = {
  validateCommand(command) {
    const trace = [];

    if (!command || typeof command !== "object") {
      trace.push({
        node: "validate",
        decision: "DENY",
        reason_code: "SCHEMA_INVALID_COMMAND",
        reason: "Command must be an object"
      });

      return {
        ok: false,
        decision: "DENY",
        reason_code: "SCHEMA_INVALID_COMMAND",
        reason: "Command must be an object",
        trace
      };
    }

    if (!command.entity || typeof command.entity !== "object") {
      trace.push({
        node: "validate",
        decision: "DENY",
        reason_code: "SCHEMA_MISSING_ENTITY",
        reason: "Command.entity must be an object"
      });

      return {
        ok: false,
        decision: "DENY",
        reason_code: "SCHEMA_MISSING_ENTITY",
        reason: "Command.entity must be an object",
        trace
      };
    }

    if (!command.policy || typeof command.policy !== "object") {
      trace.push({
        node: "validate",
        decision: "DENY",
        reason_code: "SCHEMA_MISSING_POLICY",
        reason: "Command.policy must be an object"
      });

      return {
        ok: false,
        decision: "DENY",
        reason_code: "SCHEMA_MISSING_POLICY",
        reason: "Command.policy must be an object",
        trace
      };
    }

    trace.push({
      node: "validate",
      decision: "ALLOW",
      reason_code: "SCHEMA_OK",
      reason: "Command shape valid"
    });

    return {
      ok: true,
      decision: "ALLOW",
      reason_code: "SCHEMA_OK",
      reason: "Command shape valid",
      trace
    };
  }
};
