import Web3 from "web3";
import { ProjectFactory } from "../abi/projectfactoryabi";

const OPTIONS = {
  defaultBlock: "latest",
  transactionConfirmationBlocks: 1,
  transactionBlockTimeout: 5
}
const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545", null, OPTIONS);

const projfactcontractAddress = "0xa7B6d80dA5cCbD9c2fc9D6A6E18F60CfF7CE3c3d";
const projectfactorycontract = new web3.eth.Contract(ProjectFactory, projfactcontractAddress);

export default projectfactorycontract;


