import { ERRORMESSAGE, FOLDER } from "./const.js";
import path from "path";
import { access, unlink } from "fs/promises";

const remove = async () => {
  const fileForRemoving = path.join(FOLDER, "fileToRemove.txt");

  try {
    await access(fileForRemoving)
      .then(async () => {
        await unlink(fileForRemoving);
      })
      .catch(() => {
        throw new Error(ERRORMESSAGE);
      });
  } catch (error) {
    throw error;
  }
};

await remove();
