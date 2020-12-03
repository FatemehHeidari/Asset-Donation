import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import CardDeck from 'react-bootstrap/CardDeck';
import RequestCard from './RequestCard';
import Web3 from "web3";
import { AssetDonation } from "./abi/abi";
import donate from './donate.png';

const OPTIONS = {
    defaultBlock: "latest",
    transactionConfirmationBlocks: 1,
    transactionBlockTimeout: 5
  }
  const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545", null, OPTIONS);
  const contractAddress = "0x4C9AD7141E337Ac67D7556e148D9A671F1280950";//"0x0C7640A95b3748E1fcEEA74dED19D969696d7f18";//"0x70a477883Fff5e6820291C027e000F8665e44287";
  const assetDonationContract = new web3.eth.Contract(AssetDonation, contractAddress);
  const state = {
    hello: 0
  }
class AssetCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Requests :[],
            requestPopup: false
        };
    }
    getRequests = async (t) => {
        t.preventDefault();
        const accounts = await window.ethereum.enable();
        const account = accounts[0];
        let assetId = this.props.asset.assetId;
        console.log('assetId');
        console.log(assetId);
        const gasAmount = await assetDonationContract.methods.getDonationRequests(assetId).estimateGas({ from: account });
        const result = await assetDonationContract.methods.getDonationRequests(assetId).call({
          from: account,
          gasAmount,
        });
        console.log('result');
        console.log(result);
        this.setState({ Requests: result ,requestPopup:true});
      };
      requestApprove= async(t)=>{
        console.log(t);
        console.log('t');
        const accounts = await window.ethereum.enable();
        const account = accounts[0];
        const gasAmount = await assetDonationContract.methods.donateAsset(t.assetId,t.receiver).estimateGas({ from: account });
        const result = await assetDonationContract.methods.donateAsset(t.assetId,t.receiver).send({
            from: account,
            gasAmount,
        });
        //this.setState({buttonDisabled : false});
        console.log('result');
        console.log(result);
    
      }

    handleClose = () => {
        this.setState({ requestPopup: false });
    }
    render() {
        let requestCard = this.state.Requests.map(request => {
            return (
                <RequestCard request={request}assetId = {this.props.asset.assetId} requestApprove={this.requestApprove}/>)
        });
        return (
            <div>
                <br></br>
                <div class="col xs = {3}" key={this.props.asset.assetId}>

                    <div class="container" >
                        <Card style={{ flex: 1 }} >
                            <Card.Img variant="top" src={'https://ipfs.io/ipfs/'+ this.props.asset.imageIPFSHash} alt="" />
                            <Card.Body>
                                <Card.Text>
                                    Description: {this.props.asset.assetDescription}</Card.Text>
                                <Card.Text>
                                    Location: {this.props.asset.location}</Card.Text>
                                <Button variant="primary" onClick={this.getRequests}>Show Requests</Button>
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
                                <Button variant="secondary" onClick={this.handleClose} disabled={this.state.buttonDisabled}>
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