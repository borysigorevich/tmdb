import React from 'react';
//Routing
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
//Components
import Header from './components/Header/Header'
//Styles
import {GlobalStyle} from "./GloblaStyle";
import Home from "./components/Home";
import Movie from "./components/Movie";
import NotFound from "./components/NotFound";
import UserProvider from "./context";
import Login from "./components/Login";

const App = () => (
    <Router>
        <UserProvider>
            <Header/>
            <Switch>
                <Route exact path={'/'}>
                    <Home/>
                </Route>
                <Route path={'/login'}>
                    <Login/>
                </Route>
                <Route exact path={'/:movieId'}>
                    <Movie/>
                </Route>
                <Route path={'/*'}>
                    <NotFound/>
                </Route>
            </Switch>
            <GlobalStyle/>
        </UserProvider>
    </Router>)

export default App;
