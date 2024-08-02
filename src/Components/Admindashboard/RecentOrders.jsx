import React, { useState, useEffect } from 'react';
import './AdminDashboard.css'; // You might need to create this CSS file
import { HiOutlineSearch } from 'react-icons/hi';
import getOrderStatus from './lib/helpers';
import { useAuth } from '../../Contexts/AuthContext';
import { getFirestore, collection, getDocs, query, where, doc, updateDoc } from 'firebase/firestore';

export default function AdminDashboard() {
  const { currentUser, isAdmin } = useAuth();
  const [allOrderData, setAllOrderData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalOrders, setTotalOrders] = useState(0);
  const firestore = getFirestore();

  useEffect(() => {
    const fetchAllOrderData = async () => {
      try {
        if (currentUser && isAdmin) {
          const db = getFirestore();
          const formDataCollection = collection(db, 'formData');
          const querySnapshot = await getDocs(formDataCollection);
          const orders = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setAllOrderData(orders);
          setFilteredData(orders);
          setTotalOrders(orders.length);
        }
      } catch (error) {
        console.error('Error fetching all order data:', error);
      }
    };

    fetchAllOrderData();
  }, [currentUser, isAdmin]);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredData(allOrderData);
    } else {
      const filtered = allOrderData.filter(order =>
        order.chassisNumber && order.chassisNumber.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchQuery, allOrderData]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const orderRef = doc(firestore, 'formData', orderId);
      await updateDoc(orderRef, { Status: newStatus });
      
      // Update local state
      const updatedOrders = allOrderData.map(order => 
        order.id === orderId ? { ...order, Status: newStatus } : order
      );
      setAllOrderData(updatedOrders);
      setFilteredData(updatedOrders);
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  if (!isAdmin) {
    return <div>You do not have permission to view this page.</div>;
  }

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="dashboard-summary">
        <p>Total Orders: {totalOrders}</p>
        {/* Add more summary statistics here */}
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Chassis Number..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <HiOutlineSearch className="search-icon" />
      </div>
      <div className="orders-table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>Brand</th>
              <th>Vehicle Model</th>
              <th>Chassis Number</th>
              <th>Battery Service Number</th>
              <th>Battery Voltage</th>
              <th>Battery Current</th>
              <th>Order Status</th>
              <th>Submission Date</th>
              <th>Submission Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.userId}</td>
                <td>{order.brand}</td>
                <td>{order.VehicleModel}</td>
                <td>{order.chassisNumber}</td>
                <td>{order.servicenumber}</td>
                <td>{order.BatteryVoltage}</td>
                <td>{order.BatteryCurrent}</td>
                <td>{getOrderStatus(order.Status)}</td>
                <td>{order.date}</td>
                <td>{order.time}</td>
                <td>
                  <select 
                    value={order.Status} 
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}