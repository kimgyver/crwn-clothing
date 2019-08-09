import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { async } from 'q';

const config = {
    apiKey: "AIzaSyCpbrlpmAry1r2fEvAkiIfl9Yjz1QvYAQw",
    authDomain: "crwn-clothing-jinyoung777.firebaseapp.com",
    databaseURL: "https://crwn-clothing-jinyoung777.firebaseio.com",
    projectId: "crwn-clothing-jinyoung777",
    storageBucket: "",
    messagingSenderId: "967901307058",
    appId: "1:967901307058:web:eb3308fe28f8b6a7"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
        const {displayName, email} = userAuth;
        const createAt = new Date();

        try {
            await userRef.set({
                displayName, 
                email,
                createAt,
                ...additionalData
            });
        } catch (error) {
            console.log("error creating data", error.message);
        }
    }
    
    return userRef;
}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    console.log(collectionRef);

    const batch = firestore.batch();
    objectsToAdd.forEach(object => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, object);
    });

    return await batch.commit();
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;