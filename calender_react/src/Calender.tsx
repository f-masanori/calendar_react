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

export const GetEventsviaAPI = (): IEventContext[] => {
  console.log("GetEventsviaAPI")
  let newEvents: IEventContext[] = []
  app.auth().currentUser?.getIdToken(true).then(async (idToken: any) => {
    const res = await axios({
      method: 'get',
      url: APIURL + '/getEventsByUID',
      headers: {
        'Content-Type': "application/json",
        'Authorization': idToken
      },
    });
    console.log("await axios")

    for (let i = 0; i < res.data.length; i++) {
      let temp: IEventContext = {
        title: res.data[i].Event,
        date: res.data[i].Date
      }
      newEvents.push(temp)

    }
    console.log(newEvents)

  }).catch((error: any) => {
    alert(error)
  });
  return (newEvents)
}

const Calender = (history: any): JSX.Element => {
  // let plugins: any = [dayGridPlugin]
  const [calendarPlugins, setCalendarPlugins] = React.useState([dayGridPlugin, interactionPlugin])
  const { eventsContext, changeEvents } = useContext(EventContext);
  let calendarRef: any = React.createRef()

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
      // if
      for (let i = 0; i < res.data.length; i++) {
        let temp: IEventContext= {
         title: res.data[i].Event,
         date: res.data[i].Date
        }
        newEvents.push(temp)
      }
      changeEvents(newEvents)
      setCalendarPlugins([dayGridPlugin, interactionPlugin])
    }).catch((error: any) => {
      alert(error)
    });
  }

  useEffect(() => {
    console.log("useEffect start")
    var user = app.auth().currentUser;

    if (user) {
      console.log("uid=" + user?.uid)
         console.log("ログインしてます")
         GetEventByAPI();
    } else {
      console.log("ログインしてません")
      // No user is signed in.
    }
      // app.auth().onAuthStateChanged(user => {
      //  if (user) {
      //    console.log("uid="+user?.uid)
      //    console.log("ログインしてます")
      //    GetEventByAPI();
      //  } else {
      //    console.log("ログインしてません")
      //  }
      // });
    // app.auth().currentUser?.getIdToken(true).then(async (idToken: any) => {
    //   const res = await axios({
    //     method: 'get',
    //     url: APIURL + '/getEventsByUID',
    //     headers: {
    //       'Content-Type': "application/json",
    //       'Authorization': idToken
    //     },
    //   });
    //   let newEvents: IEventContext[] = []
    //   for (let i = 0; i < res.data.length; i++) {
    //     let temp: IEventContext = {
    //       title: res.data[i].Event,
    //       date: res.data[i].Date
    //     }
    //     newEvents.push(temp)
    //   }
    //   changeEvents(newEvents)
    //   setCalendarPlugins([dayGridPlugin, interactionPlugin])
    // }).catch((error: any) => {
    //   alert(error)
    // });
    console.log("useEffect end")

    // window.setTimeout(GetEventByAPI, 10)
    // GetEventByAPI();
  }, []);

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
            Date: date,
            InputEvent: input
          }
        });
        calendarApi.addEvent(
          { 
            title: input,
            date: date
          }
        )
      }).catch((error: any) => {
        alert(error)
      });
    }
  }
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
      // {function (info) {
      //   alert('Clicked on: ' + info.dateStr);
      //   alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
      //   alert('Current view: ' + info.view.type);
      //   // change the day's background color just for fun
      //   info.dayEl.style.backgroundColor = 'red';
      // }} 
      />
      </div>
    </Container>
  );
};

export default withRouter(Calender);