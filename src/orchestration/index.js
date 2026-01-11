/**
 * WFSL Control Plane – Orchestration Envelope
 * Composes admission and policy into a single command decision.
 * Deterministic. No I/O. No network.
 */

const admission = require("../admission");
const policy = require("../policy");

module.exports = {
  execute(entity, policyRule) {
    const admissionResult = admission.register(entity);

    if (!admissionResult.admitted) {
      return {
        executed: false,
        stage: "admission",
        result: admissionResult
      };
    }

    const policyResult = policy.evaluate(entity, policyRule);

    if (!policyResult.allowed) {
      return {
        executed: false,
        stage: "policy",
        result: policyResult
      };
    }

    return {
      executed: true,
      stage: "orchestration",
      timestamp: new Date().toISOString()
    };
  }
};
