interface ManifestBase {
  name: string;
  manifest_version: number;
  version: string;
  description: string;
  permissions: "cookies"[];
  host_permissions: string[];
}

export interface ManifestConfig extends ManifestBase {
  action?: string;
  background?: string;
  content_scripts: string[];
  build: {
    out: string;
  };
}

export interface ManifestJson extends ManifestBase {
  host_permissions: string[];
  action?: {
    default_popup: string;
  };
  background?: {
    service_worker: string;
  };
  content_scripts: {
    js: string[];
    matches: string[];
  }[];
}
