import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import * as API from '../api/API';
import Login from "./Login";
import axios from 'axios';

import Signup from "./Signup";
import Profile from "./Profile";
import Message from "./Message";
import Welcome from "./Welcome";

class NewerHomePage extends Component {

    state = {
        component:"login",
        message: '',
        username: ''
    };

    handleSubmit = (userdata,component) => {
        API.doLogin(userdata)
            .then((status) => {
                if (status === 201) {
                    this.setState({

                        component:component,

                        username: userdata.username
                    });
                    //this.props.history.push("/welcome");
                } else if (status === 401) {
                    this.setState({
                        isLoggedIn: false,
                        message: "Wrong username or password. Try again..!!"
                    });
                }
            });

    };

    handleSignUp = (component) => {
        this.setState({
            component:component
        });


    };
    handleProfile = (component) => {
        this.setState({
            component:component
        });


    };

    handleSaveProfile = (userdata,component) => {
        axios.post('http://localhost:3001/saveProfile',{
            userdata: userdata
        }).then((status) => {
            if (status === 201) {
                this.setState({

                    message: "Data saved successfully!!",

                });
            }
        });
    };


    handleSignup = (userdata,component) => {
        API.doSignup(userdata)
            .then((status) => {
                if (status === 201) {

                    this.setState({
                        //issignedup: true,
                        component:component,
                        message: "SignUp success..Now login again",
                        username: userdata.username
                    });
                    //this.props.history.push("/login1");
                } else if (status === 401) {
                    this.setState({
                        component:"signup",
                        message: "User with same username exists..Try new username"
                    });
                }
            });
    };

    handleUpdateUserDetails=(userdata)=>{
        axios.post('http://localhost:3001/updateUserDetails',{
            userdata: userdata
        }).then((status) => {
            if (status === 201) {
                this.setState({

                    message: "Data saved successfully!!",

                });
            }
        });
    };

    handleLogout = (component) => {
        console.log('logout called');
        API.logout()
            .then((status) => {
                if(status === 200){
                    this.setState({
                        component:component,
                        message:"Logout success",
                    });
                }
            });
    };




    render() {

        if(this.state.component==="login"){
            return(
                <div>
                    <Login handleSubmit={this.handleSubmit} handleSignUp={this.handleSignUp} component={this.state.component} message={this.state.message}/>
                    {/*<Message message={this.state.message}/>*/}
                    {/*<Route exact path="/welcome" render={() => (*/}
                        {/**/}

                    {/*)}/>*/}
                </div>
            );
        }
        else if(this.state.component==="signup"){
            return(
                <div>
                    <Signup handleSignup={this.handleSignup} handleSignUp={this.handleSignUp} message={this.state.message}/>
                    {/*<Message message={this.state.message}/>*/}
                </div>
            );
        }
        else if(this.state.component==="welcome"){
            return(
                <div>
                    <Welcome handleLogout={this.handleLogout} username={this.state.username} handleProfile={this.handleProfile}/>
                </div>
            );
        }
        else if(this.state.component=="profile"){
            return(
                <div>
                    <Profile handleUpdateUserDetails={this.handleUpdateUserDetails} handleLogout={this.handleLogout} handleSignUp={this.handleSignUp} username={this.state.username} message={this.state.message}/>
                </div>
            )
        }




    }

}

export default withRouter(NewerHomePage);