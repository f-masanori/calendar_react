import React, {useEffect, useState} from 'react';
import {withRouter} from 'react-router';
import { app } from '../base';

export interface IEventContext {
    id: number | undefined;
    title: string | undefined;
    date: string | undefined;
    backgroundColor: string | undefined;
    borderColor: string | undefined;
    textColor: string | undefined;
}
interface IEventsContext{
    eventsContext: IEventContext[];
    changeEvents: (events:any)=>void
}
const defaulEvent: IEventContext[] = []
   
export const EventContext = React.createContext({
    eventsContext: defaulEvent,
    changeEvents: (mock:any) =>{}
});


export const EventProvider: React.FC = (children) => {
    const [calendarEvents, setCalendarEvents] = React.useState(defaulEvent);
    let EventsVal: IEventsContext = {
        eventsContext: calendarEvents,
        changeEvents: (events: IEventContext[]) => {
            setCalendarEvents(events)
        }
    }
    return (<EventContext.Provider value={EventsVal}>
        {children.children}
    </EventContext.Provider>)
}
export default withRouter(EventProvider);