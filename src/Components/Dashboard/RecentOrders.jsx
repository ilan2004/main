import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { format } from 'date-fns'
import './RecentOrders.css';
import { Link } from 'react-router-dom'
import { getAuth } from 'firebase/auth';
import getOrderStatus from './lib/helpers'
import { useAuth } from '../../Contexts/AuthContext';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';


export default function RecentOrders() {
	const { currentUser } = useAuth();
	const [recentOrderData, setRecentOrderData] = useState([]);
	const firestore = getFirestore();
  
	useEffect(() => {
		const fetchUserData = async () => {
		  try {
			if (currentUser) {
			  // Access Firestore
			  const db = getFirestore();
	
			  // Query the Firestore collection where the form data is stored
			  const formDataCollection = collection(db, 'formData');
	
			  // Create a query to get only the current user's form data
			  const userFormDataQuery = query(formDataCollection, where("userId", "==", currentUser.uid));
	
			  // Execute the query
			  const querySnapshot = await getDocs(userFormDataQuery);
	
			  // Map the query snapshot to an array of orders
			  const orders = querySnapshot.docs.map(doc => ({
				id: doc.id,
				...doc.data()
			  }));
	
			  // Update state with the fetched data
			  setRecentOrderData(orders);
			}
		  } catch (error) {
			console.error('Error fetching user data:', error);
		  }
		};
	
		fetchUserData();
	  }, [currentUser]);
	
	

	return (
		<div className="container-Order">
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
                        {recentOrderData.map((order) => (
                            <tr key={order.id} className="table-row">
                                <td className="table-cell">
                                    
                                </td>
                                <td className="table-cell">
								{order.brand}
                                </td>
                                <td className="table-cell">
								{order.VehicleModel}
                                </td>
                                {/* <td className="table-cell">{format(new Date(order.order_date), 'dd MMM yyyy')}</td> */}
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
	)
}