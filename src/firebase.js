// Manually define process for the browser environment
const process = {
  env: {
    REACT_APP_FIREBASE_API_KEY: 'AIzaSyACYE9W2Qgf3Yb2F6hpl-wzKBIalJzIJnI',
    REACT_APP_FIREBASE_AUTH_DOMAIN: 'trial-b5cf0.firebaseapp.com',
    REACT_APP_FIREBASE_DATABASE_URL: 'https://trial-b5cf0.firebaseapp.com',
    REACT_APP_FIREBASE_PROJECT_ID: 'trial-b5cf0',
    REACT_APP_FIREBASE_STORAGE_BUCKET: 'trial-b5cf0.appspot.com',
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID: '643987288928',
    REACT_APP_FIREBASE_APP_ID: '1:643987288928:web:85d72cddd92b1fdd426405',
    REACT_APP_FIREBASE_MEASUREMENT_ID: 'G-77KY14D682'
  }
};
  
  // Import Firebase and its modules
  import firebase from "firebase/compat/app";
  import "firebase/compat/auth";
  import "firebase/firestore";
  
  
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
  export default app;

  