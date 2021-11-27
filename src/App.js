import './App.css';
import 'firebase/auth'
import Header from './components/Header';
import Signin from './pages/Signin';
import Home from './pages/Home';
import Login from './pages/Login';
import Results from './pages/Results';
import Favorites from './pages/Favorites';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Background from './components/background';
import { useEffect, useState } from 'react';
import { auth } from './firebase';


function App() {
  const [user, setUser] = useState(null)
  useEffect(() => {
    console.log("useEffect")
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      const user = {
        uid: userAuth?.uid,
        email: userAuth?.email
      }
      if(userAuth){
        console.log(userAuth)
        setUser(user)
      }else{
        setUser(null)
      }
    })
    return unsubscribe
    }, [])

  return (
    <Router>
      <div className="app-container">
        {user ? <Home /> : <Login />}
        <Header/>
        <Background/>
        <Switch>
          <Route path="/" exact>
            <Home/>
          </Route>
          <Route path="/home" exact>
            <Home/>
          </Route>
          <Route path="/login" exact>
            <Login/>
          </Route>
          <Route path="/signin" exact>
            <Signin/>
          </Route>
          <Route path="/results" exact>
            <Results/>
          </Route>
          <Route path="/favorites" exact>
            <Favorites/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;