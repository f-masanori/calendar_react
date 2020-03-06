import React, { useEffect,useContext } from "react";
import { withRouter } from "react-router";
import { AuthContext } from "./auth/AuthProvider";
import { EventContext } from "./auth/EventProvider";

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import interactionPlugin from '@fullcalendar/interaction';
import { app } from './base';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import APIURL from './Config'
interface Event {
  title: string|null;
  date: string;
}
// const FullCalendarComp: React.FC<any> = props => {
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
//   const difs = (props: any) => {
//     console.log(props)
//     let date = props.dateStr
//     let input = window.prompt(date + "の予定を入力してください", "");
//     if (input == "" || input==null) {
//       alert("kara")
//     } else {
//       app.auth().currentUser?.getIdToken(true).then(async (idToken: any) => {
//         // console.log(idToken)
//         const res = await axios({
//           method: 'post',
//           url: APIURL+'/addEvent',
//           headers: {
//             'Content-Type': "application/json",
//             'Authorization': idToken
//           },
//           data: {
//             Date: date,
//             InputEvent: input
//           }
//         });
//         let newEvents = [...calendarEvents]
//         // let temp
//         for (let i = 0; i < res.data.length; i++) {
//           console.log(res.data[i])
//           let temp: Event = {
//             title: res.data[i].Event,
//             date: res.data[i].Date
//           }
//           newEvents.push(temp)
//         }
//         setCalendarEvents(newEvents)
//         // console.log(res);
//       }).catch((error: any) => {
//         alert(error)
//       });
//     }
//   }
//   return (
//   )
// }
// const defaultevent: Event = { title: 'event 1', date: '2020-03-01' }
const defaltEvent: Event[] = [
  { title: 'event 1', date: '2020-03-01' },
  { title: 'event 2', date: '2019-04-02' }
]
const defaltEvent2: Event[] = [
  { title: 'event 1', date: '2020-03-04' },
  { title: 'event 2', date: '2019-04-02' }
]
const Calender = (history: any): JSX.Element => {
  const [calendarEvents, setCalendarEvents,] = React.useState(defaltEvent);
  const { eventsContext, changeEvents } = useContext(EventContext);
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
        url: APIURL+'/getEventsByUID',
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
      changeEvents(newEvents)
      // EventsContext = newEvents
      // setCalendarEvents(newEvents)
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
  const difs = (props: any) => {
    console.log(props)
    let date = props.dateStr
    let input = window.prompt(date + "の予定を入力してください", "");

    if (input == "" || input == null) {
      alert("kara")
    } else {
      app.auth().currentUser?.getIdToken(true).then(async (idToken: any) => {
        // console.log(idToken)
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
        const newEvents = calendarEvents
        // // // let temp
          let temp: Event = {
            title: "input",
            date: '2020-03-01'
          }
        // newEvents.push(temp)
        // FullCalendar.
        setCalendarEvents(defaltEvent2)
        changeEvents(newEvents)
        // setCalendarEvents(newEvents)
        // console.log(res);
      }).catch((error: any) => {
        alert(error)
      });
    }
  }
  return (
    <div>
      <h1>カレンダー</h1>{uid}
      <FullCalendar defaultView="dayGridMonth" plugins={[dayGridPlugin, interactionPlugin]} events={calendarEvents}
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
      {/* <FullCalendarComp events={calendarEvents}/> */}
      <div>
        <button onClick={() => GetEventByAPI()}>sign out</button>
      </div>
 
    </div>
  );
};

export default withRouter(Calender);