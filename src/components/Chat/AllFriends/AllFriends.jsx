import React from "react";
import af from "./AllFriendsStyle.module.css";
import {Col} from "react-bootstrap";

const AllFriends = ()=>{
    return(
        <Col lg={2}>
            <div className={af.AllFriendsMain}>
                <h3>Friends</h3>
                <ul>
                    <li>Friend-1</li>
                    <li>Friend-2</li>
                    <li>Friend-3</li>
                    <li>Friend-4</li>
                    <li>Friend-5</li>
                </ul>
            </div>
        </Col>
    )
}


export default AllFriends