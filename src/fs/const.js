import path from "path";
import { fileURLToPath } from "url";

export const ERRORMESSAGE = "FS operation failed";
export const ERRORNOENTRY = "ENOENT";
export const FOLDER = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "files",
);
