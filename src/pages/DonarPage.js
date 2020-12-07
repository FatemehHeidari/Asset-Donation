import logo from '../logo.svg';
import '../App.css';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import CardDeck from 'react-bootstrap/CardDeck';
import React, { Component, useState } from "react";
import history from '../utils/history';
import AssetCard from '../Cards/AssetCard';
import donatecontract from '../utils/donatecontract.js'



class DonarPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      Assets: [],
      Requests: []
    };
  }

  getDonations = async (t) => {
    t.preventDefault();
    console.log('donateContract');
    console.log(donatecontract);
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    console.log('account');
    console.log(account);
    const gasAmount = await donatecontract.methods.getDonationsByOwner().estimateGas({ from: account });
    const result = await donatecontract.methods.getDonationsByOwner().call({
      from: account,
      gasAmount,
    });
    console.log('result');
    console.log(result);
    this.setState({ Assets: result });
  };


  render() {
    let assetCards = this.state.Assets.map(asset => {
      if (asset.owner != "0x0000000000000000000000000000000000000000") {
        return (<div class="col-xl-5 col-lg-6">
          <AssetCard asset={asset} />
        </div>)
      }
    });
    return (
      <div>
        <div class="container">
          <div class="jumbotron">
            <h2> Donate!  </h2>
          </div>
        </div>
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