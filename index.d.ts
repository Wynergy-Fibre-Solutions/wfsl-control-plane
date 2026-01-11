declare module "wfsl-control-plane" {
  export interface Command {
    entity: Record<string, unknown>;
    policy: {
      allow: boolean;
      reason?: string;
    };
  }

  export interface Evidence {
    system: string;
    version: string;
    executed: boolean;
    stage: string;
    timestamp: string;
    payload: unknown;
  }

  export function execute(command: Command): Evidence;
}
