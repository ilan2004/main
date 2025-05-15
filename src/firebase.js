// Manually define process for the browser environment
const process = {
  env: {
    REACT_APP_FIREBASE_API_KEY: 'AIzaSyAjxhQef-pYdbDmPpgZWECz_tHGIlJhVA0',
    REACT_APP_FIREBASE_AUTH_DOMAIN: 'dion-database.firebaseapp.com',
    REACT_APP_FIREBASE_DATABASE_URL: 'https://dion-database.firebaseapp.com',
    REACT_APP_FIREBASE_PROJECT_ID: 'dion-database',
    REACT_APP_FIREBASE_STORAGE_BUCKET: 'dion-database.appspot.com',
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID: '323021398546',
    REACT_APP_FIREBASE_APP_ID: '1:323021398546:web:4da88c6e10fd7b31206ecb',
    REACT_APP_FIREBASE_MEASUREMENT_ID: 'G-SCY2GCXYTY'
  }
};
  // Import Firebase and its modules
  import firebase from "firebase/compat/app";
  import "firebase/compat/auth";
  import "firebase/firestore";
  import { initializeApp } from 'firebase/app';
  import { getFirestore } from 'firebase/firestore';
  
  
  // Initialize Firebase app
  const app = firebase.initializeApp({
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.REACT_APP_FIREBASE_APP_ID,
      measurementId:process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
  });



  // Export Firebase auth module
  export const auth = app.auth();
  const db = getFirestore(app);
  export { db };
  export default app;

  