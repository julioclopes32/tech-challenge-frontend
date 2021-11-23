import React from 'react'
import { movieData } from './Home';
import './Search.css'


const Search = () => {
    if(movieData.Search == null){
        console.log("is null")
    }
    const movies = movieData.Search
    console.log(movies)

    if(movieData == null){
        console.log("equals null")
    }
    return (
        
    <div>
        <div id="search-navbar">
            <div className="search-brand"><a href="/"><i className="fas fa-video"></i> MovieWiki</a></div>
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
                        <p id={movie.imdbID} className="heart"><span><i className="fas fa-thumbs-up"></i></span>  Add to Favorite List</p> 
                    </div>    
                </div> 
            )
        })}
        
    </div>
    </div>
    )
}

export default Search