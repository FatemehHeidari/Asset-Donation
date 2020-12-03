import { render } from "@testing-library/react";
import React, { Component } from "react";
import Image from 'react-bootstrap/Image';
import history from '../history';
import '../App.css';
import Web3 from "web3";
import { AssetDonation } from "../abi/abi";

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
const account = web3.givenProvider.selectedAddress;//accounts[0];

class MainPage extends Component {
    constructor(props) {
        super(props);
      }
    Donate(){
        history.push('/DonarPage');
    }
    Request(){}
    render() {
        return (
            <div>
                <div class="container">
                    <div class="jumbotron">
                        <h2> Asset Donation  </h2>
                    </div>
                </div>
                <div class="container">
                    <div class="form-row">
                        <div class=" form-group col-md-6">
                        <button type="button" class="btn btn-outline-primary btn-block" onClick={() => history.push('/DonarPage')}>Enter As a Donor</button>
                        <button type="button" class="btn btn-outline-primary btn-block" onClick={() => history.push('/RequestPage')}>Request Donation</button>
                        </div>
                        <div class="col-xl-5 col-lg-6">
                            <div class="card shadow mb-4">
                                <div class="card-header py-3">
                                </div>
                                <div class="card-body">

                                    <div class="container">
                                        <div class="row">
                                            <div class="col-12">
                                                <div class="card">
                                                    <div class="card-body">
                                                        <Image src="donate.png" thumbnail />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

export default MainPage;