// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { initializeAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getReactNativePersistence } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: 'AIzaSyDK-ugx13SWCT8_b6dN_qYETmAYsM0yVY4',
    authDomain: 'toothwallet-45402.firebaseapp.com',
    projectId: 'toothwallet-45402',
    storageBucket: 'toothwallet-45402.appspot.com',
    messagingSenderId: '310378678089',
    appId: '1:310378678089:web:57e2dfd24bece26a2afc98',
    measurementId: 'G-07PJCEWZNK',
    databaseURL: 'https://toothwallet-45402-default-rtdb.firebaseio.com'    
};


export const firebaseAPP = initializeApp(firebaseConfig);
export const auth = initializeAuth(firebaseAPP, {
    persistence: getReactNativePersistence(AsyncStorage),
});
export const FireStoreDatabase = getFirestore()
export const FireStorage = getStorage()
