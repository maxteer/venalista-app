import axios, {AxiosInstance} from 'axios';

interface GithubReleaseAsset {
  url: string;
  id: number;
  node_id: string;
  name: string;
  label: null;
  content_type: string;
  state: string;
  size: number;
  download_count: number;
  created_at: string;
  updated_at: string;
  browser_download_url: string;
}

interface UpdaterVersion {
  name: string;
  downloadUrl: string;
}

interface UpdaterResponse {
  update?: UpdaterVersion;
}

export default class GithubUpdater {
  private axios: AxiosInstance;
  private currentVersion: string;
  private updateFileContentType: string;

  constructor(
    repository: string,
    currentVersion: string,
    updateFileContentType: string,
  ) {
    this.axios = axios.create({
      baseURL: `https://api.github.com/repos/${repository}`,
    });
    this.currentVersion = currentVersion;
    this.updateFileContentType = updateFileContentType;
  }

  public async response(): Promise<UpdaterResponse> {
    try {
      const response = await this.axios.get('/releases/latest');
      const {name, assets} = response.data;

      if (this.currentVersion !== name.replace('v', '')) {
        let downloadUrl = 'Not found';
        const filtered: GithubReleaseAsset[] = assets.filter(
          (asset: GithubReleaseAsset) =>
            asset.content_type === this.updateFileContentType,
        );

        if (filtered.length > 0) {
          downloadUrl = filtered[0].browser_download_url;
        }

        return {
          update: {
            name,
            downloadUrl,
          },
        };
      }
    } catch {}

    return {};
  }
}
