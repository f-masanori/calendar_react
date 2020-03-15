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
/* Bootstrap */
import Container from 'react-bootstrap/Container'


const Calender = (history: any): JSX.Element => {
  const [calendarPlugins, setCalendarPlugins] = React.useState([dayGridPlugin, interactionPlugin])
  const { eventsContext, changeEvents } = useContext(EventContext);
  const [nextEventID,setNextEventID]=React.useState(0)
  let calendarRef: any = React.createRef()

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
      setNextEventID(res.data.NextEventID)
      changeEvents(newEvents)
      setCalendarPlugins([dayGridPlugin, interactionPlugin])
    }).catch((error: any) => {
      alert(error)
    });
  }


  const addEvent = (props: any) => {
    console.log(props)
    console.log("addEvendも")
    let date = props.dateStr
    let input = window.prompt(date + "の予定を入力してください", "");
    let calendarApi = calendarRef.current.getApi()
    
    if (input == "" || input == null) {
      alert("入力がありません。")
    } else {
      app.auth().currentUser?.getIdToken(true).then(async (idToken: any) => {
        const res = await axios({
          method: 'post',
          url: APIURL + '/addEvent',
          headers: {
            'Content-Type': "application/json",
            'Authorization': idToken
          },
          data: {
            EventID: nextEventID,
            Date: date,
            InputEvent: input
          }
        });
        calendarApi.addEvent(
          { 
            id: nextEventID,
            title: input,
            date: date
          }
        )
      }).catch((error: any) => {
        alert(error)
      });
    }
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
          dateClick={(info) => addEvent(info)}
          eventClick={(info) => alert(info.event.id)}
      />
      </div>
    </Container>
  );
};

export default withRouter(Calender);