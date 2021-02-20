import React from 'react'
import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import UserPage from "./components/UserPage/UserPage";
import {Provider} from "./components/context/context";
import Header from "./components/Header/Header";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import Chat from "./components/Chat/Chat";
import SideBar from "./components/SideBar/SideBar";
import {Container, Row, Col} from "react-bootstrap";


function App() {

    return (
       <Provider>
           <Router>
               <div className="App">
                   <Header/>
                   <Container fluid={true}>
                       <Row>
                           <Col lg={2}>
                               <SideBar/>
                           </Col>
                           <Col lg={10}>
                               <Route exact path="/" component={Home}/>
                               <Route exact path="/login" component={Login}/>
                               <Route exact path="/sign-up" component={SignUp}/>
                               <Route exact path="/user-page" component={UserPage}/>
                               <Route exact path="/reset-password" component={ResetPassword}/>
                               <Route exact path="/forget-password" component={ForgetPassword}/>
                               <Route exact path="/chat" component={Chat}/>
                           </Col>
                       </Row>
                   </Container>
               </div>
           </Router>
       </Provider>
    );
}

export default App;
