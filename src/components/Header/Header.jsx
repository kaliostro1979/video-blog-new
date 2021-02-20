import React, {useContext} from 'react'
import {auth} from "../../firebase";
import {Context} from "../context/context";
import {Link} from "react-router-dom";
import {Container, Row, Col, Button} from "react-bootstrap";
import hs from './Header.module.css'


const Header = () => {
    const {currentUser, avatarURL, currentUserName} = useContext(Context)

    function handleLogOut() {
        if (currentUser){
            auth.signOut()
                .then(() => {

                })
                .catch(function(error) {

                });
        }
    }

    if (currentUser) {
        return (
            <header>
                <Container fluid={true}>
                    <Row>
                        <Col lg={12}>
                            <div className={hs.HeaderMain}>
                                <div className={hs.Navigation}>
                                    <ul>
                                        <li>
                                            <Link to="/">Home</Link>
                                        </li>
                                        <li>
                                            <Link to="/chat">Chat</Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className={hs.UserInfoBlock}>
                                    <ul>
                                        <li className={hs.HeaderAvatar}>
                                            <Link to="/user-page"><img src={avatarURL} alt="avatar"/></Link>
                                        </li>
                                        <li>
                                            <div className={hs.Name}><Link to="/user-page"><strong>Welcome </strong> <span>{currentUserName}</span></Link></div>
                                        </li>
                                        <li>
                                            <Button className={hs.HeaderBtn} onClick={handleLogOut}>
                                                Sign Out
                                            </Button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </header>
        )

    } else {
        return (
            <header>
                <Container fluid={true}>
                    <Row>
                        <Col lg={12}>
                            <div className={hs.HeaderMain}>
                                <div className={hs.Navigation}>
                                    <ul>
                                        <li>
                                            <Link to="/">Home</Link>
                                        </li>
                                        <li>
                                            <Link to="/chat">Chat</Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className={hs.UserInfoBlock}>
                                    <ul>
                                        <li>
                                            <Link to="/login">Login</Link>
                                        </li>
                                        <li>
                                            <Link to="/sign-up">Sign Up</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </header>
        )
    }
}

export default Header