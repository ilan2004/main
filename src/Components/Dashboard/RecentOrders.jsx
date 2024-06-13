import React, { useState, useEffect } from 'react';
import './RecentOrders.css';
import { HiOutlineSearch } from 'react-icons/hi';
import getOrderStatus from './lib/helpers';
import { useAuth } from '../../Contexts/AuthContext';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';

export default function RecentOrders({ setOrderCount }) {
  const { currentUser } = useAuth();
  const [recentOrderData, setRecentOrderData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const firestore = getFirestore();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (currentUser) {
          const db = getFirestore();
          const formDataCollection = collection(db, 'formData');
          const userFormDataQuery = query(formDataCollection, where("userId", "==", currentUser.uid));
          const querySnapshot = await getDocs(userFormDataQuery);
          const orders = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setRecentOrderData(orders);
          setFilteredData(orders);
          setOrderCount(orders.length);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [currentUser, setOrderCount]);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredData(recentOrderData);
    } else {
      const filtered = recentOrderData.filter(order =>
        order.chassisNumber && order.chassisNumber.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchQuery, recentOrderData]);

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
      <strong className="header">Recent Orders</strong>
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
            </tr>
          </thead>
          <tbody>
            {filteredData.map((order) => (
              <tr key={order.id} className="table-row">
                <td className="table-cell">{order.id}</td>
                <td className="table-cell">{order.brand}</td>
                <td className="table-cell">{order.VehicleModel}</td>
                <td className="table-cell">{order.chassisNumber}</td>
                <td className="table-cell">{order.servicenumber}</td>
                <td className="table-cell">{order.BatteryVoltage}</td>
                <td className="table-cell">{order.BatteryCurrent}</td>
                <td className="table-cell">{getOrderStatus(order.Status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
