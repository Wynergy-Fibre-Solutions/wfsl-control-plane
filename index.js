/**
 * WFSL Control Plane – Public API (CJS-safe)
 * Explicit named exports for TS + Node compatibility
 */

const orchestration = require("./src/orchestration");
const evidence = require("./src/evidence");

function execute(command) {
  const result = orchestration.execute(command);
  return evidence.emit(result);
}

/**
 * Explicit named export
 */
exports.execute = execute;
