import React, { useState } from 'react';
import UserRecentOrders from '../Components/Dashboard/RecentOrders'
import './Dashboard.css'
import DashboardStatsGrid from '../Components/Dashboard/DashboardStatsGrid';

export default function Dashboard() {
    const [orderCount, setOrderCount] = useState(0);
  
    return (
      <div className="dashboard-container">
        <DashboardStatsGrid orderCount={orderCount} />
        <div className="row-container">
          <UserRecentOrders setOrderCount={setOrderCount} />
        </div>
        
      </div>
    );
  }
  