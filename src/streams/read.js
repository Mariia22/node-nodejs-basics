import { createReadStream } from "fs";
import { fileURLToPath } from "url";
import { access } from "fs/promises";
import path from "path";

const read = async () => {
  const file = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    "files",
    "fileToRead.txt",
  );
  try {
    await access(file);
    const input = createReadStream(file);
    input.pipe(process.stdout);
    input.on("error", (err) => {
      console.log("Error reading file:", err);
    });
  } catch (error) {
    console.log(`There is no file ${error}`);
  }
};

await read();
