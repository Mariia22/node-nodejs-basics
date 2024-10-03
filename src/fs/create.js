import { ERRORMESSAGE, FOLDER, ERRORNOENTRY } from "./const.js";
import { access, writeFile, mkdir } from "fs/promises";
import path from "path";

const create = async () => {
  const content = "I am fresh and young";
  const file = "fresh.txt";
  const filePath = path.join(FOLDER, file);

  try {
    await access(FOLDER).catch(async () => await mkdir(FOLDER));
    await access(filePath)
      .then(() => {
        throw new Error(ERRORMESSAGE);
      })
      .catch(async (error) => {
        if (error.code === ERRORNOENTRY) {
          await writeFile(filePath, content);
        } else {
          throw error;
        }
      });
  } catch (error) {
    throw new Error(error);
  }
};

await create();
