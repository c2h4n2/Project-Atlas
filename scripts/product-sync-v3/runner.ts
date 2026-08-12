import { spawnSync } from "node:child_process";

export type StageStatus = "pass" | "warn" | "fail" | "skip";
export type StageResult = {
  name: string;
  status: StageStatus;
  exitCode?: number | null;
  note?: string;
};

export function runStage(
  name: string,
  command: string,
  args: string[],
  options: { fatal?: boolean; skip?: boolean; note?: string } = {},
): StageResult {
  if (options.skip) {
    console.log(`\nSKIP  ${name}`);
    if (options.note) console.log(`      ${options.note}`);
    return { name, status: "skip", note: options.note };
  }

  console.log(`\nRUN   ${name}`);
  console.log(`      ${[command, ...args].join(" ")}`);

  const result = spawnSync(command, args, {
    cwd: process.cwd(),
    env: process.env,
    stdio: "inherit",
    shell: process.platform === "win32",
  });

  const ok = result.status === 0;
  const status: StageStatus = ok
    ? "pass"
    : options.fatal
      ? "fail"
      : "warn";

  console.log(`${status.toUpperCase()}  ${name}`);

  return {
    name,
    status,
    exitCode: result.status,
    note: options.note,
  };
}
