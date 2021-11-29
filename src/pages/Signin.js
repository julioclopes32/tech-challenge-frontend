import React, {Component} from 'react'
import { auth } from '../firebase';
import './login.css';
import { withRouter } from "react-router-dom";


class Signin extends Component {
    constructor(props){
        super(props);
        props = this.props
    }

    state = {
        alertText: "ALERTA!",
        username : "",
        password : "",
        confirmPass: "",
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

    getConfirmPass(){
        return(this.state.confirmPass)
    }

    //Validate Email format.
    validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    //siup account in firebase authentication.
    signUp(e){
        this.hideAlert();
        const username = this.getUsername();
        const password = this.getPassword();
        const confirmPass = this.getConfirmPass();
        if(username === "" || password === "" || confirmPass === ""){
            this.showAlert("Fill all fields!")
        }else if(confirmPass !== password){
            this.showAlert("passwords don't match!")
        }else if(!this.validateEmail(username)){
            this.showAlert("Email baddly formatted!")
        }
        else{
            e.preventDefault();
            auth.createUserWithEmailAndPassword(
                username,
                password
            ).then(user=>{
                alert("Successfull Registered")
                this.signIn()
            }).catch(err=>{
                this.showAlert(err.toString())
            })
        }
    }

    //Login on successful register.
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
        <div className="home">
        <div className="brand" onClick={()=>this.props.history.push('/')}> 
            <p><i className="fas fa-video"></i> Fleye-Tech-Challenge</p>
        </div>
        <div className="container">
            <p className="search">Sign-in </p>
            <div className="userform">
                <input
                type="text"
                placeholder="Email"
                defaultValue = "Email"
                name="movie"
                required=""
                onChange={(e) => {
                    this.setState({username:e.target.value});
                }}/>
                <br/>
                <br/>
                <input
                type="text"
                placeholder="Password"
                defaultValue = "Password"
                required=""
                onChange={(e) => {
                    this.setState({password:e.target.value});
                }}/>
                <br/>
                <br/>
                <input
                type="text"
                placeholder="Confirm Password"
                defaultValue = "Confirm Password"
                required=""
                onChange={(e) => {
                    this.setState({confirmPass:e.target.value});
                }}/>
                <br/>
                <br/>
                <input id="login-btn"
                type="Submit" 
                defaultValue = "Sign-Up"
                onClick={(e)=>{this.hideAlert();setTimeout(() => {this.signUp((e))}, 1000);}}/>
                <div id="alerta" className="alert" ref={alerta => this.alerta = alerta}>
                    {this.getAlertText()}
                </div>
            </div>
            <p id="login-register" onClick={()=>this.props.history.push('/login')}>go to Login!</p>
            </div>
        </div>
        )
    }
}

export default withRouter(Signin);