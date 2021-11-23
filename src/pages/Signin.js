import React from 'react'
import { useState } from 'react';
import { auth } from '../firebase';
import {useHistory} from 'react-router-dom';
import './login.css';

const Signin = () => {
    const history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function HomeButton() {
        history.push('/')
    };

    function LoginButton() {
        history.push('/login')
    };

    const signUp = e => {
        if(username === "" || password === "" || confirmPass === ""){
            alert("Fill all fields!")
        }else if(confirmPass !== password){
            alert("passwords don't match!")
        }else if(!validateEmail(username)){
            alert("Email baddly formatted!")
        }
        else{
            e.preventDefault();
            auth.createUserWithEmailAndPassword(
                username,
                password
            ).then(user=>{
                alert("Successfully Registered!")
            }).catch(err=>{
                alert(err)
            })
        }
    }

    return (
        <div className="home">
      <div className="brand" onClick={HomeButton}> 
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
                setUsername(e.target.value);
            }}/>
            <br/>
            <br/>
            <input
            type="text"
            placeholder="Password"
            defaultValue = "Password"
            required=""
            onChange={(e) => {
                setPassword(e.target.value);
            }}/>
            <br/>
            <br/>
            <input
            type="text"
            placeholder="Confirm Password"
            defaultValue = "Confirm Password"
            required=""
            onChange={(e) => {
                setConfirmPass(e.target.value);
            }}/>
            <br/>
            <br/>
            <input id="login-btn"
            type="Submit" 
            defaultValue = "Sign-Up"
            onClick={signUp}/>
        </div>
        <p id="login-register" onClick={LoginButton}>go to Login!</p>
      </div>
    </div>
    )
}
export default Signin