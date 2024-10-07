import { ERRORMESSAGE, FOLDER } from "./const.js";
import path from "path";
import { access, readFile } from "fs/promises";

const read = async () => {
  const file = path.join(FOLDER, "fileToRead.txt");
  try {
    await access(file)
      .then(async () => {
        await readFile(file, { encoding: "utf8" })
          .then((data) => console.log(data))
          .catch((error) => {
            throw error;
          });
      })
      .catch(() => {
        throw new Error(ERRORMESSAGE);
      });
  } catch (error) {
    throw error;
  }
};

await read();
