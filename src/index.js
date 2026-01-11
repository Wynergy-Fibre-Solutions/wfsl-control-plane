/**
 * WFSL Control Plane – Public API
 * Deterministic governance execution surface.
 */

const orchestration = require("./orchestration");
const evidence = require("./evidence");

function execute(command) {
  if (!command || typeof command !== "object") {
    throw new Error("Invalid command");
  }

  const { entity, policy } = command;

  const result = orchestration.execute(entity, policy);
  return evidence.emit(result);
}

module.exports = {
  execute
};
