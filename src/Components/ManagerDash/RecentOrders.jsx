import React, { useState, useEffect } from 'react';
import './RecentOrders.css';
import { HiOutlineSearch, HiOutlinePencilAlt } from 'react-icons/hi';
import getOrderStatus from './lib/helpers';
import { useAuth } from '../../Contexts/AuthContext';
import { getFirestore, collection, getDocs, query, where, doc, getDoc, updateDoc } from 'firebase/firestore';

export default function ManagerRecentOrders({ setOrderCount }) {
  const { currentUser } = useAuth();
  const [orderData, setOrderData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [companyName, setCompanyName] = useState('');
  const [editingOrder, setEditingOrder] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [orderForm, setOrderForm] = useState({});
  const [userForm, setUserForm] = useState({});

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

  const handleEditOrder = (order) => {
    setEditingOrder(order);
    setOrderForm(order);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setUserForm(user);
  };

  const handleOrderChange = (e) => {
    setOrderForm({
      ...orderForm,
      [e.target.name]: e.target.value
    });
  };

  const handleUserChange = (e) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveOrder = async () => {
    const db = getFirestore();
    const orderRef = doc(db, 'formData', editingOrder.id);
    try {
      await updateDoc(orderRef, orderForm);
      setOrderData(orderData.map(order =>
        order.id === editingOrder.id ? { ...order, ...orderForm } : order
      ));
      setEditingOrder(null);
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const handleSaveUser = async () => {
    const db = getFirestore();
    const userRef = doc(db, 'users', editingUser.id);
    try {
      await updateDoc(userRef, userForm);
      setUserData(userData.map(user =>
        user.id === editingUser.id ? { ...user, ...userForm } : user
      ));
      setEditingUser(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

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
              <th className="table-cell">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((order) => (
              <tr key={order.id} className="table-row">
                <td className="table-cell">{order.id}</td>
                <td className="table-cell">
                  {editingOrder && editingOrder.id === order.id ? (
                    <input
                      type="text"
                      name="brand"
                      className="text-edit"
                      value={orderForm.brand || ''}
                      onChange={handleOrderChange}
                    />
                  ) : (
                    order.brand
                  )}
                </td>
                <td className="table-cell">
                  {editingOrder && editingOrder.id === order.id ? (
                    <input
                      type="text"
                      name="vehicleModel"
                      className="text-edit"
                      value={orderForm.vehicleModel || ''}
                      onChange={handleOrderChange}
                    />
                  ) : (
                    order.vehicleModel
                  )}
                </td>
                <td className="table-cell">
                  {editingOrder && editingOrder.id === order.id ? (
                    <input
                      type="text"
                      name="chassisNumber"
                      className="text-edit"
                      value={orderForm.chassisNumber || ''}
                      onChange={handleOrderChange}
                    />
                  ) : (
                    order.chassisNumber
                  )}
                </td>
                <td className="table-cell">
                  {editingOrder && editingOrder.id === order.id ? (
                    <input
                      type="text"
                      name="batteryServiceNumber"
                      className="text-edit"
                      value={orderForm.batteryServiceNumber || ''}
                      onChange={handleOrderChange}
                    />
                  ) : (
                    order.batteryServiceNumber
                  )}
                </td>
                <td className="table-cell">
                  {editingOrder && editingOrder.id === order.id ? (
                    <input
                      type="text"
                      name="batteryVoltage"
                      className="text-edit"
                      value={orderForm.batteryVoltage || ''}
                      onChange={handleOrderChange}
                    />
                  ) : (
                    order.batteryVoltage
                  )}
                </td>
                <td className="table-cell">
                  {editingOrder && editingOrder.id === order.id ? (
                    <input
                      type="text"
                      name="batteryCurrent"
                      className="text-edit"
                      value={orderForm.batteryCurrent || ''}
                      onChange={handleOrderChange}
                    />
                  ) : (
                    order.batteryCurrent
                  )}
                </td>
                <td className="table-cell">
                  {editingOrder && editingOrder.id === order.id ? (
                    <select
                      name="status"
                      className="select"
                      value={orderForm.status || ''}
                      onChange={handleOrderChange}
                    >
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  ) : (
                    getOrderStatus(order.status)
                  )}
                </td>
                <td className="table-cell">
                  {editingOrder && editingOrder.id === order.id ? (
                    <input
                      type="date"
                      name="date"
                      className="date-edit"
                      value={orderForm.date || ''}
                      onChange={handleOrderChange}
                    />
                  ) : (
                    order.date
                  )}
                </td>
                <td className="table-cell">
                  {editingOrder && editingOrder.id === order.id ? (
                    <input
                      type="time"
                      name="time"
                      className="time-edit"
                      value={orderForm.time || ''}
                      onChange={handleOrderChange}
                    />
                  ) : (
                    order.time
                  )}
                </td>
                <td className="table-cell">
                  {editingOrder && editingOrder.id === order.id ? (
                    <>
                      <button onClick={handleSaveOrder}>Save</button>
                      <button className="cancel" onClick={() => setEditingOrder(null)}>Cancel</button>
                    </>
                  ) : (
                    <button onClick={() => handleEditOrder(order)}>
                      <HiOutlinePencilAlt /> Edit
                    </button>
                  )}
                </td>
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
              <th className="table-cell">Actions</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user) => (
              <tr key={user.id} className="table-row">
                <td className="table-cell">{user.id}</td>
                <td className="table-cell">
                  {editingUser && editingUser.id === user.id ? (
                    <input
                      type="text"
                      name="displayName"
                      className="text-edit"
                      value={userForm.displayName || ''}
                      onChange={handleUserChange}
                    />
                  ) : (
                    user.displayName
                  )}
                </td>
                <td className="table-cell">
                  {editingUser && editingUser.id === user.id ? (
                    <input
                      type="email"
                      name="email"
                      className="email-edit"
                      value={userForm.email || ''}
                      onChange={handleUserChange}
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td className="table-cell">
                  {editingUser && editingUser.id === user.id ? (
                    <input
                      type="text"
                      name="role"
                      className="text-edit"
                      value={userForm.role || ''}
                      onChange={handleUserChange}
                    />
                  ) : (
                    user.role
                  )}
                </td>
                <td className="table-cell">
                  {editingUser && editingUser.id === user.id ? (
                    <>
                      <button onClick={handleSaveUser}>Save</button>
                      <button className="cancel" onClick={() => setEditingUser(null)}>Cancel</button>
                    </>
                  ) : (
                    <button onClick={() => handleEditUser(user)}>
                      <HiOutlinePencilAlt /> Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}