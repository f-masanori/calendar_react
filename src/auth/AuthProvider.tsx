import React, { useEffect, useState, useContext } from 'react';
import { EventContext, IEventContext } from "./EventProvider";

import {withRouter} from 'react-router';
import {app} from '../base';
interface IAuthContext {
  login: (email: string, password: string, history: any) => any;
  signup: (email: string, password: string, history: any) => void;
  signout: (history: any) => void;
  uid: string | undefined;
  idtoken?: string;
}

const AuthVal: IAuthContext = {
  login: async (email: string, password: string, history: any) => {
    await app.auth().signInWithEmailAndPassword(email, password).then(res => {
      AuthVal.uid = res.user?.uid
      let UID: any = AuthVal.uid
      localStorage.setItem('uid', UID);
      history.push('/calender');
      console.log(res.user?.uid)
      })
        .catch(error => {
          alert(error);
        });;
  },
  signup: async (email: string, password: string, history: any) => {
   await app.auth().createUserWithEmailAndPassword(email, password).then(res => {
      AuthVal.uid = res.user?.uid
      let UID: any = AuthVal.uid
      localStorage.setItem('uid', UID);
      history.push('/calender');
      console.log(res.user?.uid)
    })
      .catch(error => {
        alert(error);
    });
  },
  signout: async (history: any) => {
    try {      
      await app.auth().signOut();
      localStorage.setItem('uid', "");
      history.push('/login');
      window.location.reload()
    } catch (error) {
      alert(error);
    }
  },
  uid: undefined
}

export const AuthContext = React.createContext(AuthVal);


export const AuthProvider: React.FC = (children) => {
  const { eventsContext, changeEvents } = useContext(EventContext);
  //  useEffect(() => {
  //    app.auth().onAuthStateChanged(user => {
  //      if (user) {
  //        const user = app.auth().currentUser;
  //        console.log("uid="+user?.uid)
  //        console.log(children)
  //       //  AuthVal.uid = user?.uid
  //       //  const temp = GetEventsbyAPI()
  //       //  console.log(temp)
  //       //  changeEvents(temp)
  //        console.log("ログインしてます")
  //      } else {
  //        console.log("ログインしてません")
  //        AuthVal.uid = undefined
  //      }
  //    });
  //   }, []);
  return (
    <AuthContext.Provider value={AuthVal}>
      {children.children}
    </AuthContext.Provider>
  )
}
export default withRouter(AuthProvider);
