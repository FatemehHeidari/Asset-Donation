import Web3 from "web3";
import { ReceiveAsset } from "../abi/receiveabi";

const OPTIONS = {
  defaultBlock: "latest",
  transactionConfirmationBlocks: 1,
  transactionBlockTimeout: 5
}
const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545", null, OPTIONS);

const receiveContractAddress = "0x626569a1dA7C5eD97Fd4269d3452Ce3bFD544d51";
const receiveAssetContract = new web3.eth.Contract(ReceiveAsset, receiveContractAddress);

export default receiveAssetContract;

