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

const AllInOne = (history: any): JSX.Element => { 
    const [inputTodo, setInputTodo] = useState("")
    const [newScriptId, setNewScriptId] = useState("")

    const [scripts, setScripts] = useState([
        { id: 2, script: "dcasdciadunisafufu@afuo", update: 20200422, readTimes: 2 },
        { id: 4, script: "dfsafsao", update: 20200422, readTimes: 2 },
        { id: 5, script: "dofasf", update: 20200422, readTimes: 2 },
    ])

    const today_Date: Date = new Date();
    const today: number = today_Date.getDate();
    const thisMonth: number = today_Date.getMonth()+1; 
    const handleChangeNewScript = (event: any) => {
        setInputTodo(event.target.value);
    }
    const handleChangeNewScriptId = (event: any) => {
        setNewScriptId(event.target.value);
    }
    const handleSubmitNewScript = (event: any) => {
        /* バリデーションを作成するTSの調査 */
        let temptscripts = [...scripts];
        if ((Number.isInteger(Number(newScriptId))) && (newScriptId !== "") && (inputTodo !== "")) {
            let idDuplicationFlag:boolean = true
            for (let script of temptscripts) {
                if (script.id === Number(newScriptId)) {
                    alert("Idが重複してます")
                    idDuplicationFlag=false
                    break
                }
            }
            if (idDuplicationFlag) {
                temptscripts.push({ id: Number(newScriptId), script: inputTodo, update: 20200422, readTimes: 2 })
                temptscripts.sort(function (a, b) {
                    if (a.id > b.id) {
                        return 1;
                    } else {
                        return -1;
                    }
                })
                setScripts(temptscripts)
                setInputTodo("");
                setNewScriptId("")
            }
            
        } else if (inputTodo==="") {
            alert("例文が入力されていません")
        }else {
            alert("IDが正しくありません")
        }
       
        event.preventDefault();
    }
    const addReadTimes = (event: any) => {
        const clickedId = Number(event.currentTarget.getAttribute('value'))
        console.log(event.currentTarget.getAttribute('value'))
        let temptscripts = [...scripts];
        for (let script of temptscripts) {
            if (script.id === clickedId) {
                script.readTimes++
                break
            }
        }
        setScripts(temptscripts)
    }
    const todoTableJSX = (): JSX.Element => { 
        
        return (<Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>#</th>
                    <th>例文</th>
                    <th>更新日</th>
                    <th>音読回数</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>

                {scripts.map((script) => {
                    return <tr>
                        <td>{script.id}</td>
                        <td>{script.script}</td>
                        <td>2020/4/2</td>
                        <td>{script.readTimes}</td>
                        <td><Button variant="info" value={script.id} onClick={(e: any) => addReadTimes(e)}>＋</Button></td>
                    </tr>
                    })}
            </tbody>
        </Table>)
    }
  

    return (
        <Container>
            <Form.Group onSubmit={handleSubmitNewScript}>
                <br />
                <Form.Row>
                    <Form.Label column lg={2}>
                        ID :
                    </Form.Label>
                    <Col>
                        <Form.Control type="text" value={newScriptId} onChange={handleChangeNewScriptId} />
                    </Col>
                    <Form.Label column lg={2}>
                        例文追加 :
                    </Form.Label>
                    <Col>
                        <Form.Control type="text" value={inputTodo} onChange={handleChangeNewScript} />
                    </Col>
                </Form.Row>
                <Button variant="primary" onClick={handleSubmitNewScript}>
                    保存
            </Button>
            </Form.Group>
            {todoTableJSX()}
        </Container>
       )
}
export default withRouter(AllInOne);
