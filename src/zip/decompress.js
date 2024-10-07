import { createUnzip } from "zlib";
import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream";
import { access } from "fs/promises";
import { FILE, ZIP } from "./const.js";

const decompress = async () => {
  try {
    await access(ZIP);
    pipeline(
      createReadStream(ZIP),
      createUnzip(),
      createWriteStream(FILE),
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

await decompress();
