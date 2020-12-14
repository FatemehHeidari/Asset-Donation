import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
class ProjectRequestCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    requestApprove = async () => {
        this.props.requestApprove({ assetId: this.props.assetId, receiver: this.props.request.receiver });
    }
    render() {
        return (

            <div>
                <br></br>
                <div class="col xs = {3}" key={this.props.assetId}>
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