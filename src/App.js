import './App.css';
import { Helmet } from "react-helmet";
import api from './services/api';

function App() {
  return (
    <div className="App">
      <Helmet>
          <title>MovieWiki</title>
          <meta charset="UTF-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;500;700&display=swap" rel="stylesheet"/>  
          <link href="https://fonts.googleapis.com/css2?family=MuseoModerno:wght@400;500;600&display=swap" rel="stylesheet"/>
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.11.2/css/all.css"/>
          <link rel="stylesheet" href="/stylesheets/homePage.css"/>
      </Helmet>
      <div className="back"></div>
      <div className="filter"></div>
      <div className="brand"> 
        <a href="#"><i className="fas fa-video"></i> MovieWiki</a>
      </div>
      <div className="container">
        <p className="search">Search Movie </p>
        <div className="form">
            <input type="text" placeholder="Enter Movie name or keyword" name="movie" required=""/>
            <input type="Submit" value="Find"/>
        </div>
      </div>
    </div>
  );
}

console.log("oi")

export default App;
