import Web3 from "web3";
import { Administration } from "../abi/adminabi";

const OPTIONS = {
  defaultBlock: "latest",
  transactionConfirmationBlocks: 1,
  transactionBlockTimeout: 5
}
const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545", null, OPTIONS);

const admincontractAddress = "0xb0E7AB88a15a807eC8D4244ca3FF72C0Be318Fe1";
const admincontract = new web3.eth.Contract(Administration, admincontractAddress);

export default admincontract;
