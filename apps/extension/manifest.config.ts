import { ManifestConfig } from "./src/manifest.type";
import packageJson from "./package.json";
import { resolve as _resolve } from "node:path";

const resolve = (path: string) => _resolve(__dirname, "./src", path);

export default {
  build: {
    out: "out",
  },
  name: packageJson.name,
  manifest_version: 3,
  version: packageJson.version,
  description: packageJson.description,
  permissions: ["cookies"],
  host_permissions: ["<all_urls>"],
  action: resolve("./popup"),
  background: resolve("./background/index.ts"),
  content_scripts: ["./scripts/bilibili.ts", "./scripts/site.ts"].map(resolve),
} satisfies ManifestConfig;
