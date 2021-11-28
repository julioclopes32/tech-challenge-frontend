import React, {Component} from 'react'
import './Results.css'
import axios from 'axios';
import { auth } from '../firebase';
import { withRouter } from "react-router-dom";
import ReactDOM from 'react-dom'; 


class Results extends Component {
    constructor(props){
        super(props);
        props = this.props
    }

    state = {
        finish: false,
        user: auth.currentUser,
        apikey: "925eba28",
        movie: "",
        alert: "",
        movies: [],
    };

    home(){
        this.props.history.push("/home")
    }

    getUser(){
        return(auth.currentUser)
    }

    getApiKey(){
        return(this.state.apikey)
    }

    getMovie(){
        return(this.state.movie)
    }

    getMoviesList(){
        return(this.state.movies)
    }

    getAlert(){
        return(this.state.alert)
    }

    addFavorite(id, user) {
        this.getMoviesList().forEach(element => {
            if(element.imdbID === id){
                element.user = user;
                console.log(element)
                axios.post('http://tech-challenge-backend.herokuapp.com/favorites', element, {crossdomain: true}).then((response) => {console.log(response);if(response.statusText==="OK"){alert("Movie Successfully added to Favorite List")}});
            }
        });
    };

    async componentDidMount() {
        const windowUrl = window.location.search;
        const params = new URLSearchParams(windowUrl);
        const movieName = params.get("movie");
        this.setState({movie:movieName});
        const response = await axios.get('https://tech-challenge-backend.herokuapp.com/results?movie='+movieName);
        
        //const response = await axios.get('http://www.omdbapi.com/?apikey=' + this.getApiKey() + '&s=' + movieName);
        console.log(response.data);
        this.setState({movies:response.data.Search});
        if (response.data.Response === "False") {
        this.setState({alert:response.data.Error});
        } /*else if (response.data.Response === "True") {
        history.push('/Search');
        }*/
    }

    render() {
        if(this.getUser()===null){
            this.props.history.push('/login')
          }

        const render = () => {
            let code = null;
            if(this.state.alert!==""){
                code = <p>{this.state.alert}</p>
            }else if(this.state.movies!==undefined){
                code = this.state.movies.map((movie)=>{return (
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
                            <p id={movie.imdbID} className="heart" onClick={(e) => this.addFavorite(e.target.id, this.getUser())}><span><i className="fas fa-thumbs-up"></i></span>  Add to Favorite List</p> 
                        </div>    
                    </div> 
                )})
            }
            return code;
        }
        return (
            <div>
            <div id="search-navbar">
                <div className="search-brand"><p onClick={()=>{this.props.history.push("/home")}}><i className="fas fa-video"></i> Fleye-Tech-Challenge</p></div>
            </div>
            
            <p className="result">Movies with keyword "batman"</p>
            <div className="search-container">
            {render()}
            </div>
        </div>
        )
    }
}

export default withRouter(Results);