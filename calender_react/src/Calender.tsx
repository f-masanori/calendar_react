import React, { useContext } from "react";
import { withRouter } from "react-router";
import { AuthContext } from "./auth/AuthProvider";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import interactionPlugin from '@fullcalendar/interaction';
const Calender = (history:any ):JSX.Element => {
  const { login,signout } = useContext(AuthContext);
  const clickSignout = () => {
    console.log("サインアウト")
      signout(history.history)
  }
  return (
    <div>
      <h1>カレンダー</h1>
      <FullCalendar defaultView="dayGridMonth" plugins={[dayGridPlugin,interactionPlugin]} events={[
        { title: 'event 1', date: '2020-02-01' },
        { title: 'event 2', date: '2019-04-02' }
      ]}
        selectable={true}
        selectMirror={true}
        dateClick={function (info) {
          alert('Clicked on: ' + info.dateStr);
          alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
          alert('Current view: ' + info.view.type);
          // change the day's background color just for fun
          info.dayEl.style.backgroundColor = 'red';
        }} />
     
      <div>
    <button onClick={() => clickSignout()}>sign out</button>
      </div>
    </div>
  );
};

export default withRouter(Calender);