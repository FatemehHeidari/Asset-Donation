import logo from '../logo.svg';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Card from 'react-bootstrap/Card';
import '../App.css';
import Web3 from "web3";
import React, { Component, useState } from "react";
import { AssetDonation } from "../abi/abi";
import ipfs from '../ipfs';
import Form from 'react-bootstrap/Form';


const OPTIONS = {
    defaultBlock: "latest",
    transactionConfirmationBlocks: 1,
    transactionBlockTimeout: 5
}
const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545", null, OPTIONS);
const contractAddress = "0x4C9AD7141E337Ac67D7556e148D9A671F1280950";//"0x0C7640A95b3748E1fcEEA74dED19D969696d7f18";//"0x70a477883Fff5e6820291C027e000F8665e44287";
const assetDonationContract = new web3.eth.Contract(AssetDonation, contractAddress);



//const account = web3.givenProvider.selectedAddress;//accounts[0];
class AddDonation extends Component {

    constructor(props) {
        super(props);
        this.assetDes = React.createRef();
        this.assetLocation = React.createRef();
        this.assetTitle = React.createRef();
        this.fileadress = React.createRef();
        this.state = {
            buttonDisabled: false,
            buffer: null,
            ipfsHash:''
        };
    }

    addAsset = async (t) => {
        t.preventDefault();
        console.log('contractAddress');
        console.log(contractAddress);
        this.setState({ buttonDisabled: true });
        const accounts = await window.ethereum.enable();
        const account = accounts[0];
        //const account = await web3.givenProvider.selectedAddress;//accounts[0];
        console.log('selectedAddress');
        console.log(account);
        const des = this.assetDes.current.value;
        const loc = this.assetLocation.current.value;
        const gasAmount = await assetDonationContract.methods.addAsset(des, 0, loc,this.state.ipfsHash).estimateGas({ from: account });
        console.log('gasAmount');
        console.log(gasAmount);
        const result = await assetDonationContract.methods.addAsset(des, 0, loc,this.state.ipfsHash).send({
            from: account,
            gasAmount,
        });
        this.setState({ buttonDisabled: false });
        console.log('result');
        console.log(result);
    };

    fileUploaded = async (t) => {
        t.preventDefault();
        const file = t.target.files[0];
        console.log('this.fileadress');
        console.log(file);
        let contentBuffer = await this.readFileAsync(file);
        //const reader = new window.FileReader();
        //const result = await reader.readAsArrayBuffer(file);
        var fileBuffer = new Uint8Array(contentBuffer);
        console.log("Buffer: ", fileBuffer);
        this.setState({ buffer: fileBuffer });
        
                           
        const hash = await ipfs.files.add(Buffer.from(this.state.buffer));
        this.setState({ipfsHash:hash});
        console.log('hash',hash[0].hash);
        this.setState({ipfsHash:hash[0].hash});
        console.log('https://ipfs.io/ipfs/'+ this.state.ipfsHash);

        

    }


    readFileAsync = async(file)  =>{
        return new Promise((resolve, reject) => {
          let reader = new FileReader();
      
          reader.onload = () => {
            resolve(reader.result);
          };
      
          reader.onerror = reject;
      
          reader.readAsArrayBuffer(file);
        })
      }
    render() {
        return (<div>
            <div class="container">
                <div class="jumbotron">
                    <h2> Asset Donation  </h2>
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
                                                        <InputGroup.Text id="AssetTitle">Asset Title</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <FormControl
                                                        ref={this.assettitle}
                                                        placeholder="AssetTitle"
                                                        aria-label="AssetTitle"
                                                        aria-describedby="AssetTitle"
                                                    />
                                                </InputGroup>
                                                <InputGroup className="mb-3">
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text id="AssetDescription">Asset Description</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <FormControl
                                                        ref={this.assetDes}
                                                        placeholder="AssetDescription"
                                                        aria-label="AssetDescription"
                                                        aria-describedby="AssetDescription"
                                                    />
                                                </InputGroup>
                                                <InputGroup className="mb-3">
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text id="AssetLocation">Asset Location</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <FormControl
                                                        ref={this.assetLocation}
                                                        placeholder="AssetLocation"
                                                        aria-label="AssetLocation"
                                                        aria-describedby="AssetLocation"
                                                    />
                                                </InputGroup>
                                                <Card.Img variant="top" src={'https://ipfs.io/ipfs/'+ this.state.ipfsHash} alt=""/>
                                                <br></br>
                                                <Form>
                                                    <Form.File
                                                        id="custom-file-translate-html"
                                                        label="Voeg je document toe"
                                                        data-browse="Bestand kiezen"
                                                        custom
                                                        onChange={this.fileUploaded}
                                                        ref={this.fileadress}
                                                    />
                                                </Form>
                                                <br></br>
                                                <div class=" form-group col-md-6">
                                                    <button type="button" class="btn btn-outline-primary btn-block" onClick={this.addAsset} disabled={this.state.buttonDisabled}>Save</button>
                                                </div>
                                                {/* <InputGroup className="mb-3">
                                                    <FormControl
                                                        placeholder="Recipient's username"
                                                        aria-label="Recipient's username"
                                                        aria-describedby="basic-addon2"
                                                    />
                                                    <InputGroup.Append>
                                                        <InputGroup.Text id="basic-addon2">@example.com</InputGroup.Text>
                                                    </InputGroup.Append>
                                                </InputGroup>

                                                <label htmlFor="basic-url">Your vanity URL</label>
                                                <InputGroup className="mb-3">
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text id="basic-addon3">
                                                            https://example.com/users/
      </InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <FormControl id="basic-url" aria-describedby="basic-addon3" />
                                                </InputGroup>

                                                <InputGroup className="mb-3">
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>$</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <FormControl aria-label="Amount (to the nearest dollar)" />
                                                    <InputGroup.Append>
                                                        <InputGroup.Text>.00</InputGroup.Text>
                                                    </InputGroup.Append>
                                                </InputGroup>

                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text>With textarea</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <FormControl as="textarea" aria-label="With textarea" />
                                                </InputGroup> */}
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

export default AddDonation;