import { createHash } from "crypto";
import { createReadStream } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const calculateHash = async () => {
  const file = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    "files",
    "fileToCalculateHashFor.txt",
  );
  const hash = createHash("sha256");
  const input = createReadStream(file);

  input.on("readable", () => {
    const data = input.read();
    if (data) {
      hash.update(data);
    } else {
      console.log(`${hash.digest("hex")}`);
    }
  });
};

await calculateHash();
