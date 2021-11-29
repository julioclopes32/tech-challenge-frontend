import React, {Component} from 'react'
import '../App.css';
import { auth } from '../firebase';
import { withRouter } from "react-router-dom";

class Home extends Component {
  constructor(props){
      super(props);
      props = this.props
  }

  state = {
      user: auth.currentUser,
      alertText: "ALERTA!",
      movie : "",
  };

  getProps(){
    return(this.state.props)
  }
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

  getMovie(){
      return(this.state.movie)
  }

  getUser(){
    return(this.state.user)
  }

  //Setting animation to square Icon and UserOptions box - hide/show.
  userOptionsEnter(){
    this.userOptions.style.display='block'
    this.down.style.display='block'
    this.up.style.display='none'
  }

  userOptionsLeave(){
    this.userOptions.style.display='none'
    this.down.style.display='none'
    this.up.style.display='inline-block'
  }

  //go to favorite page
  favorites(){
    this.props.history.push('/favorites')
  }

  //logout from account - go to login page
  logout(){
    auth.signOut().then(()=>{
      this.props.history.push('/login');
      alert("Log-Out Successfully");
    }).catch(function(error){
      console.log(error.toString())
    });
  }

  //
  resultMovie(){
    if(this.getMovie() === ""){
      this.hideAlert();
      setTimeout(() => {
        this.showAlert("Fill Movie Name!")
      }, 1000);
    }else{
      this.props.history.push('/results?movie='+this.getMovie());
    }
  }

  render() {
      if(this.state.user===null){
        this.props.history.push('/login')
      }
      return (
        <div className="home">
        <div className="brand"> 
          <p><i className="fas fa-video"></i> Fleye-Tech-Challenge</p>
        </div>
        <div className="userImage"
          onMouseEnter={()=>{this.userOptionsEnter()}}
          onMouseLeave={()=>{this.userOptionsLeave()}}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="UserImage"/>
          <div id="userIcon" 
          className="userIcon">
            <i id="up" className="fas fa-chevron-up" ref={up => this.up = up}></i>
            <i id="down" className="fas fa-chevron-down" ref={down => this.down = down}></i>
          </div>
          <div id="userOptions" className="userOptions" ref={userOptions => this.userOptions = userOptions}>
            <p onClick={()=>{this.favorites()}}>favorites</p>
            <p onClick={()=>{this.logout()}}>log-Out</p>
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
                this.setState({movie:e.target.value});
              }}/>
              <input 
              type="Submit" 
              onClick = {()=>{this.resultMovie()}}/>
              <div id="alerta" className="alert" ref={alerta => this.alerta = alerta}>
                  {this.getAlertText()}
              </div>
          </div>
        </div>
      </div>
      )
  }
}

export default withRouter(Home);