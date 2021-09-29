import MyAlgo from "@randlabs/myalgo-connect";
const myAlgoWallet = new MyAlgo();

const connectToMyAlgo = async (set: any) => {
  const accounts = await myAlgoWallet.connect();
  const addresses = accounts.map((account) => account.address);

  set("addresses", addresses);
};

export const connectWallet = (set: any) => ({
  MyAlgo: () => connectToMyAlgo(set),
});
