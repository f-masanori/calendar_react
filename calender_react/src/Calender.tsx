import React, { useEffect,useContext } from "react";
import { withRouter } from "react-router";
import { AuthContext } from "./auth/AuthProvider";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import interactionPlugin from '@fullcalendar/interaction';
import { app } from './base';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import APIURL from 'Config.ts'
interface Event {
  title: string;
  date: string;
}
const FullCalendarComp: React.FC<any> = props => {
  // app.auth().currentUser?.getIdToken(true).then(async (idToken: any) => {
  //   console.log("useEffecr1")
  //   console.log(calendarEvents)

  //   const res = await axios({
  //     method: 'get',
  //     url: 'http://localhost:8080/getEventsByUID',
  //     headers: {
  //       'Content-Type': "application/json",
  //       'Authorization': idToken
  //     },
  //   });
  //   console.log(res);
  //   let newEvents = [...calendarEvents]
  //   // let temp
  //   for (let i = 0; i < res.data.length; i++) {
  //     console.log(res.data[i])
  //     let temp: Event = {
  //       title: res.data[i].Event,
  //       date: res.data[i].Date
  //     }
  //     newEvents.push(temp)
  //   }
  //   setCalendarEvents(newEvents)
  // }).catch((error: any) => {
  //   alert(error)
  // }); 
  const difs = (props: any) => {
    console.log(props)
    let date = props.dateStr
    let input = window.prompt(date + "の予定を入力してください", "");
    if (input == "") {
      alert("kara")
    } else {
      app.auth().currentUser?.getIdToken(true).then(async (idToken: any) => {
        // console.log(idToken)
        const res = await axios({
          method: 'post',
          url: 'http://localhost:8080/addEvent',
          headers: {
            'Content-Type': "application/json",
            'Authorization': idToken
          },
          data: {
            Date: date,
            InputEvent: input
          }
        });
        // console.log(res);
      }).catch((error: any) => {
        alert(error)
      });
    }
  }
  return (<FullCalendar defaultView="dayGridMonth" plugins={[dayGridPlugin, interactionPlugin]} events={props}
    selectable={true}
    selectMirror={true}
    dateClick={(info) => difs(info)}
  // {function (info) {
  //   alert('Clicked on: ' + info.dateStr);
  //   alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
  //   alert('Current view: ' + info.view.type);
  //   // change the day's background color just for fun
  //   info.dayEl.style.backgroundColor = 'red';
  // }} 
  />
  )
}
// const defaultevent: Event = { title: 'event 1', date: '2020-03-01' }
const Calender = (history: any): JSX.Element => {
  const [calendarEvents, setCalendarEvents,] = React.useState([
    { title: 'event 1', date: '2020-03-01' },
    { title: 'event 2', date: '2019-04-02' }
  ]);

  const { signout, uid } = useContext(AuthContext);
  const clickSignout = () => {
    console.log("サインアウト")
    
   
      // signout(history.history)
  }
  const GetEventByAPI = () => {
    console.log("GetEventByAPI")

    app.auth().currentUser?.getIdToken(true).then(async (idToken: any) => {
      console.log("useEffecr1")
      console.log(calendarEvents)

      const res = await axios({
        method: 'get',
        url: 'http://localhost:8080/getEventsByUID',
        headers: {
          'Content-Type': "application/json",
          'Authorization': idToken
        },
      });
      console.log(res);
      let newEvents = [...calendarEvents]
      // let temp
      for (let i = 0; i < res.data.length; i++) {
        console.log(res.data[i])
        let temp :Event= {
         title: res.data[i].Event,
         date: res.data[i].Date
        }
        newEvents.push(temp)
      }
      setCalendarEvents(newEvents)
    }).catch((error: any) => {
      alert(error)
    });
    
  }
  useEffect(() => {
    console.log("useEffecr")
    GetEventByAPI();
    console.log("useEffecr2")

  //  clickSignout()
      // (async () => {
      //   let x = await GetEventByAPI();
      //   console.log(x);
      // })();
    // let annn=GetEventByAPI()
    //  console.log(annn)
      
  }, []);
  
  return (
    <div>
      <h1>カレンダー</h1>{uid}
     
      <FullCalendarComp events={calendarEvents}/>
      <div>
        <button onClick={() => GetEventByAPI()}>sign out</button>
      </div>
 
    </div>
  );
};

export default withRouter(Calender);