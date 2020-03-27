import React, { useEffect,useContext, useState } from "react";
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

/* Bootstrap */
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Spinner from 'react-bootstrap/Spinner'
const Calender = (history: any): JSX.Element => {
  /* [dayGridPlugin, interactionPlugin]この制御するとエラーになる(時間ある時整形) */
  const [calendarPlugins, setCalendarPlugins] = React.useState([dayGridPlugin, interactionPlugin])
  const { eventsContext, changeEvents } = useContext(EventContext);
  const [nextEventID,setNextEventID]=React.useState(0)
  const [selectedEventID, setSelectedEventID] = useState(0);
  const [selectedEventTitle, setSelectedEventTitle] = useState("0");
  const [calendarActive, setCalendarActive] = useState("calendar-not-active")
  const [loadingAnimation, setLoadingAnimation] = useState<JSX.Element>(<div></div>)
  /* Bootstrap-modal */
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /* Ref(FullCalendar) */
  let calendarRef: any = React.createRef()
  /* Ref */
  let newEventIDRef = React.useRef<HTMLInputElement>(null);
  let addEventModalRef = React.useRef<HTMLDialogElement>(null);
  let addEventModalDateRef = React.useRef<HTMLHeadingElement>(null);
  let formRef = React.useRef<any>(null);
  
  /* /getEventsByUID からのGETで
  ログインユーザーのEventとnexteventidを取得 */
  const GetEventByAPI = async () => {
      console.log("GetEventByAP!!")
      let res = await API.GetEvents()
      console.log(res)
    // app.auth().currentUser?.getIdToken(true).then(async (idToken: any) => {
    //   const res = await axios({
    //     method: 'get',
    //     url: APIURL+'/getEventsByUID',
    //     headers: {
    //       'Content-Type': "application/json",
    //       'Authorization': idToken
    //     },
    //   });
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
      if (null !== newEventIDRef.current) {
        newEventIDRef.current.value = res.data.NextEventID
      }
      setNextEventID(res.data.NextEventID)
      changeEvents(newEvents)
      setCalendarActive("active")
      setLoadingAnimation(<div></div>)
  }

  /*　Event削除  */
  const handleSubmitForDelete = () => {
    console.log("deleteEvent")
    let calendarApi = calendarRef.current.getApi()
    let _selectedEventID = calendarApi.getEventById(selectedEventID);
    _selectedEventID.remove()
    API.DeleteEvent(selectedEventID)
    handleClose()
  }
  /* Event追加 */
  const handleSubmitForAdd = (event: any) => {
    interface AddEventValues {
      NewEventID: number
      Title: string
      Date: string | undefined
    }
    console.log(formRef.current.value)
    let AddEventValues: AddEventValues = {
      NewEventID: Number(newEventIDRef.current?.value),
      Title: formRef.current.value,
      Date: addEventModalDateRef?.current?.innerText
    }
    let calendarApi = calendarRef.current.getApi()
    if (AddEventValues.Title == "" || AddEventValues.Title == null) {
      alert("入力がありません。")
    } else {
    /* DB変更処理API(Event追加) */
      API.AddEvent(AddEventValues.NewEventID, AddEventValues.Date, AddEventValues.Title)
      /* FullCalendarAPI(Event追加) */
      calendarApi.addEvent(
        {
          id: AddEventValues.NewEventID,
          title: AddEventValues.Title,
          date: AddEventValues.Date
        }
      )
      if (null !== newEventIDRef.current) {
        newEventIDRef.current.value = String(Number(newEventIDRef.current.value) + 1);
      }
    /*  */
      formRef.current.value=""
      closeModalForAddEvent()
    }
    event.preventDefault();
  }
  /* Event編集Modal */
  const editEvent = (info: any) => {
    // console.log("ID : "+info.event.id)
    // console.log("Title : " +info.event.title)
    let calendarApi = calendarRef.current.getApi()
    let allevents = calendarApi.getEvents()
    // console.log(allevents[2])
    calendarApi.refetchEvents()
    setSelectedEventID(info.event.id)
    setSelectedEventTitle(info.event.title)
    handleShow()
  }
  /* Event名編集Form Submmit(API未実装) */
  const handleSubmitForEdit = (event: any) => {
    let calendarApi = calendarRef.current.getApi()
    // console.log(eventsContext)
    // console.log(selectedEventTitle)
    // console.log(selectedEventID)
    let selectedevent = calendarApi.getEventById(selectedEventID)
    selectedevent.setProp("title", selectedEventTitle)
    handleClose()
    event.preventDefault();
  }
  /* Event名編集Formに使用 */
  const handleChange = (event:any) =>{
    setSelectedEventTitle(event.target.value );
  }
  /* Event追加用のdialog.modal Close */
  const closeModalForAddEvent = () => {
    if (null !== addEventModalRef.current) {
      addEventModalRef.current.close()
    }
  }
  /* Event追加用のdialog.modal OPEN */
  const openModalForAddEvent = (props: any) => {
  /* dateClick()内の関数でstateの変更ができない(Reactの仕様？FullCalllendarの仕様?) */
    /* そこでHtmlのinputにデータを挿入する */
    let date = props.dateStr
    if (null !== addEventModalDateRef.current) {
      addEventModalDateRef.current.innerText = date
    }
    if (null !== addEventModalRef.current) {
      console.log(addEventModalRef)
      addEventModalRef.current.showModal()
    }

  }
  useEffect(() => {
    console.log("useEffect start")
    setLoadingAnimation(<div className="loading-animation">
      <Spinner animation="border" role="status">
        <span className="sr-only"> Loading...</span>
      </Spinner>
          Loading...
        </div>)
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
    <div >
      <div className={calendarActive}>
    
       {loadingAnimation}

        <div >
          <Container className="divFullCalendar">
            <h1>カレンダー</h1>
            <div>
              <input ref={newEventIDRef} type="text" hidden/>
            </div>
            <FullCalendar
                ref={calendarRef}
                defaultView="dayGridMonth"
                plugins={calendarPlugins}
                events={eventsContext}
                selectable={true}
                selectMirror={true}
                dateClick={(info) => { openModalForAddEvent(info) }}
                eventClick={(info) => { editEvent(info) }}
                // navLinks={true}
                // navLinkDayClick={(date, jsEvent)=> {
                //   console.log(date)
                //   handleShow()
                // }}
            />
          </Container>
        </div>
      </div>
      <dialog ref={addEventModalRef} onClick={(e) => closeModalForAddEvent()}>
      <div onClick={(e) => e.stopPropagation()}>
        <div className="addEventModal">
          <div>
            <h3 ref={addEventModalDateRef} className="modal-header"></h3>
          </div>
          <Form onSubmit={handleSubmitForAdd}>
            <Form.Group >
              <Form.Control placeholder="新規Event追加" ref={formRef} />
            </Form.Group>
            <Button variant="primary" type="submit">
              追加
            </Button>
          </Form>
          <button id="close" className="close" type="button" onClick={(e) => closeModalForAddEvent()}>&times;</button>
          </div>
        </div>
    </dialog>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Event編集</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group onSubmit={handleSubmitForEdit}>
          <br />
          <Form.Row>
            <Form.Label column lg={2}>
              Event :
            </Form.Label>
            <Col>
              <Form.Control type="text" defaultValue={selectedEventTitle} onChange={handleChange} />
            </Col>
          </Form.Row>
          <br />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          閉じる
          </Button>
        <Button variant="primary" onClick={handleSubmitForEdit}>
          保存
          </Button>
          <Button variant="danger" onClick={handleSubmitForDelete}>
          Event削除
          </Button>
      </Modal.Footer>
      </Modal>
</div>
  );
};

export default withRouter(Calender);