import React, { useState } from 'react';
import RecentOrders from '../Components/Dashboard/RecentOrders'
import './Dashboard.css'
import DashboardStatsGrid from '../Components/Dashboard/DashboardStatsGrid';

export default function Dashboard() {
    const [orderCount, setOrderCount] = useState(0);
  
    return (
      <div className="dashboard-container">
        <DashboardStatsGrid orderCount={orderCount} />
        <div className="row-container">
          <RecentOrders setOrderCount={setOrderCount} />
        </div>
      </div>
    );
  }
  