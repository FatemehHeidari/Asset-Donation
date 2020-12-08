import Web3 from "web3";
import { DonateAsset } from "../abi/donateabi";

const OPTIONS = {
  defaultBlock: "latest",
  transactionConfirmationBlocks: 1,
  transactionBlockTimeout: 5
}
const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545", null, OPTIONS);

const donateContractAddress = "0x2128d0d89d9ada9492B92895ee6F183ff137b501";
const donatecontract = new web3.eth.Contract(DonateAsset, donateContractAddress);

export default donatecontract;
