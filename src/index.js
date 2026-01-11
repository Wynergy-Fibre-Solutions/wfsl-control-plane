/**
 * WFSL Control Plane – Public API
 * Deterministic governance execution surface.
 */

const orchestration = require("./orchestration");
const evidence = require("./evidence");

function execute(command) {
  const result = orchestration.execute(command);
  return evidence.emit(result);
}

module.exports = {
  execute
};
