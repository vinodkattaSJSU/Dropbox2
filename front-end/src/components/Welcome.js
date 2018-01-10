import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'; //Link,
import PropTypes from 'prop-types';
import * as API from '../api/API';
import ImageGridList from "./ImageGridList";
import TextField from 'material-ui/TextField';
//Simport Upload from 'material-ui-upload/Upload';
import Typography from 'material-ui/Typography';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';



class Welcome extends Component {

    static propTypes = {
        username: PropTypes.string.isRequired,
        handleLogout: PropTypes.func.isRequired,
        handleProfile: PropTypes.func.isRequired
    };

    handleFileUpload = (event) => {
        const payload = new FormData();
        payload.append('mypic', event.target.files[0]);
        alert(payload);
        //payload.append('dname',this.state.dname);
        // alert("ASAS");
        //  payload.append('email',this.props.userDetails);
        //console.log("IN SUCCESS");
        //console.log(this.props.userDetails);
        API.uploadFile(payload)
            .then((status) => {
                if (status === 204) {
                    API.getImages()
                        .then((data) => {
                            this.setState({
                                images: data
                            });
                            console.log('2222222222222222');
                            console.log(this.state.images);
                        });
                    console.log("IN UPLOAD FILE STATUS");
                }
            });
    };
    constructor() {
        super();
        this.state = {
            images: [],

        };
    }

    componentDidMount() {
        API.getImages()
            .then((data) => {

                this.setState({
                    images: data
                });
            });
    };

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-3 col-md-3 col-lg-2 col-secondary form-group" >
                        <nav className="navbar fixed-top navbar-light bg-faded py-4 ">
                            <div className="container top">
                                <div className="navbar-header">
                                    <img src="https://cfl.dropboxstatic.com/static/images/logo_catalog/dropbox_logo_glyph_2015_m1-vfleInWIl.svg" width={46} height={46}/>
                                </div>
                            </div>
                        </nav>
                        <div>
                            <a className="text-primary" onClick={() => {
                                this.props.handleSignUp("welcome");}}><h4>Home</h4></a>
                        </div>
                        <div>
                            <h4>Files</h4>
                        </div>
                        <div>
                            <h4>Paper</h4>
                        </div>
                    </div>
                    <div className="col-sm-9 col-md-9 col-lg-8" >
                        <nav className="navbar fixed-top navbar-light bg-faded py-3 ">
                            <div className="container top">
                                <div className="navbar-header ">
                                    <h2>Home</h2>
                                </div>
                            </div>

                        </nav>

                        {/*<Typography*/}
                            {/*align={'center'}*/}
                            {/*type="display3"*/}
                            {/*className="txt txt-primary"*/}
                        {/*>DropBox*/}
                        {/*</Typography>*/}
                        <ImageGridList images={this.state.images}/>
                    </div>
                    <div className="col-sm-3 col-md-3 col-lg-2">
                        <nav className="navbar fixed-top navbar-light bg-faded py-5 ">
                            <div className="container top">
                                <div className="navbar-header ">
                                    <div>
                                        <button className="btn btn-default" onClick={() => this.props.handleProfile("profile")}>My Profile</button>


                                        <button className="btn btn-danger" onClick={() => this.props.handleLogout("login")}>Logout</button>
                                    </div>
                                </div>
                            </div>

                        </nav>

                        <div>
                        <TextField
                            className={'fileupload'}
                            type="file"
                            name="mypic"
                            onChange={this.handleFileUpload}
                        />
                            {/*<label className="btn btn-primary" for="my-file-selector">*/}
                                {/*<input id="my-file-selector" type="file" style="display:none;"/>*/}
                                    {/*Upload*/}
                            {/*</label>*/}

                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default Welcome;