import React, { useContext } from "react";
import { withRouter } from "react-router";
import { AuthContext } from "./AuthProvider";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
/* Bootstrap */
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
const Login = (history :any) :JSX.Element=> {
  const { login,signout } = useContext(AuthContext);
  const handleSubmit = (event:any) => {
    event.preventDefault();
    console.log(event.target.email.value);
    const { email, password } = event.target.elements;
    login(email.value, password.value, history.history);
  };
  const clickSignout = () => {
    console.log("サインアウト")
    signout(history.history)
  }
  React.useEffect(() => {
    console.log("useEffect start")
    let UID: string | null = localStorage.getItem('uid');
    if (UID !== "") {
      history.history.push('/calender');
    }
    console.log("useEffect end")
  }, []);
  return (
    <div className="LoginContainer">
    <Container>
    <div>
      <h1>Log in</h1>
        <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
            Email
    </Form.Label>
          <Col sm={10}>
            <Form.Control name="email" type="email" placeholder="Email" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalPassword">
          <Form.Label column sm={2}>
            Password
    </Form.Label>
          <Col sm={10}>
              <Form.Control name="password" type="password" placeholder="Password" />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 2 }}>
                <Button type="submit">Login</Button>
                <Form.Text className="text-muted">登録は
                  <Link to="/signup">こちら</Link>から
                 
    </Form.Text>
              </Col>
              
        </Form.Group>
      </Form>
      </div>
      </Container>
      
    </div>
  );
};

export default withRouter(Login);