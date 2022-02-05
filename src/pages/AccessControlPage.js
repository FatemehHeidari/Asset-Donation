import logo from '../logo.svg';
import '../App.css';
import Button from 'react-bootstrap/Button';
import React, { Component, useState } from "react";
import FormControl from 'react-bootstrap/FormControl';
import '../App.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Table from 'react-bootstrap/Table'
import accesscontrollistcontract from '../utils/accesscontrollist.js';
import history from '../utils/history';
import InputGroup from 'react-bootstrap/InputGroup';


class AccessControlPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            status: false,
            statusText: "",
            roles: [],
            pageContent: 1,
            selectedAccoutnt: "0x0000000000000000000000000000000000000000"
        };
        this.role = React.createRef();
        //this.getStatus();
    }
    componentDidMount() {
        setInterval(async () => {
            const accounts = await window.ethereum.enable();
            const account = accounts[0];
            this.setState({ selectedAccoutnt: account });
        }, 1000)
    }

    AccessControlList = async (t) => {
        t.preventDefault();
        const accounts = await window.ethereum.enable();
        const account = accounts[0];
        const gasAmount = await accesscontrollistcontract.methods.unpause().estimateGas({ from: account });
        const result = await accesscontrollistcontract.methods.unpause().send({
            from: account,
            gasAmount,
        });
        console.log('result');
        console.log(result);
        this.setState({ Assets: result });
        this.getStatus();
    }

    AddRole = async (t) => {
        t.preventDefault();
        const accounts = await window.ethereum.enable();
        const account = accounts[0];
        const r = this.role.current.value.toString();
        console.log('r');
        console.log(r);
        const gasAmount = await accesscontrollistcontract.methods.addRole(r).estimateGas({ from: account });
        const result = await accesscontrollistcontract.methods.addRole(r).send({
            from: account,
            gasAmount,
        });
        console.log('result');
        console.log(result);
        this.setState({ Assets: result });
        this.getStatus();
    }

    getRoles = async (t) => {
        t.preventDefault();
        const accounts = await window.ethereum.enable();
        const account = accounts[0];
        var result = [];
        const gasAmount = await accesscontrollistcontract.methods.getRoleCount().estimateGas({ from: account });

        const roleCount = await accesscontrollistcontract.methods.getRoleCount().call({
            from: account,
            gasAmount,
        });
        console.log('roleCount');
        console.log(roleCount);
        var i;
        var result = [];
        var assetRes;
        for (i = 0; i < roleCount; i++) {
            var gasAmount1 = await accesscontrollistcontract.methods.getRole(i).estimateGas({ from: account });
            var roleRes = await accesscontrollistcontract.methods.getRole(i).call({
                from: account,
                gasAmount1,
            });

            var resObj = roleRes;
            result.push(resObj);
        }
        this.setState({ roles: result });
    }

    renderRole(role, index) {
        return (
            <tr key={index}>
                <td>{role.name}</td>
                <td>{role.name}</td>
                <td>{role.name}</td>
            </tr>
        )
    }

    render() {

        return (
            <div>
                <div class="jumbotron">
                    <h2> Access Control Dashboard  </h2>
                </div>
                <div class="form-row">
                    <div class="col xs = {12}">
                        <h7>  MM Account: {this.state.selectedAccoutnt}  </h7>
                    </div>
                </div>

                <div class="form-row">
                    <div class="col xs = {4}">
                        <Button variant="secondary" onClick={this.getRoles} block>Role Management</Button>{' '}
                        <br></br>
                    </div>
                    {/* <div class="col xs = {4}">
                        <Button variant="secondary" onClick={this.requestApprove} block>RequestApprove</Button>{' '}
                    </div>
                    <br></br>
                    <div class="col xs = {4}">
                        <Button variant="secondary" onClick={this.requestReject} block>requestReject</Button>{' '}
                    </div>
                    <br></br>

                    <div class="col xs = {4}">
                        <Button variant="secondary" onClick={this.setFree} block>Asset Returned</Button>{' '}
                    </div>
                    <br></br>
                    <div class="col xs = {4}">
                        <Button variant="secondary" onClick={this.lost} block>lost</Button>  {' '}
                    </div>
                    <br></br>
                    <div class="col xs = {4}">
                        <Button variant="secondary" onClick={this.damaged} block>damaged</Button>    {' '}
                    </div> */}
                </div>
                <div class="form-row">
                    <Table striped condensed hover>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Age</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.roles.map(this.renderRole)}
                        </tbody>
                    </Table>
                </div>
                <div class="form-row">
                    <div class="col xs = {4}">
                        <Button variant="secondary" onClick={this.addRole} block>Add Role</Button>{' '}
                        <br></br>
                    </div>
                </div>
                <div class="form-row">
                    {this.state.pageContent == 1 &&
                        <div>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="role">Role</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    ref={this.role}
                                    aria-label="role"
                                    aria-describedby="role"
                                />
                            </InputGroup>
                            <br></br>
                            <div class=" form-group col-md-6">
                                <button type="button" class="btn btn-outline-secondary btn-block" onClick={this.AddRole} disabled={this.state.buttonDisabled}>Save</button>
                            </div>
                        </div>}
                </div>

            </div>
        );
    }
}

export default AccessControlPage;