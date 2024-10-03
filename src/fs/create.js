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

  try {
    await access(folder).catch(async () => await mkdir(folder));
    await access(filePath)
      .then(() => console.log("FS operation failed"))
      .catch(async () => await writeFile(filePath, content));
  } catch (error) {
    console.log(error);
  }
};

await create();
