import { access, writeFile, mkdir } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const create = async () => {
  const content = "I am fresh and young";
  const folder = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    "files",
  );
  const file = "fresh.txt";
  const filePath = path.join(folder, file);
  const errorMessage = "FS operation failed";
  const errorNoEntry = "ENOENT";

  try {
    await access(folder).catch(async () => await mkdir(folder));
    await access(filePath)
      .then(() => {
        throw new Error(errorMessage);
      })
      .catch(async (error) => {
        if (error.code === errorNoEntry) {
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
