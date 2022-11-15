import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import { MainScreen } from "./MainScreen";
import { CoreRouter } from "./core/router";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCsJXnvteDUzXmOFbiGCuGw6jKNvd7H6oo",
  authDomain: "todo-4acac.firebaseapp.com",
  projectId: "todo-4acac",
  storageBucket: "todo-4acac.appspot.com",
  messagingSenderId: "908956854650",
  appId: "1:908956854650:web:14385c2e8840c70e268ec3",
  measurementId: "G-PTQYJFVWPY",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <CoreRouter />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
