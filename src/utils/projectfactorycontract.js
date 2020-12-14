import Web3 from "web3";
import { ProjectFactory } from "../abi/projectfactoryabi";

const OPTIONS = {
  defaultBlock: "latest",
  transactionConfirmationBlocks: 1,
  transactionBlockTimeout: 5
}
const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545", null, OPTIONS);

const projfactcontractAddress = "0x03617E0eC00e6d9f471C04EB23c4bd339ed4AE18";
const projectfactorycontract = new web3.eth.Contract(ProjectFactory, projfactcontractAddress);

export default projectfactorycontract;

