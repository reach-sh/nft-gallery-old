import { getStorageItem } from "./helpers";

type Config = {
  network: string;
  algod: string;
  blockExplorer: string;
  ipfsGateway: string;
  storageToken: string;
};

const configMain = require("../configMain.json") as Config;
const configTest = require("../configTest.json") as Config;

const config = getStorageItem("test", "false") ? configTest : configMain;

export { configMain, configTest, config };
