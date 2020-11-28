import { render } from "@testing-library/react";
import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import history from '../history';


class MainPage extends Component {
    constructor(props) {
        super(props);
      }
    Donate(){
        history.push('/DonarPage');
    }
    Request(){}
    render() {
        return (
            <div>
                <div class="container">
                    <div class="jumbotron">
                        <h2> Asset Donation  </h2>
                    </div>
                </div>
                <div class="container">
                    <div class="form-row">
                        <div class=" form-group col-md-6">
                        <button type="button" class="btn btn-outline-primary btn-block" onClick={() => history.push('/DonarPage')}>Enter As a Donor</button>
                        <button type="button" class="btn btn-outline-primary btn-block" onClick={() => history.push('/RequestPage')}>Request Donation</button>
                        </div>
                        <div class="col-xl-5 col-lg-6">
                            <div class="card shadow mb-4">
                                <div class="card-header py-3">
                                </div>
                                <div class="card-body">

                                    <div class="container">
                                        <div class="row">
                                            <div class="col-12">
                                                <div class="card">
                                                    <div class="card-body">
                                                        <Image src="donate.png" thumbnail />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

export default MainPage;