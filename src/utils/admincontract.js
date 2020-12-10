import Web3 from "web3";
import { Administration } from "../abi/adminabi";

const OPTIONS = {
  defaultBlock: "latest",
  transactionConfirmationBlocks: 1,
  transactionBlockTimeout: 5
}
const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545", null, OPTIONS);

const admincontractAddress = "0xaf3A6B6D7499d70884F4a94478AB20C34d6cF0b3";
const admincontract = new web3.eth.Contract(Administration, admincontractAddress);

export default admincontract;
