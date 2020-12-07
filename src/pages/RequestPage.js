import logo from '../logo.svg';
import '../App.css';
import Button from 'react-bootstrap/Button';
import CardDeck from 'react-bootstrap/CardDeck';
import React, { Component, useState } from "react";
import AssetCard from '../Cards/AssetRequestCard';
import receiveAssetContract from '../utils/receivecontract.js';
import donateAssetContract from '../utils/donatecontract.js';

const OPTIONS = {
    defaultBlock: "latest",
    transactionConfirmationBlocks: 1,
    transactionBlockTimeout: 5
}

class RequestPage extends Component {

    //const account = web3.givenProvider.selectedAddress;//accounts[0];      
    constructor(props) {
        super(props);
        this.state = {
            Assets: []
        };
    }
    RequestDonation = async (t) => {
        //t.preventDefault();
        //this.setState({buttonDisabled : true});
        console.log(t);
        const accounts = await window.ethereum.enable();
        const account = accounts[0];
        console.log('selectedAddress');
        console.log(account);
        const gasAmount = await receiveAssetContract.methods.requestAsset(t.assetId, t.reqDes, t.datFrom, t.datTo).estimateGas({ from: account });
        console.log('gasAmount');
        console.log(gasAmount);
        const result = await receiveAssetContract.methods.requestAsset(t.assetId, t.reqDes, t.datFrom, t.datTo).send({
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
        const gasAmount = await donateAssetContract.methods.getAllDonations().estimateGas({ from: account });
        console.log('gasAmount');
        console.log(gasAmount);
        const result = await donateAssetContract.methods.getAllDonations().call({
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
            if (asset.owner != "0x0000000000000000000000000000000000000000") {
                return (
                    <AssetCard asset={asset} RequestDonation={this.RequestDonation} />)
            }
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