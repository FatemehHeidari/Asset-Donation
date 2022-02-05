import Web3 from "web3";
import { Administration } from "../abi/adminabi";

const OPTIONS = {
  defaultBlock: "latest",
  transactionConfirmationBlocks: 1,
  transactionBlockTimeout: 5
}
const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545", null, OPTIONS);

const admincontractAddress = "0x2a8B37F21daac9bE74d69368D8E8F530d64E9Db4";
const admincontract = new web3.eth.Contract(Administration, admincontractAddress);

export default admincontract;
