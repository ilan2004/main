import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase"; // assuming you have firestore imported from firebase
import { Firestore } from "firebase/firestore";
import { collection,addDoc } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null); // New state for user location


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
          const userRef = doc(collection(db, 'users'), userCredential.user.uid);
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
  async function fetchUserLocation(userId) {
    try {
      const db = getFirestore();
      const userRef = doc(db, 'users', userId);
      const userSnapshot = await getDoc(userRef);
      if (userSnapshot.exists()) {
        setUserLocation(userSnapshot.data().Location);
      } else {
        console.log("User document does not exist");
      }
    } catch (error) {
      console.error("Error fetching user location:", error);
    }
  }



  const value = {
    currentUser,
    login,
    userLocation,
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
