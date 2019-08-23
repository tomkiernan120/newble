import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const devConfig = {
  apiKey: "AIzaSyB0hreq7bta_oDPV6qwqFrzNMh6U6W94CY",
  authDomain: "newble.firebaseapp.com",
  databaseURL: "https://newble.firebaseio.com",
  projectId: "newble",
  storageBucket: "",
  messagingSenderId: "423886335226",
  appId: "1:423886335226:web:86c98af7dae391ca"
}

const prodConfig = {
  apiKey: "AIzaSyB0hreq7bta_oDPV6qwqFrzNMh6U6W94CY",
  authDomain: "newble.firebaseapp.com",
  databaseURL: "https://newble.firebaseio.com",
  projectId: "newble",
  storageBucket: "",
  messagingSenderId: "423886335226",
  appId: "1:423886335226:web:86c98af7dae391ca"
}

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
