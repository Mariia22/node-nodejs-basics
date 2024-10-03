import { ERRORMESSAGE, FOLDER, ERRORNOENTRY } from "./const.js";
import path from "path";
import { access, rename as renameFile } from "fs/promises";

const rename = async () => {
  const fileSource = path.join(FOLDER, "wrongFilename.txt");
  const fileTarget = path.join(FOLDER, "properFilename.md");

  try {
    await access(fileSource).catch(() => {
      throw new Error(ERRORMESSAGE);
    });

    await access(fileTarget)
      .then(async () => {
        throw new Error(ERRORMESSAGE);
      })
      .catch(async (error) => {
        if (error.code === ERRORNOENTRY) {
          await renameFile(fileSource, fileTarget);
        } else {
          throw error;
        }
      });
  } catch (error) {
    throw error;
  }
};

await rename();
