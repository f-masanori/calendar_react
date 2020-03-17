import React, { useEffect,useContext, useState } from "react";
import { withRouter } from "react-router";
import axios from 'axios';

/* コンテキスト */
import { AuthContext } from "./auth/AuthProvider";
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

/* Bootstrap */
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const Calender = (history: any): JSX.Element => {
  /* [dayGridPlugin, interactionPlugin]この制御するとエラーになる */
  const [calendarPlugins, setCalendarPlugins] = React.useState([dayGridPlugin, interactionPlugin])
  const { eventsContext, changeEvents } = useContext(EventContext);
  const [nextEventID,setNextEventID]=React.useState(0)
  let calendarRef: any = React.createRef()
  let altnextEventID: number
  altnextEventID = nextEventID
  const [selectedEventID, setSelectedEventID] = useState(0);
  const [selectedEventTitle, setSelectedEventTitle] = useState("0");

  /* /getEventsByUID からのGETで
  ログインユーザーのEventとnexteventidを取得 */
  const GetEventByAPI = () => {
    console.log("GetEventByAP!!")
    app.auth().currentUser?.getIdToken(true).then(async (idToken: any) => {
      const res = await axios({
        method: 'get',
        url: APIURL+'/getEventsByUID',
        headers: {
          'Content-Type': "application/json",
          'Authorization': idToken
        },
      });
      let newEvents: IEventContext[] = []
      console.log(res.data)
      if (res.data.Events) {
        for (let i = 0; i < res.data.Events.length; i++) {
          let temp: IEventContext = {
            id: res.data.Events[i].EventID,
            title: res.data.Events[i].Event,
            date: res.data.Events[i].Date
          }
          newEvents.push(temp)
        }
      }

      altnextEventID = res.data.NextEventID
      console.log(altnextEventID)

      setNextEventID(res.data.NextEventID)
      changeEvents(newEvents)
      // setCalendarPlugins([dayGridPlugin, interactionPlugin])
    }).catch((error: any) => {
      alert(error)
    });
  }

  const addEvent = (props: any) => {
    console.log(props)
    console.log("addEvend")
    app.auth().currentUser?.getIdToken(true).then((idToken: any) => {
      axios({
        method: 'get',
        url: APIURL + '/getNextEventID',
        headers: {
          'Content-Type': "application/json",
          'Authorization': idToken
        }
      }).then(res => {
        /* EventIDをGETで持ってくる */
        console.log(res.data.NextEventID)
        let NewEventID:number = res.data.NextEventID
        let date = props.dateStr
        let input = window.prompt(date + "の予定を入力してください", "");
        let calendarApi = calendarRef.current.getApi()
        if (input == "" || input == null) {
          alert("入力がありません。")
        } else {
          /* DB変更処理API */
          API.AddEvent(NewEventID, date, input)
          /* FullCalendarAPI */
          calendarApi.addEvent(
            {
              id: NewEventID,
              title: input,
              date: date
            }
          )
          altnextEventID++
        }
      }).catch(error => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
      });
    }).catch((error: any) => {
      alert(error)
    });
  }

  const editEvent = (info: any) => {

    console.log("ID : "+info.event.id)
    console.log("Title : " +info.event.title)

    let calendarApi = calendarRef.current.getApi()
    let eee = calendarApi.getEventById(info.event.id);
    console.log(eee)
    let allevents = calendarApi.getEvents()
    console.log(allevents[2])

    calendarApi.refetchEvents()
    // changeEvents()
    setSelectedEventID(info.event.id)
    setSelectedEventTitle(info.event.title)
    handleShow()
  }
  const deleteEvent = () => {
    console.log("deleteEvent")
    let calendarApi = calendarRef.current.getApi()
    let _selectedEventID = calendarApi.getEventById(selectedEventID);
    _selectedEventID.remove()
    API.DeleteEvent(selectedEventID)
  }
  /* modal */
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  
  const handleSubmit = (event: any) => {
    let calendarApi = calendarRef.current.getApi()
    console.log(eventsContext)
    console.log(selectedEventTitle)
    console.log(selectedEventID)

    let newEvents = eventsContext
    for (let i = 0; i < eventsContext.length; i++) {
      console.log(i)
      console.log(eventsContext[i].id)
      if (eventsContext[i].id === selectedEventID) {
        console.log(eventsContext[i].id)
        newEvents[i].title = selectedEventTitle
        // break
      }
    }
    changeEvents(newEvents)
    event.preventDefault();
  }
  const handleChange = (event:any) =>{
    setSelectedEventTitle(event.target.value );
  }

  useEffect(() => {
    console.log("useEffect start")
    app.auth().onAuthStateChanged(user => {
      if (user) {
        const user = app.auth().currentUser;
        console.log("uid=" + user?.uid)
        GetEventByAPI()
        console.log("ログインしてます")
      } else {
        console.log("ログインしてません")
      }
    });
    console.log("useEffect end")
  }, []);

  return (
    <Container>
    <div>
      <h1>カレンダー</h1>
      <FullCalendar
          ref={calendarRef}
          defaultView="dayGridMonth"
          plugins={calendarPlugins}
          events={eventsContext}
          selectable={true}
          selectMirror={true}
          dateClick={(info) => { addEvent(info) }}
          eventClick={(info) => { editEvent(info)}}
      />
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEventID}
          {selectedEventTitle}
          <form onSubmit={handleSubmit}>
            <label>
              Title:
          <input type="text" defaultValue={selectedEventTitle} onChange={handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
          <Button variant="primary" onClick={deleteEvent}>
            Eventd削除
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default withRouter(Calender);