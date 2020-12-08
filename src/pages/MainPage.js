import React, { Component } from "react";
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import history from '../utils/history';
import '../App.css';
import donate from '../donate.png';
import donatecontract from '../utils/donatecontract.js'
import Web3 from "web3";

const OPTIONS = {
    defaultBlock: "latest",
    transactionConfirmationBlocks: 1,
    transactionBlockTimeout: 5
  }
const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545", null, OPTIONS);

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          AdminUser : false
        };
        this.setAdmin();
      }
      
      setAdmin = async () => {
        const accounts = await window.ethereum.enable();
        const account = accounts[0];
        const gasAmount = await donatecontract.methods.isAdminUser().estimateGas({ from: account });
        const result = await donatecontract.methods.isAdminUser().call({
          from: account,
          gasAmount,
        });
        console.log('result');
        console.log(result);

        this.setState({ AdminUser: result });
      }

    //   getAdmin = async () => {
    //     const accounts = await window.ethereum.enable();
    //     const account = accounts[0];
    //     const gasAmount = await donatecontract.methods.getRoleAdmin(web3.utils.fromAscii('DEFAULT_ADMIN_ROLE')).estimateGas({ from: account });
    //     const result = await donatecontract.methods.getRoleAdmin(web3.utils.fromAscii('DEFAULT_ADMIN_ROLE')).call({
    //       from: account,
    //       gasAmount,
    //     });
    //     console.log('result');
    //     console.log(result);

    //     this.setState({ AdminUser: result });
    //   }
    
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
                        <Button  variant="primary" onClick={() => history.push('/DonarPage')}>Enter As a Donor</Button>
                        <br/>
                        <Button  variant="primary" onClick={() => history.push('/RequestPage')}>Request Donation</Button>
                        <br/>
                        <Button  variant="primary" active={false} class="btn btn-outline-primary btn-block" onClick={() => history.push('/AdminPage')}>Admin</Button>
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
                                                        <Image src={donate} thumbnail />
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