import React, {Component} from 'react'
import './Results'
import axios from 'axios';
import { auth } from '../firebase';
import { withRouter } from "react-router-dom";


class Favorites extends Component {
    constructor(props){
        super(props);
        props = this.props
    }

    state = {
        loading: "true",
        user: auth.currentUser,
        movies : []
    };

    getUser(){
        return(this.state.user)
    }

    getMovies(){
        return(this.state.movies)
    }

    appendMovies(value){
        this.state.movies.push(value)
    }

    //send HTTP method to backend to remove movie from favorite list, then go to home/seach page.
    removeFavorite(id, user) {
        this.getMovies().forEach(element => {
            if(element.imdbID === id){
                element.user = user;
                console.log(element)
                axios.post('http://tech-challenge-backend.herokuapp.com/removefavorites', element, {crossdomain: true})
                .then((response) => {
                    console.log(response);
                    if(response.statusText==="OK"){
                        alert("Movie Successfully removed from Favorite List");
                        this.props.history.push("/home")
                    }
                });
            }
        });
    };

    //Get Favorite movie list and then render on response.
    async componentDidMount() {
        axios.get('https://tech-challenge-backend.herokuapp.com/getfavorites?id='+this.getUser)
          .then(res => {
            let uid = this.getUser();
            if(this.getUser()===null || this.getUser()===undefined){
                this.props.history.push("/login")
            }else{
                uid = this.getUser()._delegate.uid;
                console.log(res.data[uid]);
                if(res.data[uid] === null || res.data[uid] === undefined){
                    return
                }else{
                    let keys = Object.keys(res.data[uid])
                    console.log(keys)
                    keys.forEach(element => {
                        this.appendMovies(res.data[uid][element].post_body)
                    });
                    console.log(this.getMovies())
                    this.setState({loading:"false"});
                }
            }
          })
    }

    render() {
        return (
            <div>
            <div id="search-navbar">
                <div className="search-brand"><p onClick={() => this.props.history.push('/')}><i className="fas fa-video"></i> Fleye-Tech-Challenge</p></div>
            </div>
            
            <p className="result">Favorite Movies</p>
            <div className="search-container">
            {this.getMovies().map((movie) => {
                    return (
                        <div className="card">
                            <div className="card-image-box">
                                <img className="card-image" src={movie.Poster} onError={(e)=>{e.target.src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQkmpiE3saxLv17jlQVpffuUAAtU95HJoaPRw&amp;usqp=CAU'}}/>
                                <div className="black-filter">
                                    <p><a href={movie.Poster} target="_blank"><i className="fas fa-eye"></i></a></p>
                                </div>
                            </div>
                            <div className="card-description">
                                <a><p className="card-title">{movie.Title}</p></a>
                                <p className="card-rating"><span className="topic">IMDB ID:</span>  <i className="fas fa-star"></i> <span className="rating">{movie.imdbID}</span></p>
                                <p><span className="topic">Type: </span> &nbsp;movie </p> 
                                <p><span className="year">Year: </span> {movie.Year} </p> 
                                <p id={movie.imdbID} className="heart" onClick={(e) => this.removeFavorite(e.target.id, this.getUser())}><span><i className="fas fa-thumbs-down"></i></span>  Remove from Favorite List</p> 
                            </div>    
                        </div> 
                    )
                })}
            </div>
            </div>
       
        );
    }
}

export default withRouter(Favorites);