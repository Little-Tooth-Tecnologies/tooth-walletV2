// Import the functions you need from the SDKs you need
import * as firebase from 'firebase/app';
import { getAuth, getReactNativePersistence, initializeAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { measurementId, appId, messagingSenderId, storageBucket, projectId, authDomain, apiKey } from '@env';



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {
    apiKey: apiKey,
    authDomain: authDomain,
    projectId: projectId,
    storageBucket: storageBucket,
    messagingSenderId: messagingSenderId,
    appId: appId,
    measurementId: measurementId
};

// Initialize Firebase
try {
    firebase.initializeApp(firebaseConfig);
} catch (error) {
    console.error('Firebase initialization error', error.stack)
}

const app = firebase.getApp();

const auth = getAuth(app);
initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),

});

export const Fauth = auth

export const FireStoreDatabase = getFirestore()
export const FireStorage = getStorage()
