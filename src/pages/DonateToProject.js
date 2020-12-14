import logo from '../logo.svg';
import '../App.css';
import Button from 'react-bootstrap/Button';
import CardDeck from 'react-bootstrap/CardDeck';
import React, { Component, useState } from "react";
import projectfactorycontract from '../utils/projectfactorycontract.js';
import ProjectInfoCard from '../Cards/ProjectInfoCard.js'
import Web3 from "web3";

const OPTIONS = {
    defaultBlock: "latest",
    transactionConfirmationBlocks: 1,
    transactionBlockTimeout: 5
}
const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545", null, OPTIONS);


class DonateToProject extends Component {

    //const account = web3.givenProvider.selectedAddress;//accounts[0];      
    constructor(props) {
        super(props);
        this.state = {
            Projects: [],
            selectedAccoutnt: "0x0000000000000000000000000000000000000000"
        };
    }
    componentDidMount() {
        setInterval(async () => {
            const accounts = await window.ethereum.enable();
            const account = accounts[0];
            this.setState({ selectedAccoutnt: account });
        }, 1000)
    }

    getProjects = async (t) => {
        t.preventDefault();
        const accounts = await window.ethereum.enable();
        const account = accounts[0];

        const gasAmount = await projectfactorycontract.methods.getAllProjects().estimateGas({ from: account });

        const result = await projectfactorycontract.methods.getAllProjects().call({
            from: account,
            gasAmount,
        });
        var i;
        for (i = 0; i < result.length; i++) {
            if (result[i].projectOwner != "0x0000000000000000000000000000000000000000") {
                result[i].donated = await this.getProjectBalance(i);
                console.log('result');
                console.log(result[i].donated);
            }
            else { result[i].donated = 0; }
        }
        this.setState({ Projects: result });

    };
    getProjectBalance = async (t) => {
        //t.preventDefault();
        const accounts = await window.ethereum.enable();
        const account = accounts[0];
        const gasAmount = await projectfactorycontract.methods.getProjectBalance(t).estimateGas({ from: account });

        const result = await projectfactorycontract.methods.getProjectBalance(t).call({
            from: account,
            gasAmount,
        });
        //console.log('result');
        const etherValue = web3.utils.fromWei(result.toString(10), 'ether');
        //console.log(etherValue);
        return etherValue;
    };

    donate = async (t) => {
        //t.preventDefault();
        //this.setState({buttonDisabled : true});
        const accounts = await window.ethereum.enable();
        const account = accounts[0];

        var amn = parseFloat(t.donationAmount);
        var weiamn = 1000000000000000000 * amn;
        const gasAmount = await projectfactorycontract.methods.donateToProject(t.projectId).estimateGas({ from: account, value: weiamn });

        const result = await projectfactorycontract.methods.donateToProject(t.projectId).send({
            from: account,
            value: weiamn
        });

    }
    render() {
        let projectCards = this.state.Projects.map((project, index) => {
            if (project.projectOwner != "0x0000000000000000000000000000000000000000") {

                return (
                    <ProjectInfoCard project={project} id={index} donate={this.donate} />)
            }
        });
        return (
            <div>

                <div class="jumbotron">
                    <h2> Donate to Projects!</h2>
                </div>
                <div class="form-row">
                    <div class="col xs = {12}">
                        <h7>  MM Account: {this.state.selectedAccoutnt}  </h7>
                    </div>
                </div>
                <div>
                    <Button variant="secondary" onClick={this.getProjects} type="button">
                        Retrive
          </Button> {'   '}

                    <CardDeck>
                        {projectCards}
                    </CardDeck >

                </div>
            </div>
        )
    }
}
export default DonateToProject;