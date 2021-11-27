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
        console.log("Rendering")
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




/*

const Favorites = () => {
    const history = useHistory();
    let user = auth.currentUser
    if(user === null){
        history.push('/login')
        return(
            <div>
            <div id="search-navbar">
                <div className="search-brand"><p onClick={HomeButton}><i className="fas fa-video"></i> Fleye-Tech-Challenge</p></div>
            </div>
            
            <p className="result">Favorite Movies</p>
            <div className="search-container">


        </div>
        </div>
        )
    }
    user = user._delegate.uid;

    function HomeButton() {
        history.push('/')
    };


    return(axios.get('https://tech-challenge-backend.herokuapp.com/getfavorites?id='+user).then(function(response){
        console.log(response.data);
        return (
            <div>
                <div id="search-navbar">
                    <div className="search-brand"><p onClick={HomeButton}><i className="fas fa-video"></i> Fleye-Tech-Challenge</p></div>
                </div>
                
                <p className="result">Favorite Movies</p>
                <div className="search-container">
                
        
            </div>
            </div>
        )
    }))

    return(<div>
        <div id="search-navbar">
            <div className="search-brand"><p onClick={HomeButton}><i className="fas fa-video"></i> Fleye-Tech-Challenge</p></div>
        </div>
        
        <p className="result">Favorite Movies</p>
        <div className="search-container">
        

    </div>
    </div>)
}
export default Favorites

/*

{favoriteArray.map((favorite) => {
                    return (
                        <div className="card">
                            <div className="card-image-box">
                                <img className="card-image" src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQkmpiE3saxLv17jlQVpffuUAAtU95HJoaPRw&amp;usqp=CAU' onError={(e)=>{e.target.src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQkmpiE3saxLv17jlQVpffuUAAtU95HJoaPRw&amp;usqp=CAU'}}/>
                                <div className="black-filter">
                                    <p><a href='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQkmpiE3saxLv17jlQVpffuUAAtU95HJoaPRw&amp;usqp=CAU' target="_blank"><i className="fas fa-eye"></i></a></p>
                                </div>
                            </div>
                            <div className="card-description">
                                <a><p className="card-title">title</p></a>
                                <p className="card-rating"><span className="topic">IMDB ID:</span>  <i className="fas fa-star"></i> <span className="rating">rating</span></p>
                                <p><span className="topic">Type: </span> &nbsp;movie </p> 
                                <p><span className="year">Year: </span> Year </p> 
                            </div>    
                        </div> 
                    )
                })}

                */





/*constructor(props) {
        super(props);

        this.state = {
            users: [],
            group: '',
            password: '',
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            listOfUserGroups: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:3001/users')
          .then(res => {
            const users = res.data;
            this.setState({ users });
            console.log(this.state.users);
          })
    }

    handleGroupChange = e => {
        this.setState({ group: e.target.value });
    }

    handlePasswordChange = e => {
        this.setState({ password: e.target.value });
    }

    handleFirstNameChange = e => {
        this.setState({ firstName: e.target.value });
    }

    handleLastNameChange = e => {
        this.setState({ lastName: e.target.value });
    }

    handleDateOfBirthChange = e => {
        this.setState({ dateOfBirth: e.target.value });
    }

    handleListOfUserGroupsChange = e => {
        this.setState({ listOfUserGroups: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();

        const newUser = {
            group: this.state.group,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            dateOfBirth: this.state.dateOfBirth,
            listOfUserGroups: this.state.listOfUserGroups
        };

        axios.post('http://localhost:3001/users', newUser)
            .then(response => {
                console.log('Saved');
                console.log(response.data);
                console.log(this.state.firstName);
            });
    }*/