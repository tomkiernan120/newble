import { auth } from './firebase'

// sign up
export const doCreateUserWithEmailAndPassword = ( email, password ) => {
  return auth.createUserWithEmailAndPassword( email, password );
}

//sign in 
export const doSignInWithEmailAndPassword = ( email, password ) => {
  return auth.signInWithEmailAndPassword( email, password );
} 

export const doSignOut = () => {
  return auth.signOut();
}

// Password Reset
export const doPasswordReset = (email) => {
  return auth.sendPasswordResetEmail(email);
}

// Password Change
export const doPasswordUpdate = (password) => {
  return auth.currentUser.updatePassword(password);
}
