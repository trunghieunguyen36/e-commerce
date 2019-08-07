import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyB0JMXVBbSw33XZzAGTs8b4m2mwy7knGk4",
    authDomain: "e-commerce-db-dd69d.firebaseapp.com",
    databaseURL: "https://e-commerce-db-dd69d.firebaseio.com",
    projectId: "e-commerce-db-dd69d",
    storageBucket: "",
    messagingSenderId: "489725390416",
    appId: "1:489725390416:web:56628932d3f9b69a"
  };

export const createUserProfileDocument =  async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exist) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('Error creating user', error.message);
      }
  }
  return userRef;
}

firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();


const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
