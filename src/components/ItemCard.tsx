// import "react-tagsinput/react-tagsinput.css";

// import { useEffect, useState } from "react";
// import { NFT } from "../lib/nft";
// import FallbackImage from "./FallbackImage";
// import TagsInput from "react-tagsinput";
// import LazyLoad from "react-lazyload";
// import TransferModal from "./TransferModal";

// type ItemCardProps = {
//   nft: NFT;
//   tags: string[];
// };

// function difference(setA: Set<string>, setB: Set<string>) {
//   let _difference = new Set(setA);
//   for (let elem of setB) {
//     _difference.delete(elem);
//   }
//   return _difference;
// }

// const ItemCard = (props: ItemCardProps) => {
//   const [tags, setTags] = useState<string[]>([]);

//   const [showTModal, setShowTModal] = useState<boolean>(false);
//   const handleShowTModal = (open: boolean) => () => setShowTModal(open);

//   /* const [showJModal, setShowJModal] = useState<boolean>(false);
//   const handleShowJModal = (open: boolean) => () => setShowJModal(open); */

//   const goToJam = () => {
//     const jamWindow = window.open("https://testnet.nftjam.net/");
//     if (jamWindow) jamWindow.opener = null;
//   };

//   useEffect(() => {
//     setTags(JSON.parse(localStorage.getItem("tags") ?? "{}")?.[props.nft.assetId] ?? []);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const willRender = () => {
//     return props.tags.reduce((prev, tag) => prev && tags.includes(tag), true);
//   };

//   const handleTagChange = (newTags: string[]) => {
//     const oldSet = new Set(tags);
//     const newSet = new Set(newTags);

//     // eslint-disable-next-line eqeqeq
//     if (oldSet == newSet) return;

//     const localTags = JSON.parse(localStorage.getItem("tags") ?? "{}");
//     const newItem = [...difference(newSet, oldSet)][0];

//     if (!localTags["global"]) localTags["global"] = [];

//     localTags[props.nft.assetId] = [...newSet];

//     if (newItem && !localTags["global"].includes(newItem)) {
//       localTags["global"].push(newItem);
//     }

//     localStorage.setItem("tags", JSON.stringify(localTags));
//     setTags([...newSet] as never);
//   };

//   const name = props.nft.arc3 ? props.nft.metadata.name : props.nft.name;
//   const owner = props.nft.owner.slice(0, 5) + "..." + props.nft.owner.slice(50);
//   const imageURL = props.nft.imgURL();

//   return willRender() ? (
//     <LazyLoad height={400}>
//       <div
//         className="ml-2 mb-10 shadow-lg w-md rounded-t bg-indigo-700"
//         style={{ height: "min-content" }}
//       >
//         {/* Image */}
//         <div className="mt-2 p-3">
//           <FallbackImage src={imageURL} extraStyle="object-fill w-full" />
//           {/* <img src={imageURL} alt={name} className="object-fill w-full" /> */}
//         </div>
//         {/* Text */}
//         <div className="flex content-center p-2 h-20">
//           <div className="flex flex-col justify-around ml-3 pb-3">
//             <p
//               className="font-sans text-lg font-bold text-white"
//               style={{ fontFamily: "'Syne', sans-serif" }}
//             >
//               {name}
//             </p>
//             <span className="inline-flex">
//               <p className="anaheim text-white mr-1 text-lg font-bold">Owner: </p>
//               <p className="anaheim text-white text-lg italic">{owner}</p>
//             </span>
//           </div>
//         </div>

//         <div className="w-full flex justify-evenly">
//           {/* Reach Buttons */}
//           <button
//             className="syne p-2 mb-2 flex-1 mr-1 ml-3 rounded bg-gray-800 text-white hover:bg-gray-700"
//             onClick={handleShowTModal(true)}
//           >
//             Transfer
//           </button>
//           {showTModal && (
//             <TransferModal close={handleShowTModal(false)} nftId={props.nft.assetId} />
//           )}
//           {/* NFT JAM interaction */}
//           <button
//             className="syne flex-1 ml-1 mr-3 p-2 mb-2 rounded bg-gray-800 text-white hover:bg-gray-700"
//             onClick={goToJam}
//           >
//             Sell
//           </button>
//         </div>

//         {/* Tags */}
//         <TagsInput value={tags} onChange={handleTagChange} />
//       </div>
//     </LazyLoad>
//   ) : (
//     <div />
//   );
// };

// export default ItemCard;

export {};
