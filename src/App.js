import React from 'react';
//Routing
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
//Components
import Header from './components/Header/Header'
//Styles
import {GlobalStyle} from "./GloblaStyle";
import Home from "./components/Home";
import Button from "./components/Button/Button";
import Movie from "./components/Movie";
import NotFound from "./components/NotFound";

const App = () => (
    <Router>
        <Header/>
        <Switch>
            <Route exact path={'/'}>
                <Home/>
            </Route>
            <Route exact path={'/:movieId'}>
                <Movie/>
            </Route>
            <Route path={'/*'}>
                <NotFound/>
            </Route>
        </Switch>
        <GlobalStyle/>
    </Router>)

export default App;
