import logo from '../logo.svg';
import '../App.css';
import Button from 'react-bootstrap/Button';
import CardDeck from 'react-bootstrap/CardDeck';
import React, { Component, useState } from "react";
import projectfactorycontract from '../utils/projectfactorycontract.js';
import ProjectInfoCard from '../Cards/ProjectInfoCard.js'


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
        this.setState({ Projects: result });

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
                    <ProjectInfoCard project={project} id={index} />)
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