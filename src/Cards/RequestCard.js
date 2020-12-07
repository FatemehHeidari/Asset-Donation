import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
class AssetCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    requestApprove=async()=>{
        this.props.requestApprove({assetId:this.props.assetId,receiver:this.props.request.receiver});
    }  
    render() {
        return (

            <div>
                <br></br>
                <div class="col xs = {3}" key={this.props.assetId}>
                {/* <div class="col xs = {3}"> */}
                    <div class="container" >
                        <Card style={{ flex: 1 }} >
                            <Card.Img variant="top" src="donate.png" />
                            <Card.Body>
                                <Card.Text>
                                    Description: {this.props.request.requestDescription}</Card.Text>
                                <Card.Text>
                                    Date(From): {this.props.request.requestDateFrom}</Card.Text>
                                <Card.Text>
                                    Date(To): {this.props.request.requestDateTo}</Card.Text>                                   
                                <Button variant="primary" onClick={this.requestApprove}>Approve Request</Button>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

export default AssetCard;