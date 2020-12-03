import logo from '../logo.svg';
import '../App.css';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import CardDeck from 'react-bootstrap/CardDeck';
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
const contractAddress = "0x8b311b5D609D3CdC30e5CBa5271c233C29BF1c04";//"0x0C7640A95b3748E1fcEEA74dED19D969696d7f18";//"0x70a477883Fff5e6820291C027e000F8665e44287";
const assetDonationContract = new web3.eth.Contract(AssetDonation, contractAddress);
const state = {
  hello: 0
}
class DonarPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      Assets: [],
      Requests:[]
    };
  }

  getDonations = async (t) => {
    t.preventDefault();
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    const gasAmount = await assetDonationContract.methods.getDonations().estimateGas({ from: account });
    const result = await assetDonationContract.methods.getDonations().call({
      from: account,
      gasAmount,
    });
    this.setState({ Assets: result });
  };


  render() {
    let assetCards = this.state.Assets.map(asset => {
      return (<div class="col-xl-5 col-lg-6">
        <AssetCard asset={asset} />
      </div>)
    });
    return (
      <div>
        <Button variant="primary" onClick={this.getDonations} type="button">
          Retrive
          </Button> {'   '}
        <Button variant="primary" onClick={() => history.push('/AddDonation')} type="button">
          Add New Donation
          </Button>
        <div class="form-row">

          <CardDeck tyle={{ display: 'flex', flexDirection: 'row' }}>
            {assetCards}
          </CardDeck >

        </div>
      </div>
    );
  }
}

export default DonarPage;