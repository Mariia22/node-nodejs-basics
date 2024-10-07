import { createWriteStream } from "fs";
import { fileURLToPath } from "url";
import { access } from "fs/promises";
import path from "path";

const write = async () => {
  const file = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    "files",
    "fileToWrite.txt",
  );
  try {
    await access(file);
    const output = createWriteStream(file);
    process.stdin.pipe(output);
  } catch (error) {
    console.log(`There is no file ${error}`);
  }
};

await write();
