import React, { useContext } from "react";
import { withRouter } from "react-router";
import { AuthContext } from "./AuthProvider";
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
const SignUp = ( history :any):JSX.Element => {
  const { signup } = useContext(AuthContext);
  const handleSubmit=(event:any) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    signup(email.value, password.value, history.history);
  };

  return (
    <Container>
      <div>
        <h1>Sign Up</h1>
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
              <Button type="submit">Sign Up</Button>
            </Col>
          </Form.Group>
        </Form>
      </div>
    </Container>
  );
};

export default withRouter(SignUp);
