import React, {Component} from 'react'
import { auth } from '../firebase';
import '../App.css';
import { withRouter } from "react-router-dom";


class Login extends Component {
    constructor(props){
        super(props);
        props = this.props
    }

    state = {
        alertText: "ALERTA!",
        username : "",
        password : "",
    };

    getAlertText(){
        return(this.state.alertText)
    }

    hideAlert(){
        this.alerta.style.display='none';
    }

    showAlert(text){
        this.setState({alertText:text});
        this.alerta.style.display='block';
    }

    getUsername(){
        return(this.state.username)
    }

    getPassword(){
        return(this.state.password)
    }

    //Validate email format
    validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    //login with firebase authentication.
    signIn(){
        this.hideAlert();
        const username = this.getUsername();
        const password = this.getPassword();
        if(username === "" || password === ""){
            this.showAlert("Fill all fields!")
        }else if(!this.validateEmail(username)){
            this.showAlert("Email baddly formatted!");
        }
        else{
            auth.signInWithEmailAndPassword(
                username,
                password
            ).then(user=>{
                this.showAlert("Successfully Logged!");
                this.props.history.push('/');
            }).catch(err=>{
                this.showAlert(err.toString())
            })
        }
    }

    render() {
        return (
        <div>
            <div className="home">
            <div className="brand"> 
                <p><i className="fas fa-video"></i> Fleye-Tech-Challenge</p>
            </div>
            <div className="container">
                <p className="search">Login </p>
                <div className="userform">
                    <input
                    type="email"
                    placeholder="Username"
                    defaultValue="Username"
                    name="movie"
                    required=""
                    onChange={(e) => {
                        this.setState({username:e.target.value});
                    }}/>
                    <br/>
                    <br/>
                    <input
                    type="password"
                    placeholder="Password"
                    defaultValue="Password"
                    name="movie"
                    required=""
                    onChange={(e) => {
                        this.setState({password:e.target.value});
                    }}/>
                    <br/>
                    <br/>
                    <input id="login-btn"
                    type="Submit"
                    defaultValue="Login" 
                    onClick={()=>{this.hideAlert();setTimeout(() => {this.signIn()}, 1000);}}/>
                    <div id="alerta" className="alert" ref={alerta => this.alerta = alerta}>
                        {this.getAlertText()}
                    </div>
                </div>
                <p id="login-register" onClick={()=>this.props.history.push('/signin')}>don't have an account? sign-up!</p>
            </div>
            </div>
        </div>
        )
    }
}

export default withRouter(Login);