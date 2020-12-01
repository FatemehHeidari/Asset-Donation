import logo from '../logo.svg';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Image from 'react-bootstrap/Image';
import '../App.css';
import Web3 from "web3";
import React, { Component, useState } from "react";
import { AssetDonation } from "../abi/abi";
import history from '../history';
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
class AddDonation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Data: []
        };
    }

    addAsset = async (t) => {
        t.preventDefault();
        const accounts = await window.ethereum.enable();
        const account = accounts[0];
        //const account = await web3.givenProvider.selectedAddress;//accounts[0];
        console.log('selectedAddress');
        console.log(account);
        const gasAmount = await assetDonationContract.methods.addAsset('assetDescription',0,'assetDescription').estimateGas({ from: account });
        console.log('gasAmount');
        console.log(gasAmount);
        const result = await assetDonationContract.methods.addAsset('assetDescription',0,'assetDescription').send({
            from: account,
            gasAmount,
        });
        console.log('result');
        console.log(result);
    };
    render() {
        return (<div>
            <div class="container">
                <div class="jumbotron">
                    <h2> Asset Donation  </h2>
                </div>
            </div>
            <div class="container">
                <div class="form-row">
                    <div class="col-xl-5 col-lg-6">
                        <div class="card shadow mb-4">
                            <div class="card-header py-3">
                            </div>
                            <div class="card-body">

                                <div class="container">
                                    <div class="row">
                                        <div class="col-12">
                                            <div>
                                                <InputGroup className="mb-3">
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text id="AssetDescription">Asset Description</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <FormControl
                                                        placeholder="AssetDescription"
                                                        aria-label="AssetDescription"
                                                        aria-describedby="AssetDescription"
                                                    />
                                                </InputGroup>
                                                <div class=" form-group col-md-6">
                                                    <button type="button" class="btn btn-outline-primary btn-block" onClick={this.addAsset}>Save</button>
                                                </div>

                                                {/* <InputGroup className="mb-3">
                                                    <FormControl
                                                        placeholder="Recipient's username"
                                                        aria-label="Recipient's username"
                                                        aria-describedby="basic-addon2"
                                                    />
                                                    <InputGroup.Append>
                                                        <InputGroup.Text id="basic-addon2">@example.com</InputGroup.Text>
                                                    </InputGroup.Append>
                                                </InputGroup>

                                                <label htmlFor="basic-url">Your vanity URL</label>
                                                <InputGroup className="mb-3">
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text id="basic-addon3">
                                                            https://example.com/users/
      </InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <FormControl id="basic-url" aria-describedby="basic-addon3" />
                                                </InputGroup>

                                                <InputGroup className="mb-3">
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>$</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <FormControl aria-label="Amount (to the nearest dollar)" />
                                                    <InputGroup.Append>
                                                        <InputGroup.Text>.00</InputGroup.Text>
                                                    </InputGroup.Append>
                                                </InputGroup>

                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>With textarea</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <FormControl as="textarea" aria-label="With textarea" />
                                                </InputGroup> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }
}

export default AddDonation;