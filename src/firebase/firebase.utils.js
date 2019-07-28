import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCpbrlpmAry1r2fEvAkiIfl9Yjz1QvYAQw",
    authDomain: "crwn-clothing-jinyoung777.firebaseapp.com",
    databaseURL: "https://crwn-clothing-jinyoung777.firebaseio.com",
    projectId: "crwn-clothing-jinyoung777",
    storageBucket: "",
    messagingSenderId: "967901307058",
    appId: "1:967901307058:web:eb3308fe28f8b6a7"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;