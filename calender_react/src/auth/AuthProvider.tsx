import * as history from 'history';
import React, {useEffect, useState} from 'react';
import {withRouter} from 'react-router';
import {app} from '../base.js';


interface Props {
  children:any
}
interface IAuthContext {
  login: (email: string, password: string, history: any) => any;
  signup: (email: string, password: string, history: any) => void;
  signout: (history: any) => void;
  uid: string | undefined;
}

const AuthVal: IAuthContext = {
  login: async (email: string, password: string, history: any) => {
    try {
      await app.auth().signInWithEmailAndPassword(email, password);
      history.push('/calender');
      alert("カレンダーへ")
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
  },
  signout: async (history: any) => {
    try {
      await app.auth().signOut();
      history.push('/');
    } catch (error) {
      alert(error);
    }
   
  },
  uid: undefined
}
// contextの作成
export const AuthContext = React.createContext(AuthVal);


export const AuthProvider: React.FC<Props> = (children) => {
  const [currentUser, setCurrentUser] = useState(null);
   useEffect(() => {
     app.auth().onAuthStateChanged(user => {
       if (user) {
         const user = app.auth().currentUser;
         console.log("uid="+user?.uid)
         console.log(children)
         AuthVal.uid = user?.uid
       } else {
         console.log("ログインしてません")
         AuthVal.uid = undefined
       }
     });
    }, []);
  return (
    <AuthContext.Provider value={AuthVal}>
      {children.children}
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