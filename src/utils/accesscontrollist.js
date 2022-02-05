import Web3 from "web3";
import { AccessControlList } from "../abi/accesscontrollistabi";

const OPTIONS = {
  defaultBlock: "latest",
  transactionConfirmationBlocks: 1,
  transactionBlockTimeout: 5
}
const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545", null, OPTIONS);

const accessListContractAddress = "0x11cBCcAB1fd0517A367860B6C60462c8B40A842a";
const accesslistcontract = new web3.eth.Contract(AccessControlList, accessListContractAddress);

export default accesslistcontract;