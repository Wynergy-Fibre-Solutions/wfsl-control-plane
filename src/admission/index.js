/**
 * WFSL Control Plane – Admission
 * Never throws for domain failures. Returns structured outcomes.
 */

module.exports = {
  register(entity) {
    const trace = [];

    if (!entity || typeof entity !== "object") {
      trace.push({
        node: "admission",
        decision: "DENY",
        reason_code: "ADMISSION_INVALID_ENTITY",
        reason: "Entity must be an object"
      });

      return {
        admitted: false,
        decision: "DENY",
        reason_code: "ADMISSION_INVALID_ENTITY",
        reason: "Entity must be an object",
        trace
      };
    }

    if (typeof entity.id !== "string" || entity.id.trim().length === 0) {
      trace.push({
        node: "admission",
        decision: "DENY",
        reason_code: "ADMISSION_MISSING_ID",
        reason: "Entity.id is required"
      });

      return {
        admitted: false,
        decision: "DENY",
        reason_code: "ADMISSION_MISSING_ID",
        reason: "Entity.id is required",
        trace
      };
    }

    if (typeof entity.type !== "string" || entity.type.trim().length === 0) {
      trace.push({
        node: "admission",
        decision: "DENY",
        reason_code: "ADMISSION_MISSING_TYPE",
        reason: "Entity.type is required"
      });

      return {
        admitted: false,
        decision: "DENY",
        reason_code: "ADMISSION_MISSING_TYPE",
        reason: "Entity.type is required",
        trace
      };
    }

    trace.push({
      node: "admission",
      decision: "ALLOW",
      reason_code: "ADMISSION_OK",
      reason: "Entity admitted"
    });

    return {
      admitted: true,
      decision: "ALLOW",
      reason_code: "ADMISSION_OK",
      reason: "Entity admitted",
      trace
    };
  }
};
