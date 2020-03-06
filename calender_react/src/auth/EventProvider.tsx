import React, {useEffect, useState} from 'react';
import {withRouter} from 'react-router';
import { app } from '../base';

interface IEventContext {
    title: string | undefined;
    date: string |undefined;
}
interface IEventsContext{
    eventsContext: IEventContext[];
    changeEvents: (events:any)=>void
}
const defaulEvent: IEventContext[] = [
    { title: 'event 1', date: '2020-03-01' },
    { title: 'event 2', date: '2019-04-02' }
]
const defaulEvent2: IEventContext[] = [
    { title: 'event 3', date: '2020-03-03' },
    { title: 'event 2', date: '2019-04-02' }
]

   
export const EventContext = React.createContext({
    eventsContext: defaulEvent,
    changeEvents: (ss:any) =>{}
});


export const EventProvider: React.FC = (children) => {
    const [calendarEvents, setCalendarEvents,] = React.useState(defaulEvent);
    let EventsVal: IEventsContext = {
        eventsContext: calendarEvents,
        changeEvents: (events: IEventContext[]) => {
            setCalendarEvents(defaulEvent2)
            // setState(prevState => ({
            //     user: {
            //         ...prevState.user,
            //         isSignedIn: false
            //     }
            // }));
        }
    }
    return (<EventContext.Provider value={EventsVal}>
        {children.children}
    </EventContext.Provider>)
}
export default withRouter(EventProvider);