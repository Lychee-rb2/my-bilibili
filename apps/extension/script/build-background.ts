export async function main() {
  await Bun.build({
    entrypoints: ['./src/background/index.ts'],
    outdir: './out/background',
    target: "browser",
    minify: true
  });
}

main()
