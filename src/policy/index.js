/**
 * WFSL Control Plane – Policy Evaluation
 * Deterministic policy decision primitive.
 * No side effects. No external state.
 */

module.exports = {
  evaluate(entity, policy) {
    if (!entity || !policy) {
      throw new Error("Entity and policy are required");
    }

    if (policy.allow === true) {
      return {
        allowed: true,
        reason: "Policy allow"
      };
    }

    return {
      allowed: false,
      reason: policy.reason || "Policy deny"
    };
  }
};
