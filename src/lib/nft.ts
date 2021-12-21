import { config as conf } from "./config";
import { getFromIPFS } from "./ipfs";

const ARC3_SUFFIX = "@arc3";
const ARC3_URL_SUFFIX = "#arc3";
const METADATA_FILE = "metadata.json";

export function resolveURL(url: string | undefined): string {
  if (!url) return "-";

  const chunks = url.split("://");

  // give up
  if (chunks.length < 2) return url;

  const proto = chunks[0];

  switch (proto) {
    case "ipfs":
      return conf.ipfsGateway + chunks[1];
    case "https":
      return url;
  }

  return url;
}

export class NFT {
  public url: string = "";
  public name: string = "";
  public creator: string = "";
  public owner: string = "";
  public count: number = 0;
  public assetId: number = 0;
  public arc3: boolean = false;

  metadata: NFTMetadata | undefined = undefined;

  constructor(owner: string, args: any = {}) {
    this.owner = owner;
    Object.assign(this, args);
  }

  static async fromToken(owner: string, token: any): Promise<NFT> {
    const assetId = token.index;
    const { name, url, creator, total } = token.params;
    const metadata = await checkLocal(assetId, url);

    return new NFT(owner, {
      url: url,
      name: name,
      creator: creator,
      owner: owner,
      count: total,
      assetId: assetId,
      arc3: this.isArc3(token),
      metadata: metadata,
    });
  }

  imgURL(): string {
    const url = resolveURL(this.arc3 ? this.metadata?.image : this.url);

    if (url !== this.metadata?.image) {
      return url;
    }

    if (this.url.endsWith(METADATA_FILE)) {
      const dir = this.url.substring(0, this.url.length - METADATA_FILE.length);
      return resolveURL(dir) + this.metadata.image;
    }

    return "";
  }

  static isArc3(token: any): boolean {
    const name: string = token?.params?.name;
    const url: string = token?.params?.url;

    console.log(token.params);

    if (!name || !url) return false;

    return name.endsWith(ARC3_SUFFIX) || url.endsWith(ARC3_URL_SUFFIX);
  }
}

export class NFTMetadata {
  name: string = "";
  description: string = "";
  image: string = "";

  decimals?: number = 0;
  image_integrity?: string = "";
  image_mimetype?: string = "";
  properties?: Properties;

  constructor(args: any = {}) {
    Object.assign(this, args);
  }

  toFile(): File {
    const md_blob = new Blob([JSON.stringify({ ...this }, null, 2)], {
      type: "application/json",
    });
    return new File([md_blob], METADATA_FILE);
  }

  arc3Name(): string {
    //Max length of asset name is 32 bytes, need 5 for @arc3
    return this.name.substring(0, 27) + ARC3_SUFFIX;
  }
}

export type Properties = {
  [key: string]: string | number;
};

type NFTMetadataFields = {
  name: string;
  description: string;
  image: string;

  decimals?: number;
  image_mimetype?: string;
  image_integrity?: string;
  properties?: Properties;
};

function saveMdToLocal(assetId: number, md: NFTMetadata): NFTMetadata {
  const mdCache = JSON.parse(localStorage.getItem("mds") ?? "{}");
  const { ...fields }: NFTMetadataFields = md;

  mdCache[assetId] = { ...fields };
  localStorage.setItem("mds", JSON.stringify(mdCache));

  return md;
}

export async function checkLocal(
  assetId: number,
  url: string
): Promise<NFTMetadata> {
  const mdCache = JSON.parse(localStorage.getItem("mds") ?? "[]");
  if (!mdCache[assetId])
    return saveMdToLocal(assetId, await getFromIPFS(resolveURL(url)));

  return new NFTMetadata(mdCache[assetId]);
}
