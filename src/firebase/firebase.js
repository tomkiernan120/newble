import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

  var devConfig = {
    apiKey: "AIzaSyA9jjS5bTNbAeGpqumnWSW03Ll0kXSlEa4",
    authDomain: "newble-84121.firebaseapp.com",
    databaseURL: "https://newble-84121.firebaseio.com",
    projectId: "newble-84121",
    storageBucket: "newble-84121.appspot.com",
    messagingSenderId: "392306673213",
    appId: "1:392306673213:web:4aa9dc9fa38cc132fa0c54",
    measurementId: "G-7MFYE7CCRX"
  };

  var prodConfig = {
    apiKey: "AIzaSyA9jjS5bTNbAeGpqumnWSW03Ll0kXSlEa4",
    authDomain: "newble-84121.firebaseapp.com",
    databaseURL: "https://newble-84121.firebaseio.com",
    projectId: "newble-84121",
    storageBucket: "newble-84121.appspot.com",
    messagingSenderId: "392306673213",
    appId: "1:392306673213:web:4aa9dc9fa38cc132fa0c54",
    measurementId: "G-7MFYE7CCRX"
  };

const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const provider = new firebase.auth.GoogleAuthProvider();

const db = firebase.database();
const auth = firebase.auth();

export {
  auth,
  db
}
