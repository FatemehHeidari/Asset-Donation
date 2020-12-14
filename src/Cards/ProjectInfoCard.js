import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
class ProjectInfoCard extends Component {
    constructor(props) {
        super(props);
        this.donationAmount = React.createRef();
        this.state = {
            donated: 0
        };
    }
    donate = async () => {
        const amn = this.donationAmount.current.value;
        this.props.donate({ projectId: this.props.id, donationAmount: amn });
    }
    render() {
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
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="donationAmount">Amount:</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                ref={this.donationAmount}
                                placeholder="donationAmount(ether)"
                                aria-label="donationAmount"
                                aria-describedby="donationAmount"
                            />
                        </InputGroup>

                        <Button variant="outline-dark" onClick={this.donate}>Donate</Button>
                    </Card.Body>
                </Card>

            </div>

        )
    }
}

export default ProjectInfoCard;