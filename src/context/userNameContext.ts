import { FirebaseApp } from "firebase/app";
import { Auth } from "firebase/auth";
import { Firestore } from "firebase/firestore";
import { createContext } from "react";

export const UserContext = createContext({auth: <Auth>{}, db: <Firestore>{}, app: <FirebaseApp>{}});