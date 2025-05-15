import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { useAuth } from '../../../Contexts/AuthContext';
import { 
    getFirestore, 
    doc, 
    getDoc, 
    collection, 
    query, 
    where,
    getDocs,
    addDoc
  } from 'firebase/firestore';
import { 
  TextField, 
  Button, 
  Container, 
  Grid, 
  Typography, 
  Snackbar,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MuiAlert from '@mui/material/Alert';
import SubmittedDataTable from './Submitteddatatable';

const theme = createTheme({
  palette: {
    primary: {
      main: '#117865',
    },
  },
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const removeUndefinedValues = (obj) => {
    return Object.fromEntries(
      Object.entries(obj).filter(([_, v]) => v != null && v !== '')
    );
  };
const Form = () => {
  const { currentUser } = useAuth();
  const [companyName, setCompanyName] = useState('');
  const [formData, setFormData] = useState({
    Brand: '',
    VehicleModel: '',
    ChassisNumber: '',
    product: '',
    SerialNumber: '',
    ServiceNumber: '',
    BatteryVoltage: '',
    BatteryCurrent: '',
    contactMobile: '',
    Repair: '',
    comment: '',
    companyName: '',
    VehiclekiloMeters: ''
  });
  const [submittedData, setSubmittedData] = useState(null);
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const BrandOptions = ['Hero Electric', 'Joy E-Bike', 'Komaki'];
  const productOptions = ['Battery', 'Charger', 'Motor', 'Controller'];
  const [userDisplayName, setUserDisplayName] = useState('');

  useEffect(() => {
    if (currentUser) {
      fetchUserData(currentUser.uid);
    }
  }, [currentUser]);

  async function fetchUserData(userId) {
    try {
      const db = getFirestore();
      const userRef = doc(db, 'users', userId);
      const userSnapshot = await getDoc(userRef);
      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        setCompanyName(userData.companyName || '');
        setUserDisplayName(userData.displayName || '');
        setFormData(prevData => ({
          ...prevData,
          companyName: userData.companyName || ''
        }));
      } else {
        console.log("User document does not exist");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const now = new Date();
    const submissionDate = now.toLocaleDateString();
    const submissionTime = now.toLocaleTimeString();
  
    const firestore = getFirestore();
    const userQuery = query(collection(firestore, 'users'), where('email', '==', currentUser.email));
    const userSnapshot = await getDocs(userQuery);
    let postedByDisplayName = currentUser.email;
    if (!userSnapshot.empty) {
      postedByDisplayName = userSnapshot.docs[0].data().displayName || currentUser.email;
    }
  
    let dataToSubmit = {
      ...formData,
      submissionDate,
      submissionTime,
      companyName,
      postedBy: postedByDisplayName,
      Dealer: '',
      InvoiceNo: '',
      Amount: '',
      Payment: '',
      DeliveryDate: '',
      agent: '',
    };
  
    dataToSubmit = removeUndefinedValues(dataToSubmit);
  
    try {
      const docRef = await addDoc(collection(firestore, 'submissions'), dataToSubmit);
      console.log("Document written with ID: ", docRef.id);
      setSubmittedData(dataToSubmit);
      setSnackbar({
        open: true,
        message: 'Form written successfully scroll down ',
        severity: 'warning'    
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      setSnackbar({
        open: true,
        message: 'Error submitting form. Please try again.',
        severity: 'error'
      });
    }
  
    setSubmittedData({
      ...formData,
      submissionDate,
      submissionTime,
      companyName,
      postedBy: postedByDisplayName,
    });
  
    setFormData(prevData => ({
      ...prevData,
      Brand: '',
      VehicleModel: '',
      ChassisNumber: '',
      product: '',
      SerialNumber: '',
      ServiceNumber: '',
      BatteryVoltage: '',
      BatteryCurrent: '',
      contactMobile: '',
      Repair: '',
      comment: '',
      VehiclekiloMeters: '',
      Dealer: '',
      InvoiceNo: '',
      Amount: '',
      Payment: '',
      DeliveryDate: '',
      agent: ''
    }));
  };

  const toggleAdditionalFields = () => {
    setShowAdditionalFields(!showAdditionalFields);
    setSnackbar({
      open: true,
      message: showAdditionalFields ? 'Extended Warranty FIELDS OFF!' : 'Extended Warranty FIELDS ON!',
      severity: showAdditionalFields ? 'warning' : 'success'
    });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Typography variant="h4" align="center" gutterBottom>
          SERVICE/REPAIR FORM
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Button 
              variant="contained" 
              color="primary" 
              fullWidth
            >
              SERVICE/REPAIR
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button 
              variant="contained" 
              color="primary" 
              fullWidth
              onClick={toggleAdditionalFields}
            >
              Extended Warranty
            </Button>
          </Grid>
        </Grid>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} style={{ marginTop: '20px' }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="companyName"
                label="Company Name"
                value={formData.companyName}
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Brand</InputLabel>
                <Select
                  name="Brand"
                  value={formData.Brand}
                  onChange={handleChange}
                  label="Brand"
                >
                  {BrandOptions.map((option) => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="VehicleModel"
                label="Vehicle Model"
                value={formData.VehicleModel}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="ChassisNumber"
                label="Chassis Number/ Motor Number"
                value={formData.ChassisNumber}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Product</InputLabel>
                <Select
                  name="product"
                  value={formData.product}
                  onChange={handleChange}
                  label="Product"
                >
                  {productOptions.map((option) => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="SerialNumber"
                label="Serial Number"
                value={formData.SerialNumber}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="BatteryVoltage"
                label="Battery Voltage"
                type="number"
                value={formData.BatteryVoltage}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="BatteryCurrent"
                label="Battery Current"
                type="number"
                value={formData.BatteryCurrent}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="contactMobile"
                label="Contact Mobile"
                type="number"
                value={formData.contactMobile}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            {showAdditionalFields && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="VehiclekiloMeters"
                  label="Vehicle kiloMeters"
                  value={formData.VehiclekiloMeters}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
                          )}
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="comment"
                label="Comment"
                multiline
                rows={4}
                value={formData.comment}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                SUBMIT
              </Button>
            </Grid>
          </Grid>
        </form>
        
        {submittedData && (
          <SubmittedDataTable 
            submittedData={submittedData} 
            currentUser={currentUser}
          />
        )}
        
        <Snackbar 
          open={snackbar.open} 
          autoHideDuration={6000} 
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}

export default Form;