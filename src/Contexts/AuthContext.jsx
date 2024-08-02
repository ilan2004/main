import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import { getFirestore, doc, setDoc, getDoc, collection, addDoc } from "firebase/firestore";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userCompanyName, setUserCompanyName] = useState(null);
  const [userRole, setUserRole] = useState(null);

  async function signup(email, password, displayName, companyName, role) {
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      await userCredential.user.updateProfile({ displayName });

      const db = getFirestore();
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email,
        displayName,
        companyName,
        role
      });

      return userCredential;
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  }

  async function login(email, password) {
    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      await checkAdminStatus(userCredential.user);
      return userCredential;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  }

  async function loginAsManager(email, password, companyName) {
    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      const user = userCredential.user;

      const db = getFirestore();
      const userRef = doc(db, 'users', user.uid);
      const userSnapshot = await getDoc(userRef);
      if (userSnapshot.exists() && userSnapshot.data().role === 'manager') {
        await setDoc(userRef, { companyName }, { merge: true });
        setUserRole('manager');
        setCurrentUser(user);
        return userCredential;
      } else {
        throw new Error("User is not a manager");
      }
    } catch (error) {
      console.error("Error logging in as manager:", error);
      throw error;
    }
  }

  async function checkAdminStatus(user) {
    try {
      const idTokenResult = await user.getIdTokenResult();
      setIsAdmin(!!idTokenResult.claims.admin);
    } catch (error) {
      console.error("Error checking admin status:", error);
    }
  }

  async function logout() {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }

  async function resetPassword(email) {
    try {
      await auth.sendPasswordResetEmail(email);
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  }

  async function updateEmail(email) {
    try {
      await currentUser.updateEmail(email);
    } catch (error) {
      console.error("Error updating email:", error);
      throw error;
    }
  }

  async function updatePassword(password) {
    try {
      await currentUser.updatePassword(password);
    } catch (error) {
      console.error("Error updating password:", error);
      throw error;
    }
  }

  async function updateUser(displayName) {
    try {
      await currentUser.updateProfile({ displayName });
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  }

  async function fetchUserData(userId) {
    try {
      const db = getFirestore();
      const userRef = doc(db, 'users', userId);
      const userSnapshot = await getDoc(userRef);
      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        setUserCompanyName(userData.companyName);
        setUserRole(userData.role);
      } else {
        console.log("User document does not exist");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  async function submitFormData(formData) {
    try {
      const db = getFirestore();
      await addDoc(collection(db, "formData"), formData);
    } catch (error) {
      console.error("Error submitting form data:", error);
      throw error;
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);
      if (user) {
        await checkAdminStatus(user);
        await fetchUserData(user.uid);
      } else {
        setIsAdmin(false);
        setUserCompanyName(null);
        setUserRole(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    isAdmin,
    userCompanyName,
    userRole,
    signup,
    login,
    loginAsManager,
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