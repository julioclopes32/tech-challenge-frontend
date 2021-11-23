import '../App.css';
import axios from 'axios';
import { useState } from 'react';
import { auth } from '../firebase';
import {useHistory} from 'react-router-dom';

var movieData = null;

const Home = () => {
  const history = useHistory();
  const [movieName, setMovieName] = useState("");
  const apikey = "925eba28"; 
  /*const fetchData = () => {
    return axios.get("https://tech-challenge-backend.herokuapp.com/sms").then((response) => console.log(response.data));
  };

  fetchData();

  const fetchData2 = () => {
    return axios.get("https://tech-challenge-backend.herokuapp.com/").then((response) => console.log(response.data));
  };
  
  fetchData2();
  */

  const LogOut = () => {
    console.log("LogOut");
    auth.signOut().then(function() {
      alert("Sign-Out Successfully");
      history.push('/login')
    }).catch(function(error) {
      alert("error");
    });

  };

  const Favorites = () => {
    console.log("Favorites");
    history.push('/Favorites')
  };

  const onleave = () =>{
    setTimeout(function(){var element = document.getElementById("userBox");element.style.visibility='hidden';console.log("onleave");},3000);
  };

  const submitMovie= () => {
    return axios.get('https://www.omdbapi.com/?apikey='+apikey+'&s='+encodeURI(movieName)).then(function(response){
      console.log(response.data);
      movieData = response.data;
      history.push('/Search')
    }); 
  }

  return (
    <div className="home">
      <div className="brand"> 
        <p><i className="fas fa-video"></i> Fleye-Tech-Challenge</p>
      </div>
      <div className="userImage">
        <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="UserImage"/>
        <div id="userIcon" 
        className="userIcon"
        onMouseEnter={function(){var element = document.getElementById("userBox");
        element.style.display='block';console.log("onEnter")}} 
        onMouseLeave={onleave}>
          <i id="up" className="fas fa-chevron-up"></i>
          <i id="down" className="fas fa-chevron-down"></i>
        </div>
        <div id="userBox" className="userBox">
          <p onClick={Favorites}>favorites</p>
          <p onClick={LogOut}>log-Out</p>
        </div>
      </div>
      <div className="container">
        <p className="search">Search Movie </p>
        <div className="form">
            <input 
            type="text"
            placeholder="Enter Movie name or keyword"
            name="movie"
            required=""
            onChange={(e) => {
              setMovieName(e.target.value);
            }}/>
            <input 
            type="Submit" 
            onClick = {submitMovie}/>
        </div>
      </div>
    </div>
  );
}

export {movieData};
export default Home;