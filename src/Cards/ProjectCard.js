import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import '../App.css';
import Modal from 'react-bootstrap/Modal';
import CardDeck from 'react-bootstrap/CardDeck';
import ProjectRequestAsset from './ProjectRequestAsset';
import donateAssetContract from '../utils/donatecontract.js';
import projectfactorycontract from '../utils/projectfactorycontract.js';
class ProjectCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Assets:[],
            donated: 0,
            assetPopup: false
        };
    }
    getDonations = async (t) => {
        t.preventDefault();
        const accounts = await window.ethereum.enable();
        const account = accounts[0];
        //const account = await web3.givenProvider.selectedAddress;//accounts[0];
        console.log('selectrdAddress');
        console.log(account);
        const gasAmount = await donateAssetContract.methods.getAllDonations().estimateGas({ from: account });
        console.log('gasAmount');
        console.log(gasAmount);
        const result = await donateAssetContract.methods.getAllDonations().call({
            from: account,
            gasAmount,
        });
        this.setState({ Assets: result,assetPopup:true });
        //this.state.Assets = result;
        console.log('result');
        console.log(result);
    };

    claimDonaition = async (t) => {
        t.preventDefault();
        const accounts = await window.ethereum.enable();
        const account = accounts[0];
        //const account = await web3.givenProvider.selectedAddress;//accounts[0];
        console.log('selectrdAddress');
        console.log(account);
        const gasAmount = await projectfactorycontract.methods.claimDonaition(this.props.project.address).estimateGas({ from: account });
        console.log('gasAmount');
        console.log(gasAmount);
        const result = await projectfactorycontract.methods.claimDonaition(this.props.project.address).send({
            from: account,
            gasAmount,
        });
    };
    handleClose = () => {
        this.setState({ assetPopup: false });
    }
    render() {
        let assetCards = this.state.Assets.map(asset => {
            if (asset.owner != "0x0000000000000000000000000000000000000000") {
                return (
                    <ProjectRequestAsset asset={asset} projrctAddress={this.props.project.address}/>)
            }
        });
        return (


            <div class="col" key={this.props.id}>

                <Card >
                    <Card.Body>
                        <Card.Text>
                            Title: {this.props.project.projectTitle}</Card.Text>
                        <Card.Text>
                            Description: {this.props.project.projectDescription}</Card.Text>
                        <Card.Text>
                            Minimum Kick off Balance: {this.props.project.projectKickOffMinBalance}</Card.Text>
                        <Card.Text>
                            Kick Off Time: {this.props.project.projectKickOffTime}</Card.Text>
                        <Card.Text>
                            Donatios collected: {this.props.project.donated}</Card.Text>

                        <Button variant="outline-dark" onClick={this.getDonations}>Request Asset</Button> {'  '}
                        <Button variant="warning" onClick={this.claimDonaition}>Claim Donations</Button>
                    </Card.Body>
                </Card>
                <Modal show={this.state.assetPopup} onHide={this.handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Donated Assets</Modal.Title>
                            </Modal.Header>
                            <Modal.Body><div class="card shadow mb-4">
                                <div class="form-row">

                                    <CardDeck tyle={{ display: 'flex', flexDirection: 'row' }}>
                                        {assetCards}
                                    </CardDeck >

                                </div>
                            </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.handleClose} disabled={false}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
            </div>
        )
    }
}

export default ProjectCard;