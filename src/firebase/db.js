import { db } from './firebase'

export const doCreateUser = (id, username, email) => 
  db.ref( `users/${id}` ).set({
    username, 
    email
  })

export const onceGetUsers = () => 
  db.ref('users').once('value')

export const doAddSnippet = ( userid, snippet, time) => 
  db.ref(`${userid}/snippets`).push().set({
    snippet,
    time
  })

export const getSnippets = (userid) =>
    db.ref(`${userid}/snippets`)