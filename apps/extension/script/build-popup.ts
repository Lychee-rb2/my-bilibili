import { mv } from './build-help'

export async function main() {
  await Bun.build({
    entrypoints: ['./src/popup/index.tsx'],
    outdir: './out/popup',
    target: "browser",
    minify: true
  });
  await mv('./src/popup/index.html', './out/popup/index.html')
}

main()
