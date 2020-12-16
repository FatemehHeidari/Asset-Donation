import Web3 from "web3";
import { ReceiveAsset } from "../abi/receiveabi";

const OPTIONS = {
  defaultBlock: "latest",
  transactionConfirmationBlocks: 1,
  transactionBlockTimeout: 5
}
const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545", null, OPTIONS);

const receiveContractAddress = "0xc2C55E04495E7540FC68fEd87b21022c17Da5655";
const receiveAssetContract = new web3.eth.Contract(ReceiveAsset, receiveContractAddress);

export default receiveAssetContract;

