import React from "react";
import au from "./AllUsersStyle.module.css";
import {Col} from "react-bootstrap";

const AllUsers = ()=>{
    return (
        <Col lg={2}>
            <div className={au.AllUsersMain}>
                <h3>All Users</h3>
                <ul>
                    <li>User-1</li>
                    <li>User-2</li>
                    <li>User-3</li>
                    <li>User-4</li>
                    <li>User-5</li>
                </ul>
            </div>
        </Col>
    )
}

export default AllUsers