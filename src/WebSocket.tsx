import React, { useEffect } from "react";
import { withRouter } from "react-router";
/* Bootstrap */
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
const WebSocketTest = ( history :any):JSX.Element => {
  const ws = new WebSocket('ws://localhost:8080/websocketTest')
  let response:any =9


  let messages = {
    Email : "tete"
  }
  useEffect(() => {
    ws.onopen = () => {
      ws.send(JSON.stringify(messages));
    };
  });
  ws.onmessage = (event) => {
    response = JSON.parse(event.data);
    console.log(response)
    // setOrders(response.data);
  };
  ws.onclose = () => {
    console.log("close")
    ws.close();
  };
  const ckicktest = () => {
    ws.send(JSON.stringify({
      Email: "tete22"
    }))
  }
  return (
    <div>
      <button onClick={(e)=>ckicktest()}></button>
{response}
    </div>
   
  );
};

export default withRouter(WebSocketTest);