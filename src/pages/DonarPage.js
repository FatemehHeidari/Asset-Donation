import logo from '../logo.svg';
import '../App.css';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import CardDeck from 'react-bootstrap/CardDeck';
import React, { Component, useState } from "react";
import history from '../utils/history';
import AssetCard from '../Cards/AssetCard';
import donatecontract from '../utils/donatecontract.js'
import Pagination from 'react-bootstrap/Pagination'



class DonarPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      Assets: [],
      Requests: [],
      donor: {},
      NextPageVisible: false,
      nextPageNo: 0,
      pageCount: 0
    };
    this.getDonor();
  }
  getDonor = async () => {
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    const gasAmount = await donatecontract.methods.getDonor().estimateGas({ from: account });
    const result = await donatecontract.methods.getDonor().call({
      from: account,
      gasAmount,
    });
    console.log('result');
    console.log(result);
    console.log('(this.state.donor.donationCount/8)');
    console.log(Math.round(result.donationCount / 8));
    this.setState({ pageCount: Math.round(result.donationCount / 8) + 1 });
  }

  getDonations = async (t) => {
    t.preventDefault();
    this.setState({ nextPageNo: 0 });
    //console.log('donateContract');
    //console.log(donatecontract);
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    //console.log('account');
    //console.log(account);
    const gasAmount = await donatecontract.methods.getDonationsByOwner(0).estimateGas({ from: account });
    const result = await donatecontract.methods.getDonationsByOwner(0).call({
      from: account,
      gasAmount,
    });
    console.log('result');
    console.log(result);
    this.setState({ Assets: result, NextPageVisible: true });
  };

  getNextDonations = async (t) => {
    t.preventDefault();
    //console.log('donateContract');
    //console.log(donatecontract);
    this.setState({ nextPageNo: this.state.nextPageNo + 1 });
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    console.log('this.state.nextPageNo');
    console.log(this.state.nextPageNo);
    const gasAmount = await donatecontract.methods.getDonationsByOwner(this.state.nextPageNo).estimateGas({ from: account });
    const result = await donatecontract.methods.getDonationsByOwner(this.state.nextPageNo).call({
      from: account,
      gasAmount,
    });
    console.log('result');
    console.log(result);
    this.setState({ Assets: result, NextPageVisible: true });
  };

  getPrevDonations = async (t) => {
    t.preventDefault();
    if (this.state.nextPageNo - 1 >= 0) {
      this.setState({ nextPageNo: this.state.nextPageNo - 1 });
      //console.log('donateContract');
      //console.log(donatecontract);
      const accounts = await window.ethereum.enable();
      const account = accounts[0];
      console.log('this.state.nextPageNo');
      console.log(this.state.nextPageNo);
      const gasAmount = await donatecontract.methods.getDonationsByOwner(this.state.nextPageNo).estimateGas({ from: account });
      const result = await donatecontract.methods.getDonationsByOwner(this.state.nextPageNo).call({
        from: account,
        gasAmount,
      });
      console.log('result');
      console.log(result);
      this.setState({ Assets: result, NextPageVisible: true });
    }
  };


  render() {
    let assetCards = this.state.Assets.map(asset => {
      if (asset.owner != "0x0000000000000000000000000000000000000000") {
        return (<div class="col-xl-5 col-lg-6">
          <AssetCard asset={asset} />
        </div>)
      }
    });
    let active = 1;
    let items = [];
    for (let number = 1; number <= this.state.pageCount; number++) {
      items.push(
        <Pagination.Item key={number} active={number === active}>
          {number}
        </Pagination.Item>,
      );
    }
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
        <br />
        <div class="form-row">
          <Pagination size="sm">{items}</Pagination>
        </div>
        <br />
        {/* <Button variant="primary" onClick={this.getPrevDonations} type="button" visible={false}>
          {"<<Prev"}
        </Button>
        {this.state.nextPageNo}
        <Button variant="primary" onClick={this.getNextDonations} type="button" visible={false}>
          {"Next>>"}
        </Button> */}
      </div>
    );
  }
}

export default DonarPage;