// Manually define process for the browser environment
const process = {
    env: {
      REACT_APP_FIREBASE_API_KEY: 'AIzaSyBS4WP-vrskQfN0S5rQ70ualDP69LPOZx8',
      REACT_APP_FIREBASE_AUTH_DOMAIN: 'hertzev-4f4cd.firebaseapp.com',
      REACT_APP_FIREBASE_DATABASE_URL: 'https://hertzev-4f4cd.firebaseapp.com',
      REACT_APP_FIREBASE_PROJECT_ID: 'hertzev-4f4cd',
      REACT_APP_FIREBASE_STORAGE_BUCKET: 'hertzev-4f4cd.appspot.com',
      REACT_APP_FIREBASE_MESSAGING_SENDER_ID: '336596379476',
      REACT_APP_FIREBASE_APP_ID: '1:336596379476:web:c8f8cad7ddd342a5164ac1',
      REACT_APP_FIREBASE_MEASUREMENT_ID: 'G-MKGPJMP4PZ'
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

  