import { spawn } from "child_process";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const currentDirname = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);

const spawnChildProcess = async (args) => {
  const childProcess = spawn("node", [
    join(currentDirname, "files", "script.js"),
    ...args,
  ]);

  process.stdin.pipe(childProcess.stdin);
  childProcess.stdout.pipe(process.stdout);
  childProcess.stderr.on("data", (data) => {
    console.error(`Error from child process: ${data}`);
  });
  childProcess.on("close", (code) => {
    console.log(`Child process exited with code ${code}`);
  });
};

spawnChildProcess(args);
