declare module "wfsl-control-plane" {
  export type Decision = "ALLOW" | "DENY" | "DEFER" | "ABSTAIN" | "ESCALATE";

  export interface PolicyRule {
    allow: boolean;
    reason?: string;
  }

  export interface Command {
    entity: {
      id: string;
      type: string;
      [k: string]: unknown;
    };
    policy: PolicyRule;
    [k: string]: unknown;
  }

  export interface TraceNode {
    node: string;
    decision: Decision;
    reason_code: string;
    reason: string;
  }

  export interface Evidence {
    system: string;
    evidence_version: string;
    ruleset_id: string;
    ruleset_version: string;
    schema_version: string;
    executed: boolean;
    decision: Decision;
    reason_code: string;
    reason: string;
    stage: string;
    timestamp: string;
    trace: TraceNode[];
    payload: unknown;
  }

  export function execute(command: Command): Evidence;
}
