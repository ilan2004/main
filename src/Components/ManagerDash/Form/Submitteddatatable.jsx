import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Button,
  Grid,
  Typography
} from '@mui/material';
import { getFirestore, addDoc, collection, runTransaction, doc } from 'firebase/firestore';
import emailjs from '@emailjs/browser';
import { Snackbar, Alert } from '@mui/material';
const SubmittedDataTable = ({ submittedData, currentUser }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [year, setYear] = useState(null);
    const [snackbar, setSnackbar] = useState({
      open: false,
      message: '',
      severity: 'info'
    });

  const handleFormSubmit = async () => {
    try {
      setIsSubmitting(true);
      const db = getFirestore();

      // Generate new serial number
      const serialRef = doc(db, 'counters', 'serialCounter');
      const newSerial = await runTransaction(db, async (transaction) => {
        const serialDoc = await transaction.get(serialRef);
        const newSerial = (serialDoc.exists() ? serialDoc.data().value : 1000) + 1;
        transaction.set(serialRef, { value: newSerial });
        return newSerial;
      });

      const formDataToSubmit = {
        ...submittedData,
        userId: currentUser.uid,
        orderStatus: 'Placed',
        serial: newSerial
      };

      await addDoc(collection(db, "formData"), formDataToSubmit);

      const templateParams = {
        ...formDataToSubmit,
        userEmail: currentUser.email,
      };

      await emailjs.send('service_6fw3qz4', 'template_zevj6nm', templateParams, {
        publicKey: 'Qbcmn6dU4S2rOSw6O',
      });

      setSnackbar({
        open: true,
        message: 'Form submitted successfully!',
        severity: 'success'
      });
    } catch (error) {
      console.error("Error submitting form data:", error);
      setSnackbar({
        open: true,
        message: 'Error submitting form. Please try again.',
        severity: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleYearClick = (selectedYear) => {
    setYear(selectedYear);
    setSnackbar({
      open: true,
      message: `Year ${selectedYear} selected`,
      severity: 'info'
    });
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };
  return (
    <>
    <TableContainer component={Paper} style={{ marginTop: '20px' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Field</TableCell>
            <TableCell>Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(submittedData).map(([key, value]) => (
            <TableRow key={key}>
              <TableCell component="th" scope="row">
                {key}
              </TableCell>
              <TableCell>{value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button
        variant="contained"
        color="primary"
        onClick={handleFormSubmit}
        disabled={isSubmitting}
        style={{ margin: '20px' }}
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </Button>
      <Grid container spacing={2} style={{ padding: '20px' }}>
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => handleYearClick('2 Years')}
          >
            2 Years E.Warranty
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => handleYearClick('5 Years')}
          >
            5 Years E.Warranty
          </Button>
        </Grid>
      </Grid>
      <Typography variant="h6" align="center" style={{ margin: '20px' }}>
        Cost of {year} Warranty will be ------
      </Typography>
    </TableContainer>
      <Snackbar 
      open={snackbar.open} 
      autoHideDuration={6000} 
      onClose={handleSnackbarClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
        {snackbar.message}
      </Alert>
    </Snackbar>
  </>
  );
}

export default SubmittedDataTable;