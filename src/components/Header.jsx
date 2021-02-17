import React, {useContext} from 'react'
import {auth} from "../firebase";
import {Context} from "./context";
import {withRouter, Link} from "react-router-dom";


const Header = ({history}) => {
    const {currentUser, avatarURL} = useContext(Context)

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
                <div className="container control-block">
                    <div className="row">
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li className="header-avatar">
                                <img src={avatarURL} alt="avatar"/>
                            </li>
                            <li>
                                <div className="name"><span>{currentUser.email}</span></div>
                            </li>
                            <li>
                                <Link to="/user-page">User Page</Link>
                            </li>
                            <li>
                                <button className="header-btn" onClick={handleLogOut}>
                                    Sign Out
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
        )

    } else {
        return (
            <header>
                <div className="container control-block">
                    <div className="row">
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                            <li>
                                <Link to="/sign-up">Sign Up</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
        )
    }
}

export default Header