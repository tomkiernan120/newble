import { db } from './firebase'

export const doCreateUser = (id, username, email) => 
  db.ref( `users/${id}` ).set({
    username, 
    email
  })

export const onceGetUsers = () => 
  db.ref('users').once('value')

export const doAddSnippet = (id,snippet,author,time) => 
  db.ref(`snippets/`).set({
    id,
    snippet,
    author,
    time
  })
