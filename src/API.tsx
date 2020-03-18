import React, { useEffect, useContext, useState } from "react";
import { withRouter } from "react-router";
import axios from 'axios';

/* コンテキスト */
import { AuthContext } from "./auth/AuthProvider";
import { EventContext, IEventContext } from "./auth/EventProvider";

/* firebase認証 */
import { app } from './base';
/* 設定ファイル */
import APIURL from './Config'

/* RegisterUser */
/* サインインの際に叩くAPI */
/* ここで初期化しておかないとエラー*/
export const RegisterUser = (UID:string,email :string) => {
    console.log("Register!!")
    axios({
        method: 'post',
        url: APIURL + '/registerUser',
        headers: {
            'Content-Type': "application/json"
        },
        data: {
            UID: UID ,
            Email: email
        }
    }).then(res => {
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
}

/* Event削除 API */
/* UID と　EventIDに基づいて削除 */
/* UIDはjwt */
/* res未実装 */
export const DeleteEvent = (eventID: number) => {
    console.log("DeleteEvent!!")
    app.auth().currentUser?.getIdToken(true).then(async (idToken: any) => {
        axios({
            method: 'post',
            url: APIURL + '/deleteEvent',
            headers: {
                'Content-Type': "application/json",
                'Authorization': idToken
            },
            data: {
                EventID: String(eventID)
            }
        }).then(res => {
            // console.log(res.data.NextEventID)
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

// export const GetNextEventID =()
export const GetNextEventID =  ():any => {
    console.log("GetNextEventID!!")
    // let resEventIDxxx:number =999
     app.auth().currentUser?.getIdToken(true).then((idToken: any) => {
        axios({
            method: 'post',
            url: APIURL + '/getNextEventID',
            headers: {
                'Content-Type': "application/json",
                 'Authorization': idToken
            }
        }).then(res => {
            console.log(res.data.NextEventID)
            return res.data.NextEventID
            // resEventIDxxx = res.data.NextEventID
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
            return 1111
        });
    }).catch((error: any) => {
        alert(error)
    });
    return 0


}
export const AddEvent = (_nextEventID: number, date: string | undefined, input: string | null) => { 
     if (input == "" || input == null) {
      
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
                EventID: _nextEventID,
                Date: date,
                InputEvent: input
            }
        });
    }).catch((error: any) => {
        alert(error)
    });
    }
    // app.auth().currentUser?.getIdToken(true).then(async (idToken: any) => {
    //     const res = await axios({
    //         method: 'post',
    //         url: APIURL + '/addEvent',
    //         headers: {
    //             'Content-Type': "application/json",
    //             'Authorization': idToken
    //         },
    //         data: {
    //             EventID: _nextEventID,
    //             Date: date,
    //             InputEvent: input
    //         }
    //     });

    //     // calendarApi.addEvent(
    //     //   { 
    //     //     id: _nextEventID,
    //     //     title: input,
    //     //     date: date
    //     //   }
    //     // )
      
    // }).catch((error: any) => {
    //     alert(error)
    // });
    console.log("tete")
}
/* Event編集 API */
/* UID と　EventIDに基づいて編集 */
/* UIDはjwt */
/* res未実装 */
export const EditEvent = (eventID: number) => {
    console.log("EditEvent!!")
}