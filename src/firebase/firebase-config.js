// import * as firebase from "firebase";
import firebase from "firebase";

const config = {
  apiKey: "AIzaSyCYzjgU1AIxFr49B0Q8pjNI-b4HUvRqctM",
  authDomain: "todo-app-react-firebase-520ef.firebaseapp.com",
  databaseURL: "https://todo-app-react-firebase-520ef.firebaseio.com",
  projectId: "todo-app-react-firebase-520ef",
  storageBucket: "todo-app-react-firebase-520ef.appspot.com",
  messagingSenderId: "793717184137",
  appId: "1:793717184137:web:40b12bc2212ea84bce1858",
};

firebase.initializeApp(config);

const databaseRef = firebase.database().ref();
export const todosRef = databaseRef.child("todo_lists_firebase");
