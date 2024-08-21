import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import firebase from 'firebase/compat/app'
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";

//Подключение к Firebase-----------------------------
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"

import AuthContext from './context/AuthContext'

const app =  initializeApp({
    apiKey: "AIzaSyA67PHVEr6KeFEmimx1MmuAd8kg2nuTz2I",
    authDomain: "dinner-room-1fd63.firebaseapp.com",
    projectId: "dinner-room-1fd63",
    storageBucket: "dinner-room-1fd63.appspot.com",
    messagingSenderId: "772487531128",
    appId: "1:772487531128:web:6a1591c3acbecc77a77b8d",
    measurementId: "G-2KQDW13WLW"
  }
);
const analytics = getAnalytics(app)

const auth = getAuth()
const firestore = getFirestore()
//-------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContext.Provider value={{
      firebase,
      auth,
      firestore}}
    >
      <App />
    </AuthContext.Provider>
  </React.StrictMode>
);