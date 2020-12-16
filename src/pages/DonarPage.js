import logo from '../logo.svg';
import '../App.css';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import CardDeck from 'react-bootstrap/CardDeck';
import React, { Component, useState } from "react";
import history from '../utils/history';
import AssetCard from '../Cards/AssetCard';
import donatecontract from '../utils/donatecontract.js'
import admincontract from '../utils/admincontract.js'
import Pagination from 'react-bootstrap/Pagination'



class DonarPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      Donations: [],
      asset: [],
      Requests: [],
      donor: {},
      pageCount: 0,
      querized: false,
      selectedAccoutnt: "0x0000000000000000000000000000000000000000",
      renderCards:false
    };
    this.getDonor();
  }
  componentDidMount() {
    setInterval(async () => {
      const accounts = await window.ethereum.enable();
      const account = accounts[0];
      this.setState({ selectedAccoutnt: account });
    }, 1000)
  }
  getDonor = async () => {
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    this.setState({ selectedAccoutnt: account });
    const gasAmount = await admincontract.methods.getDonor(account).estimateGas({ from: account });
    const result = await admincontract.methods.getDonor(account).call({
      from: account,
      gasAmount,
    });
    console.log('getDonor');
    console.log(result);
    console.log('(this.state.donor.donationCount/8)');
    console.log(Math.floor(result.donationCount / 8));
    this.setState({ pageCount: Math.floor(result.donationCount / 8) + 1 });

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
    console.log('gasAmount');
    console.log(gasAmount);
    const result = await donatecontract.methods.getDonationsByOwner(0).call({
      from: account,
      gasAmount,
    });

    console.log('result');
    console.log(result);
    this.setState({ Donations: result, NextPageVisible: true });
    if (this.state.pageCount > 1) {
      this.setState({ querized: true });
    }
    this.setState({renderCards : true});
  };


  getDonationsByPageNo = async (t) => {
    this.setState({ nextPageNo: 0});
    //console.log('donateContract');
    //console.log(donatecontract);
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    //console.log('account');
    //console.log(account);
    const gasAmount = await donatecontract.methods.getDonationsByOwner(t).estimateGas({ from: account });
    console.log('gasAmount');
    console.log(gasAmount);
    const result = await donatecontract.methods.getDonationsByOwner(t).call({
      from: account,
      gasAmount,
    });

    console.log('result');
    console.log(result);
    this.setState({ Donations: result, NextPageVisible: true });
    if (this.state.pageCount > 1) {
      this.setState({ querized: true });
    }
    this.setState({renderCards : true});
  };
  changePage = async (e) => {
    console.log('pagination');
    const clickValue = e.target.offsetParent.getAttribute('data-page')
      ? e.target.offsetParent.getAttribute('data-page')
      : e.target.getAttribute('data-page');
    console.log(clickValue);
    this.getDonationsByPageNo(clickValue - 1);
  }
  render() {
    let assetCards;
    if (this.state.renderCards) {
      assetCards = this.state.Donations[0].map((donation, index) => {
        if (donation.owner != "0x0000000000000000000000000000000000000000") {
          return (<div class="col-xl-5 col-lg-6">
            <AssetCard donation={donation} asset={this.state.Donations[1][index]} />
          </div>)
        }
      });
    }
    let active = 1;
    let items = [];
    for (let number = 1; number <= this.state.pageCount; number++) {
      items.push(
        <Pagination.Item key={number} data-page={number} active={number === active} onChange={this.changePage}>
          {number}
        </Pagination.Item>,
      );
    }
    return (
      <div>

        <div class="jumbotron">
          <h2> Donate!  </h2>
        </div>
        <div class="form-row">
          <div class="col xs = {12}">
            <h7>  MM Account: {this.state.selectedAccoutnt}  </h7>
          </div>
        </div>
        <Button variant="secondary" onClick={this.getDonations} type="button">
          My Donations
          </Button> {'   '}
        <Button variant="secondary" onClick={() => history.push('/AddDonation')} type="button">
          Add New Donation
        </Button>{'   '}
        <Button variant="secondary" onClick={() => history.push('/DonateToProject')} type="button">
          Donate To Projects
        </Button>
        <div class="form-row">
          <CardDeck tyle={{ display: 'flex', flexDirection: 'row' }}>
            {assetCards}
          </CardDeck >
        </div>
        <br />
        <div class="form-row">
          {this.state.querized && <Pagination size="sm" onClick={this.changePage}>{items}</Pagination>}
        </div>
        <br />
      </div>
    );
  }
}

export default DonarPage;