import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase"; // assuming you have firestore imported from firebase
import { Firestore } from "firebase/firestore";
import { collection,addDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password, displayName, Location) {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Once the user is created successfully, update additional user data
        return userCredential.user.updateProfile({
          displayName: displayName,
        }).then(() => {
          // Add the location data to Firestore
          const db = getFirestore();
          const userRef = collection(db, 'users').doc(userCredential.user.uid);
          return setDoc(userRef, { Location: Location }, { merge: true });
          //                                    ^^^^^^^^ Use 'Location' instead of 'location'
        });
      });
  }
  
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updateUser(displayName) {
    return currentUser.updateProfile({ displayName });
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  function submitFormData(formData) {
    return addDoc(collection(Firestore, "formData"), formData);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    updateUser,
    submitFormData,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
