/**
 * WFSL Control Plane – Evidence Adapter
 * Emits deterministic evidence objects for external sealing.
 * No I/O. No crypto. No persistence.
 */

module.exports = {
  emit(commandResult) {
    if (!commandResult || typeof commandResult !== "object") {
      throw new Error("Invalid command result");
    }

    return {
      system: "wfsl-control-plane",
      version: "1.0.0",
      executed: commandResult.executed === true,
      stage: commandResult.stage,
      timestamp: new Date().toISOString(),
      payload: commandResult
    };
  }
};
