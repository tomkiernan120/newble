import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const devConfig = {
  apiKey: 'AIzaSyDjqHtSzDtJfI0lzpnsxB2zz820hB5FMnM',
  authDomain: 'newbie-dev.firebaseapp.com',
  databaseURL: 'https://newbie-dev.firebaseio.com',
  projectId: 'newbie-dev',
  storageBucket: 'newbie-dev.appspot.com',
  messagingSenderId: '648887745098'
}

const prodConfig = {
  apiKey: 'AIzaSyBXc9oTRIQkqPdEiB-H0YxayqB_Bcrujh0',
  authDomain: 'newbie-e9b0c.firebaseapp.com',
  databaseURL: 'https://newbie-e9b0c.firebaseio.com',
  projectId: 'newbie-e9b0c',
  storageBucket: 'newbie-e9b0c.appspot.com',
  messagingSenderId: '787473401115'
}

const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

const db = firebase.database()
const auth = firebase.auth()

export {
  auth,
  db
}
