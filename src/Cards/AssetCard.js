import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CardDeck from 'react-bootstrap/CardDeck';
import RequestCard from './RequestCard';
import ProjectRequestCard from './ProjectRequestCard';
import donateAssetContract from '../utils/donatecontract'
import receiveAssetContract from '../utils/receivecontract'
import projectfactorycontract from '../utils/projectfactorycontract.js'
import '../App.css';
import web3 from '../utils/web3.js'


class AssetCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Requests: [],
            project: [],
            requestPopup: false
        };
    }
    getRequests = async (t) => {
        t.preventDefault();
        const accounts = await window.ethereum.enable();
        const account = accounts[0];
        let donationId = this.props.donation.donationId;
        let requestCount = this.props.donation.requestCount;

        const gasAmount = await receiveAssetContract.methods.getDonationRequests(donationId, requestCount).estimateGas({ from: account });
        const result = await receiveAssetContract.methods.getDonationRequests(donationId, requestCount).call({
            from: account,
            gasAmount,
        });
        console.log('result');
        console.log(result);

        this.setState({ Requests: result, requestPopup: true });
    };

    requestApprove = async (t) => {

        const accounts = await window.ethereum.enable();
        const account = accounts[0];
        console.log('t');
        console.log(t);
        const gasAmount = await donateAssetContract.methods.donateAsset(t.donationId, t.assetId, t.receiver).estimateGas({ from: account });
        const result = await donateAssetContract.methods.donateAsset(t.donationId, t.assetId, t.receiver).send({
            from: account,
            gasAmount,
        });
        //this.setState({buttonDisabled : false});


    }
    decodeStatus = (t) => {
        switch (t) {
            case 0:
                return 'Free';
            case 1:
                return 'Requested';
            case 2:
                return 'Donated';
            case 3:
                return 'Inactive';
        }
    }
    handleClose = () => {
        this.setState({ requestPopup: false });
    }
    render() {
        let requestCard = this.state.Requests.map(request => {
            if (request.receiver != "0x0000000000000000000000000000000000000000") {
                if (request.requestType == 0) {
                    return (
                        <RequestCard request={request} donationId={this.props.donation.donationId} assetId={this.props.donation.assetId} requestApprove={this.requestApprove} readOnly={false} />)
                }
                else if (request.requestType == 1) {
                    return (
                        <ProjectRequestCard request={request} donationId={this.props.donation.donationId} assetId={this.props.donation.assetId} requestApprove={this.requestApprove} readOnly={false} />)
                }
            }
        });
        return (
            <div>
                <br></br>
                <div class="col xs = {3}" key={this.props.donation.donationId}>
                    <div class="container" >
                        <Card style={{ flex: 1 }} >
                            <div id="yourContainer">
                                <Card.Img variant="top" src={'https://ipfs.io/ipfs/' + this.props.asset.imageIPFSHash} alt="" />
                            </div>
                            <Card.Body>
                                <Card.Text>
                                    Description: {this.props.asset.assetDescription}</Card.Text>
                                <Card.Text>
                                    Location: {this.props.donation.location}</Card.Text>
                                <Card.Text>
                                    Status: {this.decodeStatus(this.props.donation.status)}
                                </Card.Text>
                                <Button variant="secondary" onClick={this.getRequests}>Show Requests</Button>
                            </Card.Body>
                        </Card>
                        <Modal show={this.state.requestPopup} onHide={this.handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Requests</Modal.Title>
                            </Modal.Header>
                            <Modal.Body><div class="card shadow mb-4">
                                <div class="form-row">

                                    <CardDeck tyle={{ display: 'flex', flexDirection: 'row' }}>
                                        {requestCard}
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
                </div>
            </div>
        )
    }
}

export default AssetCard;