import algosdk from "algosdk";
import { config as conf } from "./config";
import { getStorageItem } from "./helpers";
import { NFT } from "./nft";

const client = new algosdk.Algodv2("", conf.algod, "");

type OwnerAsaIds = {
  owner: string;
  assetIds: any[];
};

export const getAssetIdsOfAddress = async (
  address: string
): Promise<OwnerAsaIds> => {
  const results = await client.accountInformation(address).do();

  // Filter the assets account has
  const assetIds = Object.keys(results.assets)
    .filter((id: any) => {
      const asset = results["assets"][id];

      if (asset["amount"] <= 0) return false;

      if (getStorageItem("blacklisted", "[]").includes(asset["asset-id"]))
        return false;

      // Filter URLs that wouldn't store image info, I'll change this later
      // if (
      //   asset["url"] === undefined ||
      //   asset["url"].match(urlMatcher).length === 0
      // ) {
      //   console.log(asset);
      //   return false;
      // }

      return true;
    })
    .map((id: any) => results["assets"][id]["asset-id"]);

  return {
    owner: address,
    assetIds,
  };
};

export const getASAById = async (assetId: number): Promise<any> => {
  return await client.getAssetByID(assetId).do();
};

export const getDetailsOfNft = async (
  owner: string,
  assetId: number
): Promise<NFT> => {
  const asa = await getASAById(assetId);
  return await NFT.fromToken(owner, asa);
};

export class NFTIterator {
  private counter: number = 0;
  private idList: { owner: string; id: number }[];
  private iterSize: number; // Number of items returned with each next()
  private done: boolean = false;

  constructor(ownerAsaIds: OwnerAsaIds[], iterSize: number) {
    this.idList = ownerAsaIds.reduce((prev: any[], list: OwnerAsaIds) => {
      const ids = list.assetIds.map((id) => ({ owner: list.owner, id }));
      return [...prev, ...ids];
    }, []);

    this.iterSize = iterSize;
  }

  isDone() {
    return this.done;
  }

  /**
   * Return next batch of NFTs
   * @returns NFTs of length <iterSize>
   */
  async next() {
    const results = [];

    for (let i = 0; i < this.iterSize; i++) {
      if (this.counter >= this.idList.length) {
        this.done = true;
        break;
      }

      const asaIdx = this.counter++;
      const { owner, id } = this.idList[asaIdx];

      const asa = await getASAById(id);
      results.push(await NFT.fromToken(owner, asa));
    }

    return results;
  }

  reset() {
    this.counter = 0;
  }
}

export const getNFTIterator = (
  ownerAsaIds: OwnerAsaIds[],
  iteratorSize: number
): NFTIterator => new NFTIterator(ownerAsaIds, iteratorSize);
