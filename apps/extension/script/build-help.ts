export function mv(from: string, to: string) {
  return Bun.write(to, Bun.file(from))
}
