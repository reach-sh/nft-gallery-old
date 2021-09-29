import algosdk from "algosdk";
import { conf } from "./config";
import { NFT } from "./nft";

const client = new algosdk.Algodv2("", conf.algod, "");

export const getToken = async (assetId: number): Promise<any> => {
  return await client.getAssetByID(assetId).do();
};

export const getCollection = async (address: string): Promise<any> => {
  const time1 = Date.now();
  const results = await client.accountInformation(address).do();

  console.log("Got results in", Date.now() - time1);

  const plist = [];
  for (const a in results["assets"]) {
    if (results["assets"][a]["amount"] > 0) plist.push(getToken(results["assets"][a]["asset-id"]));
  }

  const assets = await Promise.all(plist);

  const collectionRequests = assets.map((a) => {
    return NFT.fromToken(a);
  });

  return Promise.all(collectionRequests);
};

export const getCollectionFromAssetIds = async (ids: number[]): Promise<any> => {
  const collectionRequests = ids.map((id) => {
    return NFT.fromAssetId(id);
  });

  return Promise.all(collectionRequests);
};

export const getCollectionFromTokens = async (details: any[]): Promise<any> => {
  const collectionRequests = details.map((detail) => {
    const token = {
      index: Object.keys(detail)[0],
      params: Object.values(detail)[0],
    };
    return NFT.fromToken(token);
  });

  return Promise.all(collectionRequests);
};
