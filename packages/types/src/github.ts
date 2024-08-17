export interface GithubReleaseAsset {
  name: string;
  updated_at: string;
  url: string;
  browser_download_url: string;
}

export interface GithubRelease {
  upload_url: string;
  name: string;
  assets: GithubReleaseAsset[];
}
