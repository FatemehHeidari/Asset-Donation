import Web3 from "web3";
import { Administration } from "../abi/adminabi";

const OPTIONS = {
  defaultBlock: "latest",
  transactionConfirmationBlocks: 1,
  transactionBlockTimeout: 5
}
const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545", null, OPTIONS);

const admincontractAddress = "0xBB6c7D0Cdd5Bd8D598E147E211F2b942b5bef89C";
const admincontract = new web3.eth.Contract(Administration, admincontractAddress);

export default admincontract;
