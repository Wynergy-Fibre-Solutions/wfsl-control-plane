/**
 * WFSL Control Plane – Admission Registry
 * Deterministic admission primitives.
 * No network access. No side effects.
 */

module.exports = {
  register(entity) {
    if (!entity || typeof entity !== "object") {
      throw new Error("Invalid admission entity");
    }

    return {
      admitted: true,
      timestamp: new Date().toISOString()
    };
  }
};
