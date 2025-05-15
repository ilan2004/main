import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField, 
  MenuItem, 
  Button,
  DialogContentText
} from '@mui/material';

// Utility function to format date to dd/mm/yyyy
const formatDateToDisplay = (dateStr) => {
  if (!dateStr) return '';
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return '';
    
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};

// Utility function to convert dd/mm/yyyy to ISO string for submission
const formatDateForSubmission = (dateStr) => {
  if (!dateStr) return '';
  try {
    if (dateStr.includes('/')) {
      const [day, month, year] = dateStr.split('/');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    return dateStr;
  } catch (error) {
    console.error('Error formatting date for submission:', error);
    return '';
  }
};

function AddRecordForm({ open, handleClose, handleSubmit, checkSerialNumber }) {
  const [formData, setFormData] = useState({
    Brand: '',
    SerialNumber: '',
    VehicleModel: '',
    ChassisNumber: '',
    ServiceNumber: '',
    BatteryVoltage: '',
    BatteryCurrent: '',
    ContactMobile: '',
    Comment: '',
    Dealer: '',
    InvoiceNo: '',
    Amount: '',
    Payment: '',
    deliveryDate: '',
    agent: '',
    product: '',
    submissionDate: '',
    submissionTime: '',
  });

  const [showDuplicateDialog, setShowDuplicateDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [displayDates, setDisplayDates] = useState({
    deliveryDate: '',
    submissionDate: ''
  });

  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = formatDateToDisplay(currentDate.toISOString());
    
    setFormData(prevData => ({
      ...prevData,
      submissionDate: currentDate.toISOString().split('T')[0],
      submissionTime: currentDate.toTimeString().split(' ')[0].slice(0, 5),
    }));
    
    setDisplayDates(prevDates => ({
      ...prevDates,
      submissionDate: formattedDate
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Special handling for date fields
    if (name === 'deliveryDate' || name === 'submissionDate') {
      // If the input is in yyyy-mm-dd format (from date picker)
      if (value.includes('-')) {
        const dateObj = new Date(value);
        const formattedDisplayDate = formatDateToDisplay(dateObj);
        
        setDisplayDates(prevDates => ({
          ...prevDates,
          [name]: formattedDisplayDate
        }));
        
        setFormData(prevData => ({
          ...prevData,
          [name]: value // Keep ISO format in formData
        }));
      }
      // If the input is in dd/mm/yyyy format (manual input)
      else if (value.includes('/')) {
        setDisplayDates(prevDates => ({
          ...prevDates,
          [name]: value
        }));
        
        const isoDate = formatDateForSubmission(value);
        setFormData(prevData => ({
          ...prevData,
          [name]: isoDate
        }));
      }
      return;
    }

    // Handle other form fields normally
    setFormData((prevData) => {
      const newData = { 
        ...prevData, 
        [name]: value
      };

      if (name === 'SerialNumber') {
        if (value.startsWith('HE5')) {
          newData.BatteryVoltage = '51';
          newData.BatteryCurrent = '30';
        } else if (value.startsWith('HE7')) {
          newData.BatteryVoltage = '72';
          newData.BatteryCurrent = '26';
        } else {
          if (prevData.BatteryVoltage === '51' || prevData.BatteryVoltage === '72') {
            newData.BatteryVoltage = '';
          }
          if (prevData.BatteryCurrent === '30' || prevData.BatteryCurrent === '26') {
            newData.BatteryCurrent = '';
          }
        }
      }
      return newData;
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const exists = await checkSerialNumber(formData.SerialNumber);
      if (exists) {
        setShowDuplicateDialog(true);
      } else {
        // Format dates before submission
        const submissionData = {
          ...formData,
          deliveryDate: formData.deliveryDate ? new Date(formData.deliveryDate).toISOString() : '',
          submissionDate: formData.submissionDate ? new Date(formData.submissionDate).toISOString() : ''
        };
        handleSubmit(submissionData);
        handleClose();
      }
    } catch (error) {
      console.error('Error checking serial number:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmedSubmit = () => {
    setShowDuplicateDialog(false);
    const submissionData = {
      ...formData,
      deliveryDate: formData.deliveryDate ? new Date(formData.deliveryDate).toISOString() : '',
      submissionDate: formData.submissionDate ? new Date(formData.submissionDate).toISOString() : ''
    };
    handleSubmit(submissionData);
    handleClose();
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Record</DialogTitle>
        <DialogContent>
          <form onSubmit={handleFormSubmit}>
            <TextField
              select
              fullWidth
              margin="normal"
              name="Brand"
              label="Brand"
              value={formData.Brand}
              onChange={handleChange}
            >
              <MenuItem value="HeroElectric">Hero Electric</MenuItem>
              <MenuItem value="JoyEBike">Joy E-Bike</MenuItem>
              <MenuItem value="Komaki">Komaki</MenuItem>
              <MenuItem value="PURE-EV">PURE-EV</MenuItem>
              <MenuItem value="OKINAWA">OKINAWA</MenuItem>
              <MenuItem value="3- Wheeler">3- Wheeler</MenuItem>
              <MenuItem value="Others">Others</MenuItem>
            </TextField>
            <TextField
              select
              fullWidth
              margin="normal"
              name="agent"
              label="agent"
              value={formData.agent}
              onChange={handleChange}
            >
              <MenuItem value="Kochi">Kochi</MenuItem>
              <MenuItem value="Bangalore">Bangalore</MenuItem>
              <MenuItem value="JoyEBike">Calicut</MenuItem>
              <MenuItem value="thrissur">Thrissur</MenuItem>
              <MenuItem value="trivandrum">Trivandrum</MenuItem>
              
            </TextField>
            <TextField
              select
              fullWidth
              margin="normal"
              name="product"
              label="Product"
              value={formData.product}
              onChange={handleChange}
            >
              <MenuItem value="Battery">Battery</MenuItem>
              <MenuItem value="Charger">Charger</MenuItem>
              <MenuItem value="Motor">Motor</MenuItem>
              <MenuItem value="Controller">Controller</MenuItem>
            </TextField>
            <TextField 
              fullWidth 
              margin="normal" 
              name="SerialNumber" 
              label="Serial No." 
              value={formData.SerialNumber} 
              onChange={handleChange} 
            />
            <TextField fullWidth margin="normal" name="VehicleModel" label="Vehicle Model" value={formData.VehicleModel} onChange={handleChange} />
           
            <TextField 
              fullWidth 
              margin="normal" 
              name="BatteryVoltage" 
              label="Battery Voltage" 
              value={formData.BatteryVoltage} 
              onChange={handleChange}
            />
            <TextField 
              fullWidth 
              margin="normal" 
              name="BatteryCurrent" 
              label="Battery Current" 
              value={formData.BatteryCurrent} 
              onChange={handleChange}
            />
            <TextField fullWidth margin="normal" name="ContactMobile" label="Contact Mobile" value={formData.ContactMobile} onChange={handleChange} />
            <TextField fullWidth margin="normal" name="Comment" label="Comment" value={formData.Comment} onChange={handleChange} multiline rows={3} />
            <TextField fullWidth margin="normal" name="ChassisNumber" label="Chassis Number" value={formData.ChassisNumber} onChange={handleChange} />
            <TextField fullWidth margin="normal" name="ServiceNumber" label="Service Number" value={formData.ServiceNumber} onChange={handleChange} />
            <TextField fullWidth margin="normal" name="Dealer" label="Dealer" value={formData.Dealer} onChange={handleChange} />
            <TextField fullWidth margin="normal" name="InvoiceNo" label="Invoice No" value={formData.InvoiceNo} onChange={handleChange} />
            <TextField fullWidth margin="normal" name="Amount" label="Amount" value={formData.Amount} onChange={handleChange} type="number" />
            <TextField
              select
              fullWidth
              margin="normal"
              name="Payment"
              label="Payment"
              value={formData.Payment}
              onChange={handleChange}
            >
              <MenuItem value="PAID">PAID</MenuItem>
              <MenuItem value="NOTPAID">NOT PAID</MenuItem>
              <MenuItem value="WRETURN">W. RETURN</MenuItem>
            </TextField>
            <TextField
              fullWidth
              margin="normal"
              name="deliveryDate"
              label="Delivery Date"
              onChange={handleChange}
              type="text"
              placeholder="DD/MM/YYYY"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              margin="normal"
              name="submissionDate"
              label="Submission Date"
              value={displayDates.submissionDate || formData.submissionDate}
              onChange={handleChange}
              type="text"
              placeholder="DD/MM/YYYY"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              margin="normal"
              name="submissionTime"
              label="Submission Time"
              type="time"
              value={formData.submissionTime}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button 
            onClick={handleFormSubmit} 
            variant="contained" 
            color="primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Checking...' : 'Submit'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={showDuplicateDialog}
        onClose={() => setShowDuplicateDialog(false)}
      >
        <DialogTitle>Duplicate Serial Number</DialogTitle>
        <DialogContent>
          <DialogContentText>
            An order with serial number {formData.SerialNumber} already exists. 
            Are you sure you want to create another record with this serial number?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDuplicateDialog(false)} color="primary">
            No, Cancel
          </Button>
          <Button onClick={handleConfirmedSubmit} color="primary" variant="contained">
            Yes, Create Record
          </Button>
        </DialogActions> 
      </Dialog>
    </>
  );
}

export default AddRecordForm;