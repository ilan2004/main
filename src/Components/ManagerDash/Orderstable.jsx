import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
} from '@mui/x-data-grid';
import { getFirestore, collection, getDocs, query, where, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useSnackbar } from 'notistack';
import { useAuth } from '../../Contexts/AuthContext';
import { Chip, TextField, IconButton , InputAdornment } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

const SearchToolbar = ({ searchQuery, setSearchQuery }) => {
  return (
    <GridToolbarContainer>
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

export default function ManagerRecentOrders({ setOrderCount }) {
  const [orderData, setOrderData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [rowModesModel, setRowModesModel] = useState({});
  const [companyName, setCompanyName] = useState('');
  const firestore = getFirestore();
  const { enqueueSnackbar } = useSnackbar();
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (currentUser) {
          const userDoc = doc(firestore, 'users', currentUser.uid);
          const userSnapshot = await getDoc(userDoc);
          
          if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            const companyName = userData.companyName || '';
            setCompanyName(companyName);
    
            if (companyName) {
              const companyOrdersQuery = query(collection(firestore, 'formData'), where("companyName", "==", companyName));
              const orderSnapshot = await getDocs(companyOrdersQuery);
              const orders = orderSnapshot.docs.map((doc, index) => ({
                id: doc.id,
                serial: index + 1, // Changed from serialNumber to serial
                ...doc.data()
              }));
    
              setOrderData(orders);
              setFilteredData(orders);
              setOrderCount(orders.length);
              enqueueSnackbar('Orders loaded successfully', { variant: 'success' });
            } else {
              throw new Error('Company name not found for the current user');
            }
          } else {
            throw new Error('User document not found in Firestore');
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        enqueueSnackbar('Failed to load orders', { variant: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUser, setOrderCount, firestore, enqueueSnackbar]);

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

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const processRowUpdate = async (newRow) => {
    try {
      const updatedRow = { ...newRow, isNew: false };
      const orderRef = doc(firestore, 'formData', newRow.id);
      await updateDoc(orderRef, updatedRow);
      
      setOrderData(prevData => 
        prevData.map(order => order.id === newRow.id ? updatedRow : order)
      );
      setFilteredData(prevData => 
        prevData.map(order => order.id === newRow.id ? updatedRow : order)
      );
      
      enqueueSnackbar('Order updated successfully', { variant: 'success' });
      return updatedRow;
    } catch (error) {
      console.error('Error updating order:', error);
      enqueueSnackbar('Failed to update order', { variant: 'error' });
      throw error;
    }
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

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
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
  
        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{ color: 'primary.main' }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }
  
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
        ];
      },
    },
    { field: 'serial', headerName: 'Serial', width: 100, editable: false }, // Changed from serialNumber to serial
    { field: 'product', headerName: 'Product', width: 120, editable: true },
    { field: 'Brand', headerName: 'Brand', width: 120, editable: true },
    { field: 'VehicleModel', headerName: 'Vehicle Model', width: 150, editable: true },
    { field: 'ChassisNumber', headerName: 'Chassis Number', width: 180, editable: true },
    { field: 'BatteryVoltage', headerName: 'Battery Voltage', width: 150, editable: true },
    { field: 'BatteryCurrent', headerName: 'Battery Current', width: 150, editable: true },
    {
      field: 'orderStatus',
      headerName: 'Order Status',
      width: 140,
      type: 'singleSelect',
      valueOptions: ['placed', 'processing', 'completed', 'cancelled'],
      renderCell: (params) => <StatusCell value={params.value} />,
    },
    { field: 'date', headerName: 'Submission Date', width: 150, editable: false },
    { field: 'time', headerName: 'Submission Time', width: 150, editable: false },
    { field: 'postedBy', headerName: 'Posted By', width: 150, editable: false },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ height: '70vh', width: '87vw', overflow: 'hidden', p: 2 }}>
      <h2>Recent Orders for {companyName}</h2>
      <Box sx={{ height: '100%', width: '100%', overflow: 'auto' }}>
        <DataGrid
          rows={filteredData}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          processRowUpdate={processRowUpdate}
          slots={{
            toolbar: SearchToolbar,
          }}
          slotProps={{
            toolbar: { searchQuery, setSearchQuery },
          }}
        />
      </Box>
    </Box>
  );
}