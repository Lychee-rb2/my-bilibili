import { basename, extname, resolve } from "node:path";
import { rm } from "node:fs/promises";
import _config from "../manifest.config";
import { createTemp, mv } from "./build-help";
import { ManifestJson } from "../src/manifest.type";
const main = async () => {
  const { build, action, background, content_scripts, ...config } = _config;
  const out = (path: string) => resolve(__dirname, "..", build.out, path);

  await Bun.build({
    entrypoints: [out("../index.ts")],
    outdir: out(""),
    target: "browser",
    minify: true,
  });

  const buildAction = async (
    folder: string,
  ): Promise<ManifestJson["action"]> => {
    await Bun.build({
      entrypoints: [resolve(folder, "index.tsx")],
      outdir: out("popup"),
      target: "browser",
      minify: true,
      naming: "[dir]/index.js",
      define: {
        ["process.env.SITE_DOMAIN"]: process.env.SITE_DOMAIN!,
      },
    });
    await mv(resolve(folder, "index.html"), out("popup/index.html"));
    return {
      default_popup: "popup/index.html",
    };
  };

  const buildBackground = async (
    entry: string,
  ): Promise<ManifestJson["background"]> => {
    await Bun.build({
      entrypoints: [entry],
      outdir: out("background"),
      target: "browser",
      minify: true,
      naming: "[dir]/index.js",
    });
    return {
      service_worker: "background/index.js",
    };
  };
  const buildScripts = async (entrypoints: string[]) => {
    const scripts = entrypoints
      .map((i) => {
        const modules = require(i);
        const matches = modules?.matches?.().filter(Boolean);
        if (!matches) return;
        return {
          matches,
          js: [`scripts/${basename(i, extname(i))}.js`],
          entrypoint: i,
        };
      })
      .filter(Boolean);
    const tempFiles = await Promise.all(
      scripts.map((path) => createTemp(path!.entrypoint)),
    );
    await Bun.build({
      entrypoints: tempFiles,
      outdir: out("scripts"),
      target: "browser",
      minify: true,
      naming: "[dir]/[name].[ext]",
    });
    await rm("./.temp", { recursive: true, force: true });
    return scripts.map((obj) => ({ js: obj!.js, matches: obj!.matches }));
  };

  const _action = await buildAction(action);
  const _background = await buildBackground(background);
  const _content_scripts = await buildScripts(content_scripts);

  const manifest = {
    ...config,
    action: _action,
    background: _background,
    content_scripts: _content_scripts,
  };
  Bun.write(out("manifest.json"), JSON.stringify(manifest));
  console.log("Build success");
};
main();
