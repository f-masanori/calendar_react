import React, { useContext } from "react"
import { withRouter } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { AuthContext } from "./auth/AuthProvider";
import { EventContext, IEventContext } from "./auth/EventProvider";

const Header = (history: any) => {
    const { signout } = useContext(AuthContext);
    const { eventsContext, changeEvents } = useContext(EventContext);
    const clickSignOut = () => {
        changeEvents([])
        signout(history.history)
    }

    let UID: string | null = localStorage.getItem('uid');
    let email: string | null = localStorage.getItem('email');
    
    let NavAuthentication: JSX.Element;
    if (UID === "") {
        NavAuthentication = (<Nav><Nav><Link to="/login">login</Link></Nav>
            <Nav><p style={{ fontSize: `50%` }}>&nbsp;&nbsp;</p></Nav>
            <Nav><Link to="/signup">signup</Link></Nav></Nav>)
    } else {
        NavAuthentication = (<Nav className="justify-content-end" activeKey="/home">
            <Nav.Item>
                <Nav.Link onClick={clickSignOut}>SignOut</Nav.Link>
                <Nav><Link to="/user">{email}</Link></Nav>
            </Nav.Item>          
        </Nav>)
    }
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top" >
            <Navbar.Brand><Nav>Calendar</Nav></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    {/* <Nav.Link> <Link to="./sharecalendar">共有カレンダー</Link></Nav.Link> */}
                    {/* <Nav><Link to="/calender">calender&nbsp;&nbsp;</Link></Nav> */}
                    {/* <Nav><Link to="/">Home</Link></Nav> */}
                </Nav>
                {NavAuthentication}
            </Navbar.Collapse>
         
        </Navbar>)
}
export default withRouter(Header)