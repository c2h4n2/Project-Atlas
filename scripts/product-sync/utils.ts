import { spawnSync } from "node:child_process";

export type StepResult = {
  name: string;
  ok: boolean;
  skipped?: boolean;
  command?: string;
  exitCode?: number | null;
  note?: string;
};

export function runCommand(
  name: string,
  command: string,
  args: string[],
  options?: {
    skip?: boolean;
    note?: string;
    env?: NodeJS.ProcessEnv;
  },
): StepResult {
  if (options?.skip) {
    console.log(`\nSKIP  ${name}`);
    if (options.note) console.log(`      ${options.note}`);

    return {
      name,
      ok: true,
      skipped: true,
      note: options.note,
    };
  }

  const display = [command, ...args].join(" ");

  console.log(`\nRUN   ${name}`);
  console.log(`      ${display}`);

  const result = spawnSync(command, args, {
    cwd: process.cwd(),
    env: options?.env ?? process.env,
    stdio: "inherit",
    shell: process.platform === "win32",
  });

  const ok = result.status === 0;

  console.log(`${ok ? "PASS" : "FAIL"}  ${name}`);

  return {
    name,
    ok,
    command: display,
    exitCode: result.status,
  };
}
