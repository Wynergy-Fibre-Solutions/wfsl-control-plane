/**
 * WFSL Control Plane – Policy Evaluation
 * Deterministic policy decision. Never throws for policy failures.
 */

module.exports = {
  evaluate(entity, policyRule) {
    const trace = [];

    if (!policyRule || typeof policyRule !== "object") {
      trace.push({
        node: "policy",
        decision: "DENY",
        reason_code: "POLICY_INVALID_RULE",
        reason: "Policy must be an object"
      });

      return {
        allowed: false,
        decision: "DENY",
        reason_code: "POLICY_INVALID_RULE",
        reason: "Policy must be an object",
        trace
      };
    }

    if (typeof policyRule.allow !== "boolean") {
      trace.push({
        node: "policy",
        decision: "DENY",
        reason_code: "POLICY_MISSING_ALLOW",
        reason: "Policy.allow must be boolean"
      });

      return {
        allowed: false,
        decision: "DENY",
        reason_code: "POLICY_MISSING_ALLOW",
        reason: "Policy.allow must be boolean",
        trace
      };
    }

    if (policyRule.allow === true) {
      trace.push({
        node: "policy",
        decision: "ALLOW",
        reason_code: "POLICY_ALLOW",
        reason: "Policy allow"
      });

      return {
        allowed: true,
        decision: "ALLOW",
        reason_code: "POLICY_ALLOW",
        reason: "Policy allow",
        trace
      };
    }

    trace.push({
      node: "policy",
      decision: "DENY",
      reason_code: "POLICY_DENY",
      reason: policyRule.reason || "Policy deny"
    });

    return {
      allowed: false,
      decision: "DENY",
      reason_code: "POLICY_DENY",
      reason: policyRule.reason || "Policy deny",
      trace
    };
  }
};
