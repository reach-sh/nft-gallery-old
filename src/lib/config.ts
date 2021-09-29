type Config = {
  network: string;
  algod: string;
  blockExplorer: string;
  ipfsGateway: string;
  storageToken: string;
};

const conf = require("../config.json") as Config;

export { conf };
