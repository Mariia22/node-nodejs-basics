import path from "path";
import { fileURLToPath } from "url";

const DIRNAME = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "files",
);

export const FILE = path.join(DIRNAME, "fileToCompress.txt");
export const ZIP = path.join(DIRNAME, "archive.gz");
