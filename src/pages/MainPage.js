import React, { Component } from "react";
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import history from '../utils/history';
import '../App.css';
import donate from '../donate.png';
import donatecontract from '../utils/donatecontract.js'
import admincontract from '../utils/admincontract.js'
import web3 from '../utils/web3.js'

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            AdminUser: false,
            selectedAccoutnt: "0x0000000000000000000000000000000000000000"
        };
        this.setAdmin();
    }
    componentDidMount() {
        setInterval(async () => {
          const accounts = await window.ethereum.enable();
          const account = accounts[0];
          this.setState({ selectedAccoutnt: account });
        }, 1000)
      }
    setAdmin = async () => {
        const accounts = await window.ethereum.enable();
        const account = accounts[0];

        this.setState({ selectedAccoutnt: account });
        const gasAmount = await admincontract.methods.isAdminUser().estimateGas({ from: account });
        const result = await admincontract.methods.isAdminUser().call({
            from: account,
            gasAmount,
        });

        this.setState({ AdminUser: result });
    }
    getState = async () => {
        return this.state.AdminUser;
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
                <div class="jumbotron">
                    <h2> Asset Donation  </h2>
                </div>
                <h7>  MM Account: {this.state.selectedAccoutnt}  </h7>
                <div class="container">
                    <div class="row top-buffer">
                        <Col xs={6}>
                            <div class="row top-buffer">
                                <div class="col-xl-6">
                                    <Button variant="secondary btn-block" onClick={() => history.push('/DonarPage')} size={20}>Enter As a Donor</Button>
                                </div>
                            </div>
                            <div class="row top-buffer">
                                <div class="col-xl-6">
                                    <Button variant="secondary btn-block" onClick={() => history.push('/RequestPage')}>Request Donation</Button>
                                </div>
                            </div>
                            <div class="row top-buffer">
                                <div class="col-xl-6">
                                    <Button variant="secondary btn-block" onClick={() => history.push('/ProjectOwnerPage')}>Enter as Project Owner</Button>
                                </div>
                            </div>
                            <div class="row top-buffer">
                                <div class="col-xl-6">
                                    {this.state.AdminUser && <Button variant="secondary btn-block" active={false} class="btn btn-outline-secondary btn-block" onClick={() => history.push('/AdminPage')}>Admin</Button>}
                                </div>
                            </div>
                        </Col>
                        <Col xs={6}>
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
                        </Col>

                    </div>

                </div>
            </div>
        )
    }
};

export default MainPage;