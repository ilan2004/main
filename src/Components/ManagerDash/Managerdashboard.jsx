// ManagerRecentOrders.js
import React, { useState, useEffect } from 'react';
import ManagerRecentOrders from './Orderstable';
import CompanyUsers from './Usertable';
import { useAuth } from '../../Contexts/AuthContext';
import { getFirestore, collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import './RecentOrders.css'

export default function ManagerDashboard({ setOrderCount }) {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setError(null);
      try {
        if (currentUser) {
          const db = getFirestore();
          const userDoc = doc(db, 'users', currentUser.uid);
          const userSnapshot = await getDoc(userDoc);

          if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            const companyName = userData.companyName || '';
            
            // Fetch users for the company
            const companyUsersQuery = query(collection(db, 'users'), where("companyName", "==", companyName));
            const usersSnapshot = await getDocs(companyUsersQuery);
            const users = usersSnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));

            setUserData(users);
          } else {
            throw new Error('User document not found in Firestore');
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [currentUser]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='managerdashboard'>
      <ManagerRecentOrders setOrderCount={setOrderCount} />
      <CompanyUsers userData={userData} />
    </div>
  );
}
