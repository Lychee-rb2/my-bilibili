import _config from "../manifest.config";
import packageJson from "../package.json";
import archiver from "archiver";
import fs from "fs";
import { resolve as pathResolve } from "node:path";

const { build } = _config;
const name = "extension.zip";

const version = packageJson.version;
const headers = {
  Accept: "application/vnd.github+json",
  Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  "X-GitHub-Api-Version": "2022-11-28",
};

const zip = () =>
  new Promise<string>((resolve, reject) => {
    const inputDirPath = pathResolve(__dirname, "..", build.out);
    const outputZipPath = pathResolve(__dirname, "..", build.out, name);
    const output = fs.createWriteStream(outputZipPath);
    const archive = archiver("zip", { zlib: { level: 9 } });
    archive.on("error", (err) => reject(err));
    archive.pipe(output);
    archive.directory(inputDirPath, false);
    archive.finalize().then(() => resolve(outputZipPath));
  });

interface GithubReleaseAsset {
  name: string;
  updated_at: string;
}

interface GithubRelease {
  upload_url: string;
  name: string;
  assets: GithubReleaseAsset[];
}

const handleResponse = async (res: Response) => {
  if (res.ok) {
    return res.json();
  } else {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }
};

const getRelease = (): Promise<GithubRelease | null> =>
  fetch(
    `${process.env.GITHUB_API_URL}/repos/${process.env.GITHUB_REPOSITORY}/releases/tags/v${version}`,
    { headers },
  ).then(handleResponse);

const createRelease = (): Promise<GithubRelease | null> =>
  fetch(
    `${process.env.GITHUB_API_URL}/repos/${process.env.GITHUB_REPOSITORY}/releases`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({
        tag_name: `v${version}`,
        name: `v${version}`,
        generate_release_notes: true,
      }),
    },
  ).then(handleResponse);

const upload = async (release: GithubRelease): Promise<GithubReleaseAsset> => {
  const outputZipPath = await zip();
  const zipFile = Bun.file(outputZipPath);
  const arrayBuffer = await zipFile.arrayBuffer();
  const uploadUrl = release.upload_url.replace(
    "{?name,label}",
    `?name=${name}`,
  );
  console.log(`ready to update zip to release ${release.name}`);
  return fetch(uploadUrl, {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/zip" },
    body: arrayBuffer,
  }).then(handleResponse);
};

const main = async () => {
  const release = await getRelease().catch(() => null);
  if (release) {
    const asset = release.assets.find((i) => i.name === name);
    if (asset) {
      console.log(
        `Version ${release.name} already have asset ${asset.name}, updated at ${asset.updated_at}`,
      );
      return;
    } else {
      const asset = await upload(release);
      console.log(
        `Version ${release.name} just upload asset ${release.name}, updated at ${asset.updated_at}`,
      );
      return;
    }
  } else {
    console.log(`Ready to create ${version}`);
    const release = await createRelease();
    if (!release) {
      throw new Error(`Create ${version} fail`);
    }
    await upload(release);
  }
};

main();
