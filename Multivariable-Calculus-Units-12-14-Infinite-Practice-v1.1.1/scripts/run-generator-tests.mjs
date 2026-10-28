import { spawnSync } from "node:child_process";
import { existsSync, rmSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const outputDirectory = resolve(".generator-test-dist");
const localCompiler = resolve("node_modules/typescript/bin/tsc");
rmSync(outputDirectory, { force: true, recursive: true });

const command = existsSync(localCompiler) ? process.execPath : "tsc";
const args = existsSync(localCompiler)
  ? [localCompiler, "-p", "tsconfig.generators.json"]
  : ["-p", "tsconfig.generators.json"];
const compilation = spawnSync(command, args, { encoding: "utf8", stdio: "inherit" });
if (compilation.error) throw compilation.error;
if (compilation.status !== 0) process.exit(compilation.status ?? 1);

try {
  await import(pathToFileURL(resolve(outputDirectory, "scripts/verify-generators.mjs")).href);
} finally {
  rmSync(outputDirectory, { force: true, recursive: true });
}
