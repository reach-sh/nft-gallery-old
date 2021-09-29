import { getToken } from "./algoHelpers";
import { conf } from "./config";
import { getFromIPFS } from "./ipfs";

const ARC3_SUFFIX = "@arc3";
const METADATA_FILE = "metadata.json";

export function resolveURL(url: string): string {
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
  url: string;
  name: string;
  creator: string;
  owner: string;
  count: number;
  assetId: number;
  arc3: boolean;

  metadata: NFTMetadata;

  constructor(
    md: NFTMetadata,
    assetId?: number,
    name?: string,
    url?: string,
    creator?: string,
    owner?: string,
    count?: number,
    arc3?: boolean
  ) {
    this.assetId = assetId ?? 0;
    this.metadata = md;
    this.url = url ?? "";
    this.name = name ?? "";
    this.creator = creator ?? "";
    this.owner = owner ?? "";
    this.count = count ?? 0;
    this.arc3 = arc3 ?? false;
  }

  static async fromAssetId(assetId: number): Promise<NFT> {
    const token = await getToken(assetId);
    return NFT.fromToken(token);
  }

  static async fromToken(token: any): Promise<NFT> {
    const assetId = token.index;
    const { name, url, creator, manager, total } = token.params;
    const metadata = await checkLocal(assetId, url);

    return new NFT(metadata, assetId, name, url, creator, manager, total, this.isArc3(token));
  }

  imgURL(): string {
    const url = resolveURL(this.arc3 ? this.metadata.image : this.url);

    if (url !== this.metadata.image) {
      return url;
    }

    if (this.url.endsWith(METADATA_FILE)) {
      const dir = this.url.substring(0, this.url.length - METADATA_FILE.length);
      return resolveURL(dir) + this.metadata.image;
    }

    return "";
  }

  static isArc3(token: any): boolean {
    return token?.params?.name && token?.params?.name.endsWith(ARC3_SUFFIX);
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
    const md_blob = new Blob([JSON.stringify({ ...this }, null, 2)], { type: "application/json" });
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

const save = (assetId: number, md: NFTMetadata): NFTMetadata => {
  const mdCache = JSON.parse(localStorage.getItem("mds") ?? "{}");
  const { ...fields }: NFTMetadataFields = md;

  mdCache[assetId] = { ...fields };
  localStorage.setItem("mds", JSON.stringify(mdCache));

  return md;
};

export const checkLocal = async (assetId: number, url: string): Promise<NFTMetadata> => {
  const mdCache = JSON.parse(localStorage.getItem("mds") ?? "[]");
  if (!mdCache[assetId]) return save(assetId, await getFromIPFS(resolveURL(url)));

  return new NFTMetadata(mdCache[assetId]);
};
