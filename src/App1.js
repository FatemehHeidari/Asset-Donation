import logo from './logo.svg';
import './App.css';
import Web3 from "web3";
import React, { Component, useState } from "react";
import { AssetDonation } from "./abi/abi";
const OPTIONS = {
  defaultBlock :"latest",
  transactionConfirmationBlocks: 1,
  transactionBlockTimeout: 5
}
const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545",null,OPTIONS);
const contractAddress = "0x0C7640A95b3748E1fcEEA74dED19D969696d7f18";//"0x70a477883Fff5e6820291C027e000F8665e44287";
const assetDonationContract = new web3.eth.Contract(AssetDonation, contractAddress);
const state = {
  hello:0
}
const account = web3.givenProvider.selectedAddress;//accounts[0];

class App extends Component{  
  constructor(props) {
    super(props);
    this.state = {
      Data: []
    };
  }

  numberGet = async (t) => {
    t.preventDefault();
    const account = await web3.givenProvider.selectedAddress;//accounts[0];
    console.log('selectrdAddress');
    console.log(web3.givenProvider.selectedAddress);
    const gasAmount = await assetDonationContract.methods.getDonations().estimateGas({ from: account });
    console.log('gasAmount');
    console.log(gasAmount);
    const result = await assetDonationContract.methods.getDonations().call({
        from: account,
        gasAmount,
      });
    console.log('result');
    console.log(result);
  };
  render() {
    return(
    <div className="cargo">
      <div className="case">
        <br />
        <button className="button" onClick={this.numberGet} type="button">
          Retrieve
      </button>
      <div className="result">{state.hello}</div>
      </div>
    </div>);
  }
}

export default App;
