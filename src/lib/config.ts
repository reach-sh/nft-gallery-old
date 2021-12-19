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

const isTest = getStorageItem("test", "false");
const config = isTest === "main" ? configMain : configTest;

export { configMain, configTest, config };
