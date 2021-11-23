import React from 'react'
import { useState } from 'react';
import { auth } from '../firebase';
import '../App.css';
import {useHistory} from 'react-router-dom';

const Login = () => {
    const history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function SignInButton() {
        history.push('/signin')
    };

    function goHome() {
        history.push('/')
    };

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const signIn = e => {
        if(username === "" || password === ""){
            alert("Fill all fields!")
        }else if(!validateEmail(username)){
            alert("Email baddly formatted!")
        }
        else{
            e.preventDefault();
            auth.signInWithEmailAndPassword(
                username,
                password
            ).then(user=>{
                alert("Successfully Logged!");
                goHome();
            }).catch(err=>{
                alert(err)
            })
        }
    }

    return (
    <body>
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
                setUsername(e.target.value);
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
                setPassword(e.target.value);
            }}/>
            <br/>
            <br/>
            <input id="login-btn"
            type="Submit"
            defaultValue="Login" 
            onClick={signIn}/>
        </div>
        <p id="login-register" onClick={SignInButton}>don't have an account? sign-up!</p>
      </div>
    </div>
    </body>
    )
}
export default Login