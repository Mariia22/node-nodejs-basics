import { createGzip } from "zlib";
import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream";
import path from "path";
import { fileURLToPath } from "url";
import { access } from "fs/promises";

const compress = async () => {
  const dirname = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    "files",
  );
  const fileForZip = path.join(dirname, "fileToCompress.txt");
  const zip = path.join(dirname, "archive.gz");
  try {
    await access(fileForZip);
    pipeline(
      createReadStream(fileForZip),
      createGzip(),
      createWriteStream(zip),
      (err) => {
        if (err) {
          console.log("Pipeline failed", err.message);
        }
      },
    );
  } catch (error) {
    throw error;
  }
};

await compress();
