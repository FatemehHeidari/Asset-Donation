import Web3 from "web3";
import { ProjectFactory } from "../abi/projectfactoryabi";

const OPTIONS = {
  defaultBlock: "latest",
  transactionConfirmationBlocks: 1,
  transactionBlockTimeout: 5
}
const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545", null, OPTIONS);

const projfactcontractAddress = "0xb61ed185E431B2C04c4e4D6c1f09D2C29Fec377c";
const projectfactorycontract = new web3.eth.Contract(ProjectFactory, projfactcontractAddress);

export default projectfactorycontract;


