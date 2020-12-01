import logo from '../logo.svg';
import '../App.css';
import Image from 'react-bootstrap/Image';
import Web3 from "web3";
import React, { Component, useState } from "react";
import { AssetDonation } from "../abi/abi";
import history from '../history';
import AssetCard from '../AssetCard';
//import shortid from 'shortid';

const OPTIONS = {
  defaultBlock: "latest",
  transactionConfirmationBlocks: 1,
  transactionBlockTimeout: 5
}
const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545", null, OPTIONS);
const contractAddress = "0x4A283f6D12D1815338fBf6770b2e91898f5B9FeC";//"0x0C7640A95b3748E1fcEEA74dED19D969696d7f18";//"0x70a477883Fff5e6820291C027e000F8665e44287";
const assetDonationContract = new web3.eth.Contract(AssetDonation, contractAddress);
const state = {
  hello: 0
}
//const account = web3.givenProvider.selectedAddress;//accounts[0];
class DonarPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      Assets: []
    };
  }

  numberGet = async (t) => {
    t.preventDefault();
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    //const account = await web3.givenProvider.selectedAddress;//accounts[0];
    console.log('selectrdAddress');
    console.log(account);
    const gasAmount = await assetDonationContract.methods.getDonation().estimateGas({ from: account });
    console.log('gasAmount');
    console.log(gasAmount);
    const result = await assetDonationContract.methods.getDonation().call({
      from: account,
      gasAmount,
    });
    this.setState({Assets:result});
    //this.state.Assets = result;
    console.log('result');
    console.log(result);
  };
  render() {
    let assetCards = this.state.Assets.map(asset => {
      return (<div class="col-xl-5 col-lg-6">
        <AssetCard asset = {asset}/>
      </div>)
    });
    return (
      <div className="cargo">
        <div className="case">
          <br />
          <div class="form-row">
            {assetCards}
          </div>
          <button className="button" onClick={this.numberGet} type="button">
            Retrive
          </button>
          <button className="button" onClick={() => history.push('/AddDonation')} type="button">
            Add New Donation
          </button>
          <div className="result">{state.hello}</div>
        </div>
      </div>);
  }
}

export default DonarPage;