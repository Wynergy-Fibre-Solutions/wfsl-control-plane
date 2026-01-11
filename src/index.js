/**
 * WFSL Control Plane – Unified Entry Point
 * Single deterministic execution surface.
 */

const orchestration = require("./orchestration");
const evidence = require("./evidence");

module.exports = {
  execute(command) {
    if (!command || typeof command !== "object") {
      throw new Error("Invalid command");
    }

    const { entity, policy } = command;

    const result = orchestration.execute(entity, policy);

    return evidence.emit(result);
  }
};
