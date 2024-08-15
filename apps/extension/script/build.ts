import { mv } from "./build-help";

main();

async function main() {
  await mv("./src/manifest.json", "./out/manifest.json");
  await import("./build-popup");
  await import("./build-script");
  await import("./build-background");
}
