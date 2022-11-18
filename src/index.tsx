import React from "react";
import ReactDOM from "react-dom/client";
import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import { CoreRouter } from "./core/router";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { UserContext } from "./context/userNameContext";
import { getAuth } from "firebase/auth";

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
const auth = getAuth(app);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <UserContext.Provider
      value={{
        app,
        db,
        auth,
      }}
    >
      <CoreRouter />
    </UserContext.Provider>
  </React.StrictMode>
);
