import React, { useState } from 'react';
import { 
  doc, 
  runTransaction, 
  Timestamp, 
  addDoc, 
  collection, 
  getDocs, 
  query, 
  where 
} from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { useAuth } from '../Contexts/AuthContext'; // Assuming you have an auth context
import { useSnackbar } from 'notistack'; // For showing notifications

import UserRecentOrders from '../Components/Dashboard/RecentOrders';
import './Dashboard.css';
import DashboardStatsGrid from '../Components/Dashboard/DashboardStatsGrid';


export default function Dashboard() {
    const [orderCount, setOrderCount] = useState(0);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    
    const firestore = getFirestore();
    const { currentUser } = useAuth();
    const { enqueueSnackbar } = useSnackbar();

    const showSnackbar = (message, variant) => {
      enqueueSnackbar(message, { variant });
    };

  

    return (
      <div className="dashboard-container">
        <DashboardStatsGrid orderCount={orderCount} />
        <div className="row-container">

          <UserRecentOrders 
            setOrderCount={setOrderCount}
            onAddNewRecord={() => setOpenAddDialog(true)} // Optional: add a way to open the add record dialog
          />
        </div>
      </div>
    );
  }