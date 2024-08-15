import { basename } from "node:path";
export function mv(from: string, to: string) {
  return Bun.write(to, Bun.file(from));
}

export async function createTemp(path: string) {
  const code = `import { main } from "${path}";main();`;
  const temp = `./.temp/${basename(path)}`;
  await Bun.write(temp, code);
  return temp;
}
