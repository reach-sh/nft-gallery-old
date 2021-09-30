import algosdk from "algosdk";
import { conf } from "./config";
import { NFT } from "./nft";

const client = new algosdk.Algodv2("", conf.algod, "");

export const getToken = async (assetId: number): Promise<any> => {
  return await client.getAssetByID(assetId).do();
};

export const getAssetsOfAddress = async (address: string): Promise<any> => {
  const time1 = Date.now();
  const results = await client.accountInformation(address).do();

  console.log("Got results in", Date.now() - time1);

  return Object.keys(results.assets)
    .filter((id: any) => results["assets"][id]["amount"] > 0)
    .map((id: any) => results["assets"][id]["asset-id"]);
};

export const getDetailsOfAsset = async (id: number) => {
  const token = await getToken(id);
  return await NFT.fromToken(token);
};

export const getDetailsOfAssets = async (ids: number[]) => {
  const results = [];
  for (let i = 0; i < ids.length; i++) {
    const token = await getToken(ids[i]);
    results.push(await NFT.fromToken(token));
  }

  return results;
};

export const getCollection = async (address: string, add: (n: NFT) => void): Promise<any> => {
  const time1 = Date.now();
  const results = await client.accountInformation(address).do();

  console.log("Got results in", Date.now() - time1);

  const plist = [];
  for (const a in results["assets"]) {
    if (results["assets"][a]["amount"] > 0) plist.push(getToken(results["assets"][a]["asset-id"]));
  }

  const assets = await Promise.all(plist);

  const requests = [];
  for (let i = 0; i < assets.length; i++) {
    requests.push(
      new Promise((resolve) => {
        NFT.fromToken(assets[i]).then(add).then(resolve);
      })
    );
  }

  // const collectionRequests = assets.map((a) => {
  //   return NFT.fromToken(a);
  // });

  return await Promise.all(requests);
  // return await Promise.all(collectionRequests);
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
