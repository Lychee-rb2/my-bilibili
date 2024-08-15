export async function main() {
  await Bun.build({
    entrypoints: ["./src/scripts/bilibili.ts", "./src/scripts/site.ts"],
    outdir: "./out/scripts",
    target: "browser",
    minify: true,
  });
}

main();
