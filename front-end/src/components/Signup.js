import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Signup extends Component {

    static propTypes = {
        handleSignup: PropTypes.func.isRequired,
        handleSignUp: PropTypes.func.isRequired,
        message: PropTypes.string.isRequired
    };

    state = {
        username: '',
        password: '',
        firstname: '',
        lastname: '',
        issignedup:''
    };

    componentWillMount(){
        this.setState({
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            issignedup:''
        });
    }

    render() {
        return (
            <div>
                <nav className="navbar fixed-top navbar-light bg-faded py-4 ">
                    <div className="container top">
                        <div className="navbar-header">
                            <img src="https://cfl.dropboxstatic.com/static/images/logo_catalog/dropbox_logo_glyph_2015_m1-vfleInWIl.svg" width={46} height={46}/>
                            &nbsp;&nbsp;
                            <img src="https://cfl.dropboxstatic.com/static/images/logo_catalog/dropbox_logo_text_2015_m1-vflV-vZRB.svg" height={34} width={120}/>
                        </div>
                    </div>

                </nav>
    <hr/>
                <div className="col-sm-6 col-md-6 col-lg-6" >
                    <img className="pull-right" src="https://cfl.dropboxstatic.com/static/images/empty_states/rebrand_m1/sign-in-illo@2x-vflh_wJFN.png" height={305} width={288.5} />
                </div>

                <div className="col-sm-6 col-md-6 col-lg-6" >
                    <div className="col-sm-7 col-md-7 col-lg-7">
                        <div className="form-group pull-left" >
                            <h4 className>Create an account &nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div className="form-group pull-right"><small>or&nbsp;
                                    <a className="text-primary" onClick={() => {
                                        this.props.handleSignUp("login");}}>log in</a></small></div></h4>
                        </div>

                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                label="firstname"
                                placeholder="Enter firstname"
                                value={this.state.firstname}
                                onChange={(event) => {
                                    this.setState({
                                        firstname: event.target.value
                                    });
                                }}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                label="lastname"
                                placeholder="Enter lastname"
                                value={this.state.lastname}
                                onChange={(event) => {
                                    this.setState({
                                        lastname: event.target.value
                                    });
                                }}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                label="Username"
                                placeholder="Enter Username"
                                value={this.state.username}
                                onChange={(event) => {
                                    this.setState({
                                        username: event.target.value
                                    });
                                }}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                className="form-control"
                                type="password"
                                label="password"
                                placeholder="Enter Password"
                                value={this.state.password}
                                onChange={(event) => {
                                    this.setState({
                                        password: event.target.value
                                    });
                                }}
                            />
                        </div>

                        <div className="form-group">
                            <button
                                className="btn btn-primary pull-right"
                                type="button"
                                 onClick={() => this.props.handleSignup(this.state,"login")}>
                                Create an account
                            </button>

                        </div>
                        <div className="form-group row justify-content-md-center">
                            <div>
                                {this.props.message && ( //Just a change here
                                    <div className="alert alert-warning" align={'center'} role="alert">
                                        {this.props.message}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Signup;