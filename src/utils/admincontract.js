import Web3 from "web3";
import { Administration } from "../abi/adminabi";

const OPTIONS = {
  defaultBlock: "latest",
  transactionConfirmationBlocks: 1,
  transactionBlockTimeout: 5
}
const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545", null, OPTIONS);

const admincontractAddress = "0x7955a5A007826070E32533C5aeb0CA0Ec35d4Ebe";
const admincontract = new web3.eth.Contract(Administration, admincontractAddress);

export default admincontract;
