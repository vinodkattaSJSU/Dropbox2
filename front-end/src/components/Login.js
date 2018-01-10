import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Login extends Component {

    static propTypes = {
        handleSubmit: PropTypes.func.isRequired,
        handleSignUp: PropTypes.func.isRequired,
        message: PropTypes.string.isRequired
    };

    state = {
        username: '',
        password: '',
        signed: false
    };

    componentWillMount(){
        this.setState({
            username: '',
            password: '',
            signedup: false
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
                            <h4 className>Sign in &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div className="form-group pull-right"><small>or&nbsp;
                            <a className="text-primary" onClick={() => {
                                this.props.handleSignUp("signup");}}>create an account</a></small></div></h4>
                        </div>
                        {/*<div className="btn-group form-group pull-left" role="group" aria-label="Basic example" width={100}>*/}
                            {/*<button type="button" className="btn btn-primary ">*/}
                                {/*<span className="glyphicon">G </span>*/}
                            {/*</button>*/}
                            {/*<button type="button" className="btn btn-primary">Sign in with Google</button>*/}
                        {/*</div>*/}

                        <div className="form-group">

                            <input
                                className="form-control"
                                type="text"
                                label="Username"
                                placeholder="Email"
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
                                placeholder="Password"
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
                                onClick={() => this.props.handleSubmit(this.state,"welcome")}>
                                Sign in
                            </button>

                        {/*<button className="btn btn-success" type="button" onClick={() => {*/}
                            {/*this.props.handleSignUp("signup");*/}
                        {/*}}>*/}
                            {/*SignUp*/}
                        {/*</button>*/}
                        </div>
                        <div className="form-group">
                            <div>
                            {this.props.message && ( //Just a change here
                                <div><div></div>
                                <div className="alert alert-warning" align={'center'} role="alert">
                                    {this.props.message}
                                </div>
                                </div>
                            )}</div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default Login;