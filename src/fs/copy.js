import path from "path";
import { fileURLToPath } from "url";
import { access, mkdir, cp } from "fs/promises";

const copy = async () => {
  const pathToFolder = path.dirname(fileURLToPath(import.meta.url));
  const folderSource = path.join(pathToFolder, "files");
  const folderTarget = path.join(pathToFolder, "files_copy");
  const errorMessage = "FS operation failed";

  try {
    await access(folderTarget)
      .then(async () => {
        throw new Error(errorMessage);
      })
      .catch(async () => {
        await access(folderSource)
          .then(async () => {
            await mkdir(folderTarget);
            await cp(folderSource, folderTarget, { recursive: true });
          })
          .catch(async () => {
            throw new Error(errorMessage);
          });
      });
  } catch (error) {
    throw new Error(error);
  }
};

await copy();
