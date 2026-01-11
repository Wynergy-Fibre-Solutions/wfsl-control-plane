/**
 * WFSL Control Plane – Orchestration Envelope
 * Composes validate + admission + policy. Never throws for domain failures.
 */

const validate = require("../validate");
const admission = require("../admission");
const policy = require("../policy");

module.exports = {
  execute(command) {
    const trace = [];

    const v = validate.validateCommand(command);
    trace.push(...v.trace);

    if (!v.ok) {
      return {
        executed: false,
        decision: v.decision,
        reason_code: v.reason_code,
        reason: v.reason,
        stage: "validate",
        trace,
        timestamp: new Date().toISOString()
      };
    }

    const entity = command.entity;
    const policyRule = command.policy;

    const a = admission.register(entity);
    trace.push(...a.trace);

    if (!a.admitted) {
      return {
        executed: false,
        decision: a.decision,
        reason_code: a.reason_code,
        reason: a.reason,
        stage: "admission",
        trace,
        timestamp: new Date().toISOString()
      };
    }

    const p = policy.evaluate(entity, policyRule);
    trace.push(...p.trace);

    if (!p.allowed) {
      return {
        executed: false,
        decision: p.decision,
        reason_code: p.reason_code,
        reason: p.reason,
        stage: "policy",
        trace,
        timestamp: new Date().toISOString()
      };
    }

    trace.push({
      node: "orchestration",
      decision: "ALLOW",
      reason_code: "ORCH_EXECUTED",
      reason: "Command executed"
    });

    return {
      executed: true,
      decision: "ALLOW",
      reason_code: "ORCH_EXECUTED",
      reason: "Command executed",
      stage: "orchestration",
      trace,
      timestamp: new Date().toISOString()
    };
  }
};
