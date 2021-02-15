import React, {useContext} from 'react'
import {auth} from "../firebase";
import {Context} from "./context";
import {withRouter, Link} from "react-router-dom";


const Header = () => {
    const {currentUser} = useContext(Context)

    function handleLogOut() {
        auth.signOut()
            .then(() => {
                // history.push=('/')
            })
            .catch(function(error) {
                alert(error.message);
            });
    }

    if (currentUser) {
        return (
            <header>
                <div className="header-user-info">
                    <Link to="/">Home</Link>
                    <div className="name"><span>{currentUser.email}</span></div>
                    <ul>
                        <li><Link to="/user-page">User Page</Link></li>
                    </ul>
                    <button className="header-btn" onClick={handleLogOut}>
                        Sign Out
                    </button>
                </div>
            </header>
        )

    } else {
        return (
            <>
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
            </>
        )
    }
}

export default Header