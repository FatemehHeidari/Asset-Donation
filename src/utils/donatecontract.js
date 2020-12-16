import Web3 from "web3";
import { DonateAsset } from "../abi/donateabi";

const OPTIONS = {
  defaultBlock: "latest",
  transactionConfirmationBlocks: 1,
  transactionBlockTimeout: 5
}
const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545", null, OPTIONS);

const donateContractAddress = "0x1B4dfC35037bC36458cB2e8D4C4C8B4B674d0D8C";
const donatecontract = new web3.eth.Contract(DonateAsset, donateContractAddress);

export default donatecontract;
