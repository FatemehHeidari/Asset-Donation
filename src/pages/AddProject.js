import logo from '../logo.svg';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Card from 'react-bootstrap/Card';
import '../App.css';
import web3 from "../utils/web3";
import React, { Component, useState } from "react";
import Form from 'react-bootstrap/Form';
import projectfactorycontract from '../utils/projectfactorycontract.js';

class AddProject extends Component {
    constructor(props) {
        super(props);
        this.projectTitle = React.createRef();
        this.projectDescription = React.createRef();
        this.projectKickOffMinBalance = React.createRef();
        this.projectKickOffTime = React.createRef();
        this.state = {
            buttonDisabled: false,
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

    addProject = async (t) => {
        t.preventDefault();
        this.setState({ buttonDisabled: true });
        const accounts = await window.ethereum.enable();
        const account = accounts[0];
        console.log('web3');
        console.log(web3);
        const tit = this.projectTitle.current.value;
        const des = this.projectDescription.current.value;
        const projectKickOffMinBalance = this.projectKickOffMinBalance.current.value;
        const projectKickOffTime = this.projectKickOffTime.current.value;
        const gasAmount = await projectfactorycontract.methods.createProject(des, tit, projectKickOffTime, projectKickOffMinBalance).estimateGas({ from: account });
        console.log('gasAmount');
        console.log(gasAmount);
        const result = await projectfactorycontract.methods.createProject(des, tit, projectKickOffTime, projectKickOffMinBalance).send({
            from: account,
            gasAmount
        });
        this.setState({ buttonDisabled: false });
        console.log('result');
        console.log(result);
    };

    render() {
        return (<div>
            <div class="jumbotron">
                <h2> Start a project</h2>
                <h2>Raise Money and Assets! </h2>
            </div>
            <div class="form-row">
                <div class="col xs = {12}">
                    <h7>  MM Account: {this.state.selectedAccoutnt}  </h7>
                </div>
            </div>            
            <div class="container">
                <div class="form-row">
                    <div class="col-xl-5 col-lg-6">
                        <Card style={{ flex: 1 }} >
                            <div class="card-header py-3">
                            </div>
                            <div class="card-body">

                                <div class="container">
                                    <div class="row">
                                        <div class="col-12">
                                            <div>
                                                <InputGroup className="mb-3">
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text id="projectTitle">Project Title</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <FormControl
                                                        ref={this.projectTitle}
                                                        placeholder="projectTitle"
                                                        aria-label="projectTitle"
                                                        aria-describedby="projectTitle"
                                                    />
                                                </InputGroup>
                                                <InputGroup className="mb-3">
                                                    <Form.Group controlId="projectDescription">
                                                        <Form.Label>Project Description</Form.Label>

                                                        <Form.Control as="textarea" rows={10} ref={this.projectDescription} />
                                                    </Form.Group>
                                                </InputGroup>

                                                <InputGroup className="mb-3">
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text id="projectKickOffMinBalance">Minimun kick off balance</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <FormControl
                                                        ref={this.projectKickOffMinBalance}
                                                        placeholder="projectKickOffMinBalance"
                                                        aria-label="projectKickOffMinBalance"
                                                        aria-describedby="projectKickOffMinBalance"
                                                    />
                                                </InputGroup>
                                                <InputGroup className="mb-3">
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text id="projectKickOffTime">Project Kick Off Time</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <FormControl
                                                        ref={this.projectKickOffTime}
                                                        placeholder="projectKickOffTime"
                                                        aria-label="projectKickOffTime"
                                                        aria-describedby="projectKickOffTime"
                                                    />
                                                </InputGroup>
                                                <br></br>
                                                <div class=" form-group col-md-6">
                                                    <button type="button" class="btn btn-outline-secondary btn-block" onClick={this.addProject} disabled={this.state.buttonDisabled}>Save</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>);
    }
}

export default AddProject;