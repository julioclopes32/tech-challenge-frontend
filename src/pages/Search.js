import React from 'react'
import { movieData } from './Home';
import './Search.css'
import axios from 'axios';
import { auth } from '../firebase';
import {useHistory} from 'react-router-dom';

const Search = () => {
    const history = useHistory();
    const user = auth.currentUser._delegate.uid;
    if(user === null){
        history.push('/login')
    }
    const movies = movieData.Search
    console.log(user)
    console.log(movies)

    function HomeButton() {
        history.push('/')
    };

    function addFavorite(id, user) {
        console.log(id)
        movies.forEach(element => {
            if(element.imdbID === id){
                element.user = user;
                console.log(element)
                axios.post('https://tech-challenge-backend.herokuapp.com/favorites', element).then(response => console.log(response));
            }
        });
    };

    return (
        
    <div>
        <div id="search-navbar">
            <div className="search-brand"><p onClick={HomeButton}><i className="fas fa-video"></i> Fleye-Tech-Challenge</p></div>
        </div>
        
        <p className="result">Movies with keyword "batman"</p>
        <div className="search-container">

        {movies.map((movie) => {
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
                        <p id={movie.imdbID} className="heart" onClick={(e) => addFavorite(e.target.id, user)}><span><i className="fas fa-thumbs-up"></i></span>  Add to Favorite List</p> 
                    </div>    
                </div> 
            )
        })}
    </div>
    </div>
    )
}

export default Search