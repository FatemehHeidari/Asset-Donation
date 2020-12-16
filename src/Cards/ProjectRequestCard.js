import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import web3 from '../utils/web3.js'

class ProjectRequestCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    requestApprove = async () => {
        let t = { donationId: this.props.donationId, assetId: web3.utils.hexToNumber(this.props.assetId._hex), receiver: this.props.request.receiver };
        console.log('tr');
        console.log(t);
        this.props.requestApprove(t);
    }
    render() {
        return (

            <div>
                <br></br>
                <div class="col xs = {3}" key={this.props.donationId}>
                    <div class="container" >
                        <Card style={{ flex: 1 }} >
                            <div id="yourContainer">
                                <Card.Header>Project Request</Card.Header>
                                <Card.Body>
                                    <Card.Text>
                                        Project Title: {this.props.request.project.ProjectTitle}</Card.Text>
                                    <Card.Text>
                                        Project Description: {this.props.request.project.ProjectDescription}</Card.Text>
                                    {!this.props.readonly && <Button variant="secondary" onClick={this.requestApprove}>Approve Request</Button>}
                                </Card.Body>
                            </div>
                        </Card>
                    </div>
                </div>
                <br></br>
            </div>
        )
    }
}

export default ProjectRequestCard;