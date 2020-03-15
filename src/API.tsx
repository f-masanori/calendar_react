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
   
