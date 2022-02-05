import logo from '../logo.svg';
import '../App.css';
import Button from 'react-bootstrap/Button';
import React, { Component, useState } from "react";
import FormControl from 'react-bootstrap/FormControl';
import '../App.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import adminContract from '../utils/admincontract.js';
import history from '../utils/history';


class AdminPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            status: false,
            statusText: "",
            selectedAccoutnt: "0x0000000000000000000000000000000000000000"
        };
        this.getStatus();
    }
    componentDidMount() {
        setInterval(async() => {
            const accounts = await window.ethereum.enable();
            const account = accounts[0];
            this.setState({ selectedAccoutnt: account });
        }, 1000)
    }
    getStatus = async () => {
        //t.preventDefault();
        const accounts = await window.ethereum.enable();
        const account = accounts[0];
        this.setState({ selectedAccoutnt: account });
        const gasAmount = await adminContract.methods.paused().estimateGas({ from: account });
        const result = await adminContract.methods.paused().call({
            from: account,
            gasAmount,
        });
        console.log('result');
        console.log(result);
        this.setState({ statusText: result ? 'Stopped' : 'Running', status: !result });
    };
    handleChange = async (t) => {
        if (this.state.status) {
            this.emergencyStop(t);
        }
        else {
            this.start(t);
        }
    }
    emergencyStop = async (t) => {
        t.preventDefault();
        const accounts = await window.ethereum.enable();
        const account = accounts[0];
        const gasAmount = await adminContract.methods.pause().estimateGas({ from: account });
        const result = await adminContract.methods.pause().send({
            from: account,
            gasAmount,
        });
        console.log('result');
        console.log(result);
        this.setState({ Assets: result });
        this.getStatus();
    };
    start = async (t) => {
        t.preventDefault();
        const accounts = await window.ethereum.enable();
        const account = accounts[0];
        const gasAmount = await adminContract.methods.unpause().estimateGas({ from: account });
        const result = await adminContract.methods.unpause().send({
            from: account,
            gasAmount,
        });
        console.log('result');
        console.log(result);
        this.setState({ Assets: result });
        this.getStatus();
    };

    AccessControlList = async (t) =>{
        t.preventDefault();
        const accounts = await window.ethereum.enable();
        const account = accounts[0];
        const gasAmount = await adminContract.methods.unpause().estimateGas({ from: account });
        const result = await adminContract.methods.unpause().send({
            from: account,
            gasAmount,
        });
        console.log('result');
        console.log(result);
        this.setState({ Assets: result });
        this.getStatus();        
    }



    render() {

        return (
            <div>
                <div class="jumbotron">
                    <h2> Admin Dashboard  </h2>
                </div>
                <div class="form-row">
                    <div class="col xs = {12}">
                        <h7>  MM Account: {this.state.selectedAccoutnt}  </h7>
                    </div>
                </div>
                <Form>
                    <Form.Group as={Row} controlId="systemStatus">
                        <Form.Label column sm="4">
                            System status
    </Form.Label>

                        <Form.Check column sm="8"
                            type="switch"
                            id="custom-switch"
                            checked={this.state.status}
                            label={this.state.statusText}
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                </Form>
                <Button variant="danger" onClick={() => history.push('/AccessControlPage')} type="button" size="lg">
                        Access Control
          </Button> {'   '}
            </div>
        );
    }
}

export default AdminPage;