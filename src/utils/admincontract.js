import Web3 from "web3";
import { Administration } from "../abi/adminabi";

const OPTIONS = {
  defaultBlock: "latest",
  transactionConfirmationBlocks: 1,
  transactionBlockTimeout: 5
}
const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545", null, OPTIONS);

const admincontractAddress = "0x6c45711172efd57C00c6EbFE1F9Df59ec54676ce";
const admincontract = new web3.eth.Contract(Administration, admincontractAddress);

export default admincontract;
