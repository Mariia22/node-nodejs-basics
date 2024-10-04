import { createGzip } from "zlib";
import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream";
import { access } from "fs/promises";
import { FILE, ZIP } from "./const.js";

const compress = async () => {
  try {
    await access(FILE);
    pipeline(
      createReadStream(FILE),
      createGzip(),
      createWriteStream(ZIP),
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
