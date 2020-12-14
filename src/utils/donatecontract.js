import Web3 from "web3";
import { DonateAsset } from "../abi/donateabi";

const OPTIONS = {
  defaultBlock: "latest",
  transactionConfirmationBlocks: 1,
  transactionBlockTimeout: 5
}
const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545", null, OPTIONS);

const donateContractAddress = "0xF17905aa61De7110F92b98997bc86c701f17f7a2";
const donatecontract = new web3.eth.Contract(DonateAsset, donateContractAddress);

export default donatecontract;
