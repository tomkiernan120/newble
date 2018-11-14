import { db } from './firebase'

export const doCreateUser = (id, username, email) => 
  db.ref( `users/${id}` ).set({
    username, 
    email
  })

export const onceGetUsers = () => 
  db.ref('users').once('value')

export const doAddSnippet = ( userid, snippet, title, time) => 
  db.ref(`${userid}/snippets`).push().set({
    snippet,
    title,
    time
  })

export const getSnippets = (userid) =>
    db.ref(`${userid}/snippets`)

export const deleteSnippet = (userid, id) =>
  db.ref(`${userid}/snippets/${id}`).remove()