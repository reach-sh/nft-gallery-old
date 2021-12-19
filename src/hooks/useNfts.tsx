import { useEffect, useRef, useState } from "react";
import {
  getAssetIdsOfAddress,
  getNFTIterator,
  NFTIterator,
} from "../lib/algoHelpers";
import { NFT } from "../lib/nft";

type UseNftDefaults = {
  accs: string[];
};
function useNfts(defs: UseNftDefaults) {
  const [accs, setAccs] = useState<string[]>(defs.accs);
  const [update, setUpdate] = useState<boolean>(true);
  const [done, setDone] = useState<boolean>(false);
  const [nftIterator, setNftIterator] = useState<NFTIterator | undefined>(
    undefined
  );

  const nftIteratorRef = useRef<NFTIterator | undefined>(undefined);

  const [nfts, _setNfts] = useState<NFT[]>([]);
  const nftsRef = useRef<NFT[]>(nfts);
  const setNfts = (data: NFT[]) => {
    nftsRef.current = data;
    _setNfts(data);
  };

  const handleScroll = (e: any) => {
    const scrollHeight = window.innerHeight + window.scrollY;
    if (
      scrollHeight >= document.body.offsetHeight &&
      nftIteratorRef.current !== undefined &&
      nftIteratorRef.current !== null &&
      !nftIteratorRef.current.isDone()
    ) {
      setDone(false);
      setUpdate(true);
    }
  };

  useEffect(() => {
    const loadIterator = async () => {
      const ownerAsaIds = [];
      for (let account of accs)
        ownerAsaIds.push(await getAssetIdsOfAddress(account));

      const nftIter = getNFTIterator(ownerAsaIds, 5);
      nftIteratorRef.current = nftIter;
      setNftIterator(nftIter);
    };

    if (nftIteratorRef.current) nftIteratorRef.current.reset();
    loadIterator().then(() => {
      setNfts([]);
      setDone(false);
      setUpdate(true);
    });

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accs, setNftIterator]);

  useEffect(() => {
    const updateNfts = async () => {
      setDone(false);
      const x = [...nftsRef.current, ...(await nftIteratorRef.current!.next())];
      setNfts(x);

      setDone(true);
      setUpdate(false);
    };

    if (nftIterator && update) {
      updateNfts();
    }
  }, [update, nftIterator]);

  return { accs, setAccs, done, nftIterator, nftsRef };
}

export default useNfts;
