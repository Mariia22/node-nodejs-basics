import { Worker } from "worker_threads";
import { cpus } from "os";
import { fileURLToPath } from "url";
import path from "path";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const performCalculations = async () => {
  const cpusNumber = cpus().length;
  let result = [];
  const promises = [];

  for (let i = 0; i < cpusNumber; i++) {
    const thread = new Promise((resolve, reject) => {
      const worker = new Worker(path.join(dirname, "./worker.js"));
      worker.postMessage(10 + i);
      worker.on("message", (result) => resolve(result));
      worker.on("error", reject);
      worker.on("exit", (code) => {
        if (code !== 0)
          reject(new Error(`Worker stopped with exit code ${code}`));
      });
    });
    promises.push(thread);
  }
  result = await Promise.all(promises);
  console.log(result);
};

await performCalculations();
