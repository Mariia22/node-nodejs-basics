import { ERRORMESSAGE, FOLDER } from "./const.js";
import { access, readdir } from "fs/promises";

const list = async () => {
  try {
    await access(FOLDER)
      .then(async () => {
        const files = await readdir(FOLDER);
        console.log("File's list:", files);
      })
      .catch(() => {
        throw new Error(ERRORMESSAGE);
      });
  } catch (error) {
    throw error;
  }
};

await list();
