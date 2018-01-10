import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'; //Link,
import PropTypes from 'prop-types';
import * as API from '../api/API';
import axios from 'axios';
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



class Profile extends Component {

    static propTypes = {
        username: PropTypes.string.isRequired,
        handleLogout: PropTypes.func.isRequired,
        handleSignUp: PropTypes.func.isRequired,
        handleUpdateUserDetails:PropTypes.func.isRequired,
    };


    constructor() {
        super();
        this.state = {
            firstname:'',
            lastname:'',
            email:'',
            mobile:'',
            degree:'',
            job:'',
            bday:'',
            music:'',
            shows:'',
            sports:''
        };

    }

    componentDidMount() {
        API.getImages()
            .then((data) => {

                this.setState({
                    images: data
                });
            });
        axios.post('http://localhost:3001/getUserDetails',{
            user: this.props.username,
        }).then((data) => {
            this.setState({
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,
                mobile: data.mobile,
                degree: data.degree,
                job: data.job,
                bday: data.bday,
                music: data.music,
                shows: data.shows,
                sports: data.shows,
            });

        });
    };

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-3 col-md-3 col-lg-2 form-group" >
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
                        {/*<ImageGridList images={this.state.images}/>*/}
                        <div className="col-sm-5 col-md-5 col-lg-5 justify-content-md-center">
                        <div>
                            <h3>My Info</h3>
                        </div>
                        <hr/>
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                label="firstname"
                                placeholder="firstname"
                                value={this.state.firstname}
                                onChange={(event) => {
                                    this.setState({
                                        firstname: event.target.value
                                    });
                                }}
                            />
                            <input
                                className="form-control"
                                type="text"
                                label="lastname"
                                placeholder="lastname"
                                value={this.state.lastname}
                                onChange={(event) => {
                                    this.setState({
                                        lastname: event.target.value
                                    });
                                }}
                            />
                        </div>
                        <div className="form-group">
                            Mobile:<input
                            className="form-control"
                            type="tel"
                            label="mobile"
                            placeholder="+1-(669)-225-9180"
                            value={this.state.mobile}
                            onChange={(event) => {
                                this.setState({
                                    mobile: event.target.value
                                });
                            }}
                        />
                        </div>
                        <div className="form-group">
                            Email:<input
                            className="form-control"
                            type="email"
                            label="email"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={(event) => {
                                this.setState({
                                    email: event.target.value
                                });
                            }}
                        />
                        </div>

                        <div className="form-group">
                            Degree:<input
                            className="form-control"
                            type="text"
                            label="Degree"
                            placeholder="Degree"
                            value={this.state.degree}
                            onChange={(event) => {
                                this.setState({
                                    degree: event.target.value
                                });
                            }}
                        />
                        </div>

                        <div className="form-group">
                            Job:<input
                            className="form-control"
                            type="text"
                            label="Job"
                            placeholder="Job"
                            value={this.state.job}
                            onChange={(event) => {
                                this.setState({
                                    job: event.target.value
                                });
                            }}
                        />
                        </div>
                        <div className="form-group">
                            Birthday:<input
                            className="form-control"
                            type="date"
                            label="Birthday"
                            placeholder="Birthday"
                            value={this.state.bday}
                            onChange={(event) => {
                                this.setState({
                                    bday: event.target.value
                                });
                            }}
                        />
                        </div>

                        <div>
                            <h3>Interests</h3>
                        </div>
                        <hr/>
                        <div className="form-group">
                            Music:<input
                                className="form-control"
                                type="text"
                                label="Music"
                                placeholder="Favourite music"
                                value={this.state.music}
                                onChange={(event) => {
                                    this.setState({
                                        music: event.target.value
                                    });
                                }}
                            />
                        </div>

                        <div className="form-group">
                            Shows:<input
                                className="form-control"
                                type="text"
                                label="shows"
                                placeholder="Favourite shows"
                                value={this.state.shows}
                                onChange={(event) => {
                                    this.setState({
                                        shows: event.target.value
                                    });
                                }}
                            />
                        </div>

                        <div className="form-group">
                            Sports:<input
                                className="form-control"
                                type="text"
                                label="sports"
                                placeholder="Favourite sports"
                                value={this.state.sports}
                                onChange={(event) => {
                                    this.setState({
                                        sports: event.target.value
                                    });
                                }}
                            />
                        </div>
                        <div>
                            <button className="btn btn-primary" onClick={() => this.props.handleUpdateUserDetails(this.state)}>Update</button>
                        </div>

                        </div>

                    </div>
                    <div className="col-sm-3 col-md-3 col-lg-2">
                        <nav className="navbar fixed-top navbar-light bg-faded py-5 ">
                            <div className="container top">
                                <div className="navbar-header ">
                                    <div>
                                        <button className="btn btn-danger" onClick={() => this.props.handleLogout("login")}>Logout</button>
                                    </div>
                                </div>
                            </div>

                        </nav>


                    </div>
                </div>
            </div>

        );
    }
}

export default Profile;