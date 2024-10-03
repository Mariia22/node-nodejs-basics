import path from "path";
import { fileURLToPath } from "url";
import { access, rename as renameFile } from "fs/promises";

const rename = async () => {
  const folder = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    "files",
  );
  const fileSource = path.join(folder, "wrongFilename.txt");
  const fileTarget = path.join(folder, "properFilename.md");
  const errorMessage = "FS operation failed";
  const errorNoEntry = "ENOENT";

  try {
    await access(fileSource).catch(() => {
      throw new Error(errorMessage);
    });

    await access(fileTarget)
      .then(async () => {
        throw new Error(errorMessage);
      })
      .catch(async (error) => {
        if (error.code === errorNoEntry) {
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
