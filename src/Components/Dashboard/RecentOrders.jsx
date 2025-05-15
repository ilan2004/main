import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
} from '@mui/x-data-grid';
import { 
  getFirestore, 
  collection, 
  getDocs, 
  query, 
  where, 
  doc, 
  runTransaction, 
  Timestamp, 
  addDoc 
} from 'firebase/firestore';
import { useSnackbar } from 'notistack';
import { useAuth } from '../../Contexts/AuthContext';
import { Chip, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import AddRecordForm from './AddRecordForm';

const CombinedToolbar = ({ searchQuery, setSearchQuery, setOpenAddDialog }) => {
  return (
    <GridToolbarContainer>
      {/* Add Record Button */}
      <Button
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => setOpenAddDialog(true)}
        sx={{ marginRight: 'auto' }} // Push to the left
      >
        Add Record
      </Button>

      {/* Search Box */}
      <Box sx={{ display: 'flex', alignItems: 'center', width: '300px' }}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Search across all fields..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </GridToolbarContainer>
  );
};

export default function UserRecentOrders({ setOrderCount }) {
  const [orderData, setOrderData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [openAddDialog, setOpenAddDialog] = useState(false);

  const firestore = getFirestore();
  const { enqueueSnackbar } = useSnackbar();
  const { currentUser } = useAuth();

  const showSnackbar = (message, variant) => {
    enqueueSnackbar(message, { variant });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        if (currentUser) {
          const formDataCollection = collection(firestore, 'formData');
          const userFormDataQuery = query(formDataCollection, where("userId", "==", currentUser.uid));
          const querySnapshot = await getDocs(userFormDataQuery);
          const orders = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            serial: doc.data().serial || 'N/A' // Use 'N/A' if serial is not present
          }));
          setOrderData(orders);
          setFilteredData(orders);
          setOrderCount(orders.length);
          showSnackbar('Orders loaded successfully', 'success');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        showSnackbar('Failed to load orders', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [currentUser, setOrderCount, firestore]);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredData(orderData);
    } else {
      const filtered = orderData.filter(order => 
        Object.values(order).some(value => 
          value && value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setFilteredData(filtered);
    }
  }, [searchQuery, orderData]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Placed': return 'warning';
      case 'Processing': return 'info';
      case 'Completed': return 'success';
      case 'Cancelled': return 'error';
      default: return 'default';
    }
  };
  
  const StatusCell = ({ value }) => (
    <Chip
      label={value}
      color={getStatusColor(value)}
      size="small"
      variant="outlined"
    />
  );

  const columns = [
    { field: 'serial', headerName: 'Serial', width: 100, editable: false },
    { field: 'product', headerName: 'Product', width: 120, editable: false },
    { field: 'SerialNumber', headerName: 'Serial Number', width: 150, editable: false },
    { field: 'Brand', headerName: 'Brand', width: 120, editable: false },
    { field: 'VehicleModel', headerName: 'Vehicle Model', width: 150, editable: false },
    { field: 'chassisNumber', headerName: 'Chassis Number', width: 180, editable: false },
    { field: 'BatteryVoltage', headerName: 'Battery Voltage', width: 150, editable: false },
    { field: 'BatteryCurrent', headerName: 'Battery Current', width: 150, editable: false },
    {
      field: 'orderStatus',
      headerName: 'Order Status',
      width: 140,
      renderCell: (params) => <StatusCell value={params.value} />,
    },
    { field: 'submissionDate', headerName: 'Submission Date', width: 150, editable: false },
    { field: 'submissionTime', headerName: 'Submission Time', width: 150, editable: false },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleAddRecord = async (formData) => {
    try {
      const serialRef = doc(firestore, 'counters', 'serialCounter');
      const newSerial = await runTransaction(firestore, async (transaction) => {
        const serialDoc = await transaction.get(serialRef);
        const newSerial = (serialDoc.exists() ? serialDoc.data().value : 1000) + 1;
        transaction.set(serialRef, { value: newSerial });
        return newSerial;
      });
  
      const dataToAdd = {
        ...formData,
        serial: newSerial,
        deliveryDate: formData.deliveryDate ? Timestamp.fromDate(new Date(formData.deliveryDate)) : null,
        postedBy: currentUser.displayName,
        orderStatus: 'Placed',
        submissionDate: formData.submissionDate,
        submissionTime: formData.submissionTime,
        userId: currentUser.uid
      };
      
      const docRef = await addDoc(collection(firestore, 'formData'), dataToAdd);
  
      const newOrder = {
        id: docRef.id,
        ...dataToAdd,
        deliveryDate: dataToAdd.deliveryDate ? dataToAdd.deliveryDate.toDate() : null
      };
  
      // Update local state with new order
      setOrderData(prevData => [...prevData, newOrder]);
      setFilteredData(prevData => [...prevData, newOrder]);
      setOrderCount(prevCount => prevCount + 1);
      
      showSnackbar('Record added successfully', 'success');
      setOpenAddDialog(false);
    } catch (error) {
      console.error('Failed to add record:', error);
      showSnackbar('Failed to add record', 'error');
    }
  };

  const checkSerialNumber = async (serialNumber) => {
    try {
      const q = query(
        collection(firestore, 'formData'), 
        where('SerialNumber', '==', serialNumber)
      );
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    } catch (error) {
      console.error('Error checking serial number:', error);
      showSnackbar('Error checking serial number', 'error');
      return false;
    }
  };

  return (
    <Box sx={{ height: '70vh', width: '90vw', overflow: 'hidden', p: 2 }}>
      <AddRecordForm 
        open={openAddDialog} 
        handleClose={() => setOpenAddDialog(false)} 
        handleSubmit={handleAddRecord}  
        checkSerialNumber={checkSerialNumber}
      />
      <h2>Your Recent Orders</h2>
      <Box sx={{ height: '100%', width: '100%', overflow: 'auto' }}>
        <DataGrid
          rows={filteredData}
          columns={columns}
          editMode="row"
          slots={{
            toolbar: CombinedToolbar,
          }}
          slotProps={{
            toolbar: { 
              searchQuery, 
              setSearchQuery, 
              setOpenAddDialog 
            },
          }}
        />
      </Box>
    </Box>
  );
}