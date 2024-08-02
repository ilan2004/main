import React, { useState } from 'react';
import ManagerRecentOrders from '../../Components/ManagerDash/RecentOrders';
import './ManageDashboard.css'
import ManagerDashboardStatsGrid from '../../Components/ManagerDash/DashboardStatsGrid';

export default function ManageDashboard() {
    const [orderCount, setOrderCount] = useState(0);
  
    return (
      <div className="dashboard-container">
        <ManagerDashboardStatsGrid orderCount={orderCount} />
        <div className="row-container">
          <ManagerRecentOrders setOrderCount={setOrderCount} />
        </div>
      </div>
    );
  }
  