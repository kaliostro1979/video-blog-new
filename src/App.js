import React, {useContext, useState} from 'react'
import {auth} from './firebase'
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import UserPage from "./components/UserPage";
import {Provider} from "./components/context";
import Header from "./components/Header";
import ResetPassword from "./components/ResetPassword";
import ForgetPassword from "./components/ForgetPassword";



function App() {

    return (
       <Provider>
           <Router>
               <div className="App">
                   <Header/>
                   <Route exact path="/" component={Home}/>
                   <Route exact path="/login" component={Login}/>
                   <Route exact path="/sign-up" component={SignUp}/>
                   <Route exact path="/user-page" component={UserPage}/>
                   <Route exact path="/reset-password" component={ResetPassword}/>
                   <Route exact path="/forget-password" component={ForgetPassword}/>
               </div>
           </Router>
       </Provider>
    );
}

export default App;
