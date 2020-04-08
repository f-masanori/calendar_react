import React, { useEffect, useContext, useState } from "react";
import { withRouter } from "react-router";
import axios from 'axios';

/* コンテキスト */
import { EventContext, IEventContext } from "./auth/EventProvider";
/* FullCalender */
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import interactionPlugin from '@fullcalendar/interaction';
/* firebase認証 */
import { app } from './base';
/* 設定ファイル */
import APIURL from './Config'
/* API */
import * as API from './API'
/* Datapicker */
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import ja from 'date-fns/locale/ja'
// registerLocale('ja', ja)
/* Bootstrap */
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Table from 'react-bootstrap/Table'

import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Spinner from 'react-bootstrap/Spinner'

const Todo = (history: any): JSX.Element => { 
    const [inputTodo, setInputTodo] = useState("")
    const [todos, setTodos] = useState([
        { name: "do" },
        { name: "do" }
    ])
    const [deadLineTodo, setDeadLineTodo] = useState([
        { name: "DNA", deadlineYeay: 2020, deadlineMonth: 4, deadlineDay: 20},
        { name: "ネット", deadlineYeay: 2020, deadlineMonth: 4, deadlineDay: 20 }
    ])
    const today_Date: Date = new Date();
    const today: number = today_Date.getDate();
    const thisMonth: number = today_Date.getMonth()+1; 
    const handleChangeInputTodo = (event: any) => {
        setInputTodo(event.target.value);
    }
    const handleSubmitInputTodo = (event: any) => {
        let temptodos = [...todos];
        temptodos.push({ name: inputTodo })
        setTodos(temptodos)
        setInputTodo("");
        event.preventDefault();
    }
    const todoTableJSX = (): JSX.Element => { 
        
        return (<Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>#</th>
                    <th>todo</th>
                    <th>date</th>
                    <th>Username</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
                {todos.map((todo) => {
                    return <tr><td>{todo.name}</td></tr>;
                    })}
            </tbody>
        </Table>)
    }
    const deadlineJSX = (): JSX.Element => {
        
        let dayArray:any = [];
        const endDate_Date: Date = new Date(today_Date.getFullYear(), today_Date.getMonth() + 1, 0);
        const endDay: number = Number(endDate_Date.toLocaleDateString().slice(-2))
        for (let i = 1; dayArray.push(i++) < endDay;);
        // const dayJSX:JSX.Element=<>
        const deadlineTbodyJSX = (): JSX.Element => {
            const trJSX: JSX.Element[] = []
            for (let todo of deadLineTodo) {
                trJSX.push(<tr><td>{todo.name}</td>{dayArray.map((day: any) => {
                    if (day === today) {
                        return (<td className="th-today">{day}</td>)
                    }
                    return (<td ></td>);
                })}</tr>)
            }
            return (<tbody>
                {trJSX}
            </tbody>)
        }
        return (

            <Table striped bordered responsive hover >
                <thead>
                    <tr>
                        <th style={{ width: "1000%" }}>締め切りtodo</th>
                        {/* {deadLineTodo.map((todo) => {
                            return(<div>2</div>)
                        })} */}
                        
                        {dayArray.map((day:any) => {
                            if (day === today) {
                                return (<th className="th-today">{day}</th>)
                            }
                            return (<th>{day}</th>);
                        })}
                    </tr>
                </thead>
                {deadlineTbodyJSX()}
            </Table>

            
        )
    }
    const SimpleDatePicker = () => {
        const initialDate = new Date()
        const [startDate, setStartDate] = useState(initialDate)
        const handleChange = (date:any) => {
            setStartDate(date)
        }
        return (
            <DatePicker
                selected={startDate}
                onChange={handleChange}
                locale="ja"
            />
        )
    }
    return (
        <Container>
            <Form.Group onSubmit={handleSubmitInputTodo}>
                <br />
                <Form.Row>
                    <Form.Label column lg={2}>
                        Todo :
            </Form.Label>
                    <Col>
                        <Form.Control type="text" value={inputTodo} onChange={handleChangeInputTodo} />
                    </Col>
                </Form.Row>
                <Button variant="primary" onClick={handleSubmitInputTodo}>
                    保存
            </Button>
            </Form.Group>
           
            {todoTableJSX()}
            {SimpleDatePicker()}
            <div className="deadline-div">{thisMonth}月
            {deadlineJSX()}</div>
            
               </Container>
       )
}
export default withRouter(Todo);
