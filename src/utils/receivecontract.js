import Web3 from "web3";
import { ReceiveAsset } from "../abi/receiveabi";

const OPTIONS = {
  defaultBlock: "latest",
  transactionConfirmationBlocks: 1,
  transactionBlockTimeout: 5
}
const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545", null, OPTIONS);

const receiveContractAddress = "0x70f8867116A3A8887feAeC980613454816ca8612";
const receiveAssetContract = new web3.eth.Contract(ReceiveAsset, receiveContractAddress);

export default receiveAssetContract;

