import '../App.css';
import Button from 'react-bootstrap/Button';
import CardDeck from 'react-bootstrap/CardDeck';
import React, { Component, useState } from "react";
import history from '../utils/history';
import ProjectCard from '../Cards/ProjectCard';
import projectfactorycontract from '../utils/projectfactorycontract.js'
import Pagination from 'react-bootstrap/Pagination'
import Web3 from "web3";

const OPTIONS = {
    defaultBlock: "latest",
    transactionConfirmationBlocks: 1,
    transactionBlockTimeout: 5
}
const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545", null, OPTIONS);



class ProjectOwnerPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Projects: [],
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

    getProjects = async (t) => {
        t.preventDefault();
        const accounts = await window.ethereum.enable();
        const account = accounts[0];

        const gasAmount = await projectfactorycontract.methods.getProjects().estimateGas({ from: account });

        const result = await projectfactorycontract.methods.getProjects().call({
            from: account,
            gasAmount,
        });
        var i;
        for (i = 0; i < result.length; i++) {
            if (result[i].projectOwner != "0x0000000000000000000000000000000000000000") {
                result[i].donated = await this.getProjectBalance(i);
                result[i].address = await this.getProjectAddress(i);
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

    getProjectAddress = async (t) => {
        //t.preventDefault();
        const accounts = await window.ethereum.enable();
        const account = accounts[0];
        const gasAmount = await projectfactorycontract.methods.getProjectAddress(t).estimateGas({ from: account });

        const result = await projectfactorycontract.methods.getProjectAddress(t).call({
            from: account,
            gasAmount,
        });
        //console.log('result');
        //const etherValue = web3.utils.fromWei(result.toString(10), 'ether');
        //console.log(etherValue);
        return result;
    };
    render() {
        let projectCards = this.state.Projects.map((project, index) => {
            if (project.projectOwner != "0x0000000000000000000000000000000000000000") {

                return (
                    <ProjectCard project={project} id={index} donate={this.donate} />)
            }
        });
        let active = 1;
        let items = [];
        for (let number = 1; number <= this.state.pageCount; number++) {
            items.push(
                <Pagination.Item key={number} data-page={number} active={number === active} onChange={this.changePage}>
                    {number}
                </Pagination.Item>,
            );
        }
        return (
            <div>
                <div class="jumbotron">
                    <h2> Manage your projects  </h2>
                </div>
                <div class="form-row">
                    <div class="col xs = {12}">
                        <h7> Asddress:{this.state.selectedAccoutnt}  </h7>
                    </div>
                </div>
                <Button variant="secondary" onClick={this.getProjects} type="button">
                    Retrive Your Projects
          </Button> {'   '}
                <Button variant="secondary" onClick={() => history.push('/AddProject')} type="button">
                    Add New Project
        </Button>{'   '}
                <br></br>
                <div class="form-row">
                    <CardDeck tyle={{ display: 'flex', flexDirection: 'row' }}>
                        {projectCards}
                    </CardDeck >
                </div>
                <br />
                <div class="form-row">
                    {this.state.querized && <Pagination size="sm" onClick={this.changePage}>{items}</Pagination>}
                </div>
                <br />
            </div>
        );
    }
}

export default ProjectOwnerPage;