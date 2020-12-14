import logo from '../logo.svg';
import '../App.css';
import Button from 'react-bootstrap/Button';
import CardDeck from 'react-bootstrap/CardDeck';
import React, { Component, useState } from "react";
import AssetRequestCard from '../Cards/AssetRequestCard';
import RequestCard from '../Cards/RequestCard';
import ProjectRequestCard from '../Cards/ProjectRequestCard';
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
            Assets: [],
            Requests: [],
            requestsFlag: false,
            assetsFlag: false,
            selectedAccoutnt: "0x0000000000000000000000000000000000000000"
        };
    }
    componentDidMount() {
        setInterval(async() => {
            const accounts = await window.ethereum.enable();
            const account = accounts[0];
            this.setState({ selectedAccoutnt: account });
        }, 1000)
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
        this.setState({ assetsFlag: true, requestsFlag: false });
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

    getRequests = async (t) => {
        t.preventDefault();
        this.setState({ assetsFlag: false, requestsFlag: true });
        const accounts = await window.ethereum.enable();
        const account = accounts[0];
        //const account = await web3.givenProvider.selectedAddress;//accounts[0];
        console.log('selectrdAddress');
        console.log(account);
        const gasAmount = await receiveAssetContract.methods.getRequests(account).estimateGas({ from: account });
        console.log('gasAmount');
        console.log(gasAmount);
        const result = await receiveAssetContract.methods.getRequests(account).call({
            from: account,
            gasAmount,
        });
        this.setState({ Requests: result });
        //this.state.Assets = result;
        console.log('result');
        console.log(result);
    };
    render() {
        let assetCards = this.state.Assets.map(asset => {
            if (asset.owner != "0x0000000000000000000000000000000000000000") {
                return (
                    <AssetRequestCard asset={asset} RequestDonation={this.RequestDonation} />)
            }
        });
        let requestCard = this.state.Requests.map(request => {
            if (request.receiver != "0x0000000000000000000000000000000000000000") {
                if (request.requestType == 0) {
                    return (
                        <RequestCard request={request} requestApprove={this.requestApprove} readOnly={true} />)
                }
                else if (request.requestType == 1) {
                    return (
                        <ProjectRequestCard request={request} requestApprove={this.requestApprove} readOnly={true} />)
                }
            }
        });
        return (
            <div>
                <div class="jumbotron">
                    <h2> Request Donation  </h2>
                </div>
                <div class="form-row">
                    <div class="col xs = {12}">
                        <h7> Asddress:{this.state.selectedAccoutnt}  </h7>
                    </div>
                </div>
                <div>
                    <Button variant="secondary" onClick={this.getRequests} type="button">
                        Show Your Previous Requests
          </Button> {'   '}
                    <Button variant="secondary" onClick={this.getDonations} type="button">
                        Show Donations
          </Button> {'   '}

                    <div class="form-row">
                        {this.state.assetsFlag && <CardDeck tyle={{ display: 'flex', flexDirection: 'row' }}>
                            {assetCards}
                        </CardDeck >}
                        {this.state.requestsFlag && <CardDeck tyle={{ display: 'flex', flexDirection: 'row' }}>
                            {requestCard}
                        </CardDeck >}

                    </div>
                </div>
            </div>
        )
    }
}

export default RequestPage;