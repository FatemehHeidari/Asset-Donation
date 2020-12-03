import logo from '../logo.svg';
import '../App.css';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import CardDeck from 'react-bootstrap/CardDeck';
import Web3 from "web3";
import React, { Component, useState } from "react";
import { AssetDonation } from "../abi/abi";
import history from '../history';
import AssetCard from '../AssetRequestCard';

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
class RequestPage extends Component {

    //const account = web3.givenProvider.selectedAddress;//accounts[0];      
    constructor(props) {
        super(props);
        this.state = {
            Assets: []
        };
    }
    RequestDonation = async(t)=>{
        //t.preventDefault();
        //this.setState({buttonDisabled : true});
        console.log(t);
        const accounts = await window.ethereum.enable();
        const account = accounts[0];
        console.log('selectedAddress');
        console.log(account);
        const gasAmount = await assetDonationContract.methods.requestAsset(account,t.assetId,t.reqDes,t.datFrom,t.datTo).estimateGas({ from: account });
        console.log('gasAmount');
        console.log(gasAmount);
        const result = await assetDonationContract.methods.requestAsset(account,t.assetId,t.reqDes,t.datFrom,t.datTo).send({
            from: account,
            gasAmount,
        });
        //this.setState({buttonDisabled : false});
        console.log('result');
        console.log(result);
    }

    getDonations = async (t) => {
        t.preventDefault();
        const accounts = await window.ethereum.enable();
        const account = accounts[0];
        //const account = await web3.givenProvider.selectedAddress;//accounts[0];
        console.log('selectrdAddress');
        console.log(account);
        const gasAmount = await assetDonationContract.methods.getAllDonations().estimateGas({ from: account });
        console.log('gasAmount');
        console.log(gasAmount);
        const result = await assetDonationContract.methods.getAllDonations().call({
            from: account,
            gasAmount,
        });
        this.setState({ Assets: result });
        //this.state.Assets = result;
        console.log('result');
        console.log(result);
    };
    render() {
        let assetCards = this.state.Assets.map(asset => {
            return (
                <AssetCard asset={asset} RequestDonation={this.RequestDonation}/>)
        });
        return (
            <div>
                <div class="container">
                    <div class="jumbotron">
                        <h2> Request Donation  </h2>
                    </div>
                </div>
                <div>
                    <Button variant="primary" onClick={this.getDonations} type="button">
                        Retrive
          </Button> {'   '}
                    <div class="form-row">
                        <CardDeck tyle={{ display: 'flex', flexDirection: 'row' }}>
                            {assetCards}
                        </CardDeck >

                    </div>
                </div>
            </div>
        )
    }
}

export default RequestPage;