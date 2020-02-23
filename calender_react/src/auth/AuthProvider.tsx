import * as history from 'history';
import React, {useEffect, useState} from 'react';
import {withRouter} from 'react-router';

import {app} from '../base.js';


interface Ilogin {
    (email: string, password: string, history: string): void;
}
interface Isignup {
  (email: string, password: string, history: string): void;
}
interface IAuthContext {
    // login: Ilogin;
    // signup: Isignup;
    login: (email: string, password: string, history: any) => any;
    signup?: (email: string, password: string, history: any) => void;
}
const AuthVal: IAuthContext = {
  login: async (email: string, password: string, history: any) => {
    try {
      await app.auth().signInWithEmailAndPassword(email, password);
      history.push('/');

    } catch (error) {
      alert(error);
    }
  },
  signup: async (email: string, password: string, history: any) => {
    try {
      await app.auth().createUserWithEmailAndPassword(email, password);
      history.push('/');
    } catch (error) {
      alert(error);
    }
  }
}
// contextの作成
export const AuthContext = React.createContext(AuthVal);

export const AuthProvider: React.FC = () => {
  const [currentUser, setCurrentUser] = useState(null);
   // useEffect(() => {
    //     app.auth().onAuthStateChanged(setCurrentUser);
    // }, []);
  return (
    <AuthContext.Provider value={AuthVal}>
      
    </AuthContext.Provider>
  )
}

// export const AuthProvider: React.FC=() => {
    // const [currentUser, setCurrentUser] = useState(null);


    // ユーザーをログインさせる関数
    // const login = async (email: string, password: string, history: any) => {
    //   try {
    //     await app.auth().signInWithEmailAndPassword(email, password);
    //     history.push("/");
    //   } catch (error) {
    //     alert(error);
    //   }
    // };

    // 新しいユーザーを作成しログインさせる関数
    // const signup = async (email, password, history) => {
    //   try {
    //     await app.auth().createUserWithEmailAndPassword(email, password);
    //     history.push("/");
    //   } catch (error) {
    //     alert(error);
    //   }
    // };

    // useEffect(() => {
    //     app.auth().onAuthStateChanged(setCurrentUser);
    // }, []);

//     return (
//         //     //
//         //     Contextを使用して認証に必要な情報をコンポーネントツリーに流し込む。
//             <AuthContext.Provider value=(AuthVal) >
        
//             </AuthContext.Provider>
//     );
// };