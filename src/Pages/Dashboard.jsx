import React from 'react'
import RecentOrders from '../Components/Dashboard/RecentOrders'
import './Dashboard.css'

export default function Dashboard() {
    return (
	
        <div className="dashboard-container">         
            <div className="row-container">
                <RecentOrders />
            </div>
        </div>

    );
}