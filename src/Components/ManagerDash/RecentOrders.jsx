import React, { useState, useEffect } from 'react';
import './RecentOrders.css';
import { HiOutlineSearch } from 'react-icons/hi';
import getOrderStatus from './lib/helpers';
import { useAuth } from '../../Contexts/AuthContext';
import { getFirestore, collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';

export default function ManagerRecentOrders({ setOrderCount }) {
  const { currentUser } = useAuth();
  const [orderData, setOrderData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [companyName, setCompanyName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        if (currentUser) {
          const db = getFirestore();
          
          // Fetch user data to get companyName
          const userDoc = doc(db, 'users', currentUser.uid);
          const userSnapshot = await getDoc(userDoc);
          
          if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            const companyName = userData.companyName || '';
            setCompanyName(companyName);
            console.log("Company Name:", companyName);  // Debug log
    
            if (companyName) {
              // Fetch orders
              const companyOrdersQuery = query(collection(db, 'formData'), where("companyName", "==", companyName));
              const orderSnapshot = await getDocs(companyOrdersQuery);
              const orders = orderSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
              }));
              console.log("Fetched Orders:", orders);  // Debug log
    
              // Fetch users
              const companyUsersQuery = query(collection(db, 'users'), where("companyName", "==", companyName));
              const usersSnapshot = await getDocs(companyUsersQuery);
              const users = usersSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
              }));
    
              setOrderData(orders);
              setFilteredData(orders);
              setUserData(users);
              setOrderCount(orders.length);
            } else {
              throw new Error('Company name not found for the current user');
            }
          } else {
            throw new Error('User document not found in Firestore');
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUser, setOrderCount]);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredData(orderData);
    } else {
      const filtered = orderData.filter(order =>
        order.chassisNumber && order.chassisNumber.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchQuery, orderData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container-Order">
      <div className="search-container relative">
        <input
          type="text"
          placeholder="Search by Chassis Number..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <strong className="header">Recent Orders for {companyName}</strong>
      <div className="border-x border-gray-200 rounded-sm mt-3">
        <table className="table">
          <thead>
            <tr className="table-row">
              <th className="table-cell">ID</th>
              <th className="table-cell">Brand</th>
              <th className="table-cell">Vehicle Model</th>
              <th className="table-cell">Chassis Number</th>
              <th className="table-cell">Battery Service Number</th>
              <th className="table-cell">Battery Voltage</th>
              <th className="table-cell">Battery Current</th>
              <th className="table-cell">Order Status</th>
              <th className="table-cell">Submission Date</th>
              <th className="table-cell">Submission Time</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((order) => (
              <tr key={order.id} className="table-row">
                <td className="table-cell">{order.id}</td>
                <td className="table-cell">{order.brand}</td>
                <td className="table-cell">{order.vehicleModel}</td>
                <td className="table-cell">{order.chassisNumber}</td>
                <td className="table-cell">{order.batteryServiceNumber}</td>
                <td className="table-cell">{order.batteryVoltage}</td>
                <td className="table-cell">{order.batteryCurrent}</td>
                <td className="table-cell">{getOrderStatus(order.status)}</td>
                <td className="table-cell">{order.date}</td>
                <td className="table-cell">{order.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <strong className="header mt-8">Company Users</strong>
      <div className="border-x border-gray-200 rounded-sm mt-3">
        <table className="table">
          <thead>
            <tr className="table-row">
              <th className="table-cell">ID</th>
              <th className="table-cell">Display Name</th>
              <th className="table-cell">Email</th>
              <th className="table-cell">Role</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user) => (
              <tr key={user.id} className="table-row">
                <td className="table-cell">{user.id}</td>
                <td className="table-cell">{user.displayName}</td>
                <td className="table-cell">{user.email}</td>
                <td className="table-cell">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}