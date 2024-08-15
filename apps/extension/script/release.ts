import _config from "../manifest.config";
import archiver from "archiver";
import fs from "fs";
import { resolve } from "node:path";

const { build } = _config;

const inputDirPath = resolve(__dirname, "..", build.out);

const outputZipPath = `/tmp/extension.zip`;

const output = fs.createWriteStream(outputZipPath);
const archive = archiver("zip", {
  zlib: { level: 9 },
});

archive.on("error", (err) => {
  throw err;
});

archive.pipe(output);

archive.directory(inputDirPath, false);

archive.finalize().then(() => {
  console.log(`Archive success, path: ${output}`);
});
