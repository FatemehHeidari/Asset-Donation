import Web3 from "web3";
import { ProjectFactory } from "../abi/projectfactoryabi";

const OPTIONS = {
  defaultBlock: "latest",
  transactionConfirmationBlocks: 1,
  transactionBlockTimeout: 5
}
const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545", null, OPTIONS);

const projfactcontractAddress = "0xF8f6587157459c2F6552EcB8C260f6B283000d09";
const projectfactorycontract = new web3.eth.Contract(ProjectFactory, projfactcontractAddress);

export default projectfactorycontract;


