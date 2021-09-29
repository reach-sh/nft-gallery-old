import { NFTMetadata } from "./nft";

export const getFromIPFS = async (url: string): Promise<NFTMetadata> => {
  try {
    const req = new Request(url);
    const resp = await fetch(req);
    const body = await resp.blob();

    return JSON.parse(await body.text()) as NFTMetadata;
  } catch (err) {
    console.error("Failed to get Metadata from IPFS:", err);
  }

  return new NFTMetadata();
};
