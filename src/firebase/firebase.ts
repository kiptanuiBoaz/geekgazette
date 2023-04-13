import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2xpM0nzh-xxBzJpFOBdxIneLUK7NTy20",
  authDomain: "geek-gazette.firebaseapp.com",
  projectId: "geek-gazette",
  storageBucket: "geek-gazette.appspot.com",
  messagingSenderId: "809113448193",
  appId: "1:809113448193:web:17b129a1bf8e9daebdb500"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app); 