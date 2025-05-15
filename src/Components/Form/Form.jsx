// import React, { useState, useEffect } from 'react';
// import { getAuth } from 'firebase/auth';
// import { useAuth } from '../../Contexts/AuthContext';
// import { 
//   getFirestore, 
//   doc, 
//   getDoc, 
//   addDoc, 
//   collection, 
//   runTransaction, 
//   query, 
//   where 
// } from 'firebase/firestore';
// import emailjs from '@emailjs/browser';
// import { 
//   TextField, 
//   Button, 
//   Container, 
//   Grid, 
//   Typography, 
//   Table, 
//   TableBody, 
//   TableCell, 
//   TableContainer, 
//   TableHead, 
//   TableRow, 
//   Paper,
//   Snackbar,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel
// } from '@mui/material';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import MuiAlert from '@mui/material/Alert';

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#117865',
//     },
//   },
// });

// const Alert = React.forwardRef(function Alert(props, ref) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

// const SnackForm = ({ userId }) => {
//   const { currentUser } = useAuth();
//   const [companyName, setCompanyName] = useState('');
//   const [formData, setFormData] = useState({
//     Brand: '',
//     VehicleModel: '',
//     ChassisNumber: '',
//     product: '',
//     SerialNumber: '',
//     ServiceNumber: '',
//     BatteryVoltage: '',
//     BatteryCurrent: '',
//     contactMobile: '',
//     Repair: '',
//     comment: '',
//     companyName: '',
//     VehiclekiloMeters: ''
//   });
//   const [submittedData, setSubmittedData] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [userLocation, setUserLocation] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showAdditionalFields, setShowAdditionalFields] = useState(false);
//   const [year, setYear] = useState('');
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: '',
//     severity: 'success'
//   });

//   const BrandOptions = ['Hero Electric', 'Joy E-Bike', 'Komaki'];
//   const productOptions = ['Battery', 'Charger', 'Motor', 'Controller'];
//   const [userDisplayName, setUserDisplayName] = useState('');

//   useEffect(() => {
//     if (currentUser) {
//       fetchUserData(currentUser.uid);
//     }
//   }, [currentUser]);

//   async function fetchUserData(userId) {
//     try {
//       const db = getFirestore();
//       const userRef = doc(db, 'users', userId);
//       const userSnapshot = await getDoc(userRef);
//       if (userSnapshot.exists()) {
//         const userData = userSnapshot.data();
//         setCompanyName(userData.companyName || '');
//         setUserDisplayName(userData.displayName || '');
//         setFormData(prevData => ({
//           ...prevData,
//           companyName: userData.companyName || ''
//         }));
//       } else {
//         console.log("User document does not exist");
//       }
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//     } finally {
//       setLoading(false);
//     }
//   }
//   let postedByDisplayName = currentUser.email;
//   if (!userSnapshot.empty) {
//     postedByDisplayName = userSnapshot.docs[0].data().displayName || currentUser.email;
//   }
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const now = new Date();
//     const date = now.toLocaleDateString();
//     const time = now.toLocaleTimeString();
    
//     setSubmittedData({
//       ...formData,
//       date,
//       time,
//       companyName,
//       postedBy: postedByDisplayName,

//     });
  
//     setFormData(prevData => ({
//       ...prevData,
//       Brand: '',
//     VehicleModel: '',
//     ChassisNumber: '',
//     product: '',
//     SerialNumber: '',
//     ServiceNumber: '',
//     BatteryVoltage: '',
//     BatteryCurrent: '',
//     contactMobile: '',
//     Repair: '',
//     comment: '',
//     companyName: '',
//     VehiclekiloMeters: ''
//     }));
//   };
  
//   const handleFormSubmit = async () => {
//     try {
//       setIsSubmitting(true);
//       const userQuery = query(collection(firestore, 'users'), where('email', '==', currentUser.email));
//       const userSnapshot = await getDocs(userQuery);
//       const auth = getAuth();
//       const user = auth.currentUser;
  
//       if (!user) {
//         throw new Error("User not authenticated");
//       }
  
//       const db = getFirestore();
//       let postedByDisplayName = currentUser.email;
//       if (!userSnapshot.empty) {
//         postedByDisplayName = userSnapshot.docs[0].data().displayName || currentUser.email;
//       }
//       // Generate new serial number
//       const serialRef = doc(db, 'counters', 'serialCounter');
//       const newSerial = await runTransaction(db, async (transaction) => {
//         const serialDoc = await transaction.get(serialRef);
//         const newSerial = (serialDoc.exists() ? serialDoc.data().value : 1000) + 1;
//         transaction.set(serialRef, { value: newSerial });
//         return newSerial;
//       });

//       const formDataToSubmit = {
//         ...submittedData,
//         userId: user.uid,
//         postedBy: postedByDisplayName,
//         orderStatus: 'Placed',
//         serial: newSerial
//       };
  
//       await addDoc(collection(db, "formData"), formDataToSubmit);
  
//       const templateParams = {
//         ...formDataToSubmit,
//         userEmail: user.email,
//       };
  
//       await emailjs.send('service_6fw3qz4', 'template_zevj6nm', templateParams, {
//         publicKey: 'Qbcmn6dU4S2rOSw6O',
//       });
  
//       setSnackbar({
//         open: true,
//         message: 'Submitted successfully!',
//         severity: 'success'
//       });
//     } catch (error) {
//       console.error("Error submitting form data:", error);
//       setSnackbar({
//         open: true,
//         message: 'Error submitting form data. Please try again.',
//         severity: 'error'
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const toggleAdditionalFields = () => {
//     setShowAdditionalFields(!showAdditionalFields);
//     setSnackbar({
//       open: true,
//       message: showAdditionalFields ? 'Extended Warranty FIELDS OFF!' : 'Extended Warranty FIELDS ON!',
//       severity: showAdditionalFields ? 'warning' : 'success'
//     });
//   };

//   const handleYearClick = (selectedYear) => {
//     setYear(selectedYear);
//   };

//   const handleCloseSnackbar = (event, reason) => {
//     if (reason === 'clickaway') {
//       return;
//     }
//     setSnackbar({ ...snackbar, open: false });
//   };

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData(prevData => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Container maxWidth="md">
//         <Typography variant="h4" align="center" gutterBottom>
//           SERVICE/REPAIR FORM
//         </Typography>
//         <Grid container spacing={2}>
//           <Grid item xs={12} sm={6}>
//             <Button 
//               variant="contained" 
//               color="primary" 
//               fullWidth
//             >
//               SERVICE/REPAIR
//             </Button>
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <Button 
//               variant="contained" 
//               color="primary" 
//               fullWidth
//               onClick={toggleAdditionalFields}
//             >
//               Extended Warranty
//             </Button>
//           </Grid>
//         </Grid>
//         <form onSubmit={handleSubmit}>
//           <Grid container spacing={2} style={{ marginTop: '20px' }}>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 name="companyName"
//                 label="Company Name"
//                 value={formData.companyName}
//                 InputProps={{
//                   readOnly: true,
//                 }}
//                 variant="outlined"
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <FormControl fullWidth variant="outlined">
//                 <InputLabel>Brand</InputLabel>
//                 <Select
//                   name="Brand"
//                   value={formData.Brand}
//                   onChange={handleChange}
//                   label="Brand"
//                 >
//                   {BrandOptions.map((option) => (
//                     <MenuItem key={option} value={option}>{option}</MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 name="VehicleModel"
//                 label="Vehicle Model"
//                 value={formData.VehicleModel}
//                 onChange={handleChange}
//                 variant="outlined"
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 name="ChassisNumber"
//                 label="Chassis Number/ Motor Number"
//                 value={formData.ChassisNumber}
//                 onChange={handleChange}
//                 variant="outlined"
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <FormControl fullWidth variant="outlined">
//                 <InputLabel>Product</InputLabel>
//                 <Select
//                   name="product"
//                   value={formData.product}
//                   onChange={handleChange}
//                   label="Product"
//                 >
//                   {productOptions.map((option) => (
//                     <MenuItem key={option} value={option}>{option}</MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 name="SerialNumber"
//                 label="Serial Number"
//                 value={formData.SerialNumber}
//                 onChange={handleChange}
//                 variant="outlined"
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 name="BatteryVoltage"
//                 label="Battery Voltage"
//                 type="number"
//                 value={formData.BatteryVoltage}
//                 onChange={handleChange}
//                 variant="outlined"
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 name="BatteryCurrent"
//                 label="Battery Current"
//                 type="number"
//                 value={formData.BatteryCurrent}
//                 onChange={handleChange}
//                 variant="outlined"
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 name="contactMobile"
//                 label="Contact Mobile"
//                 type="number"
//                 value={formData.contactMobile}
//                 onChange={handleChange}
//                 variant="outlined"
//               />
//             </Grid>
//             {showAdditionalFields && (
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   name="VehiclekiloMeters"
//                   label="Vehicle kiloMeters"
//                   value={formData.VehiclekiloMeters}
//                   onChange={handleChange}
//                   variant="outlined"
//                 />
//               </Grid>
//             )}
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 name="comment"
//                 label="Comment"
//                 multiline
//                 rows={4}
//                 value={formData.comment}
//                 onChange={handleChange}
//                 variant="outlined"
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <Button
//                 type="submit"
//                 variant="contained"
//                 color="primary"
//                 fullWidth
//               >
//                 SUBMIT
//               </Button>
//             </Grid>
//           </Grid>
//         </form>
        
//         {submittedData && (
//           <TableContainer component={Paper} style={{ marginTop: '20px' }}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Field</TableCell>
//                   <TableCell>Value</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {Object.entries(submittedData).map(([key, value]) => (
//                   <TableRow key={key}>
//                     <TableCell component="th" scope="row">
//                       {key}
//                     </TableCell>
//                     <TableCell>{value}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleFormSubmit}
//               disabled={isSubmitting}
//               style={{ margin: '20px' }}
//             >
//               {isSubmitting ? 'Submitting...' : 'Submit'}
//             </Button>
//             <Grid container spacing={2} style={{ padding: '20px' }}>
//               <Grid item xs={6}>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   fullWidth
//                   onClick={() => handleYearClick('2 Years')}
//                 >
//                   2 Years E.Warranty
//                 </Button>
//               </Grid>
//               <Grid item xs={6}>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   fullWidth
//                   onClick={() => handleYearClick('5 Years')}
//                 >
//                   5 Years E.Warranty
//                 </Button>
//               </Grid>
//             </Grid>
//             <Typography variant="h6" align="center" style={{ margin: '20px' }}>
//               Cost of {year} Warranty will be ------
//             </Typography>
//           </TableContainer>
//         )}
        
//         <Snackbar 
//           open={snackbar.open} 
//           autoHideDuration={6000} 
//           onClose={handleCloseSnackbar}
//         >
//           <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
//             {snackbar.message}
//           </Alert>
//         </Snackbar>
//       </Container>
//     </ThemeProvider>
//   );
// }

// const Form = () => {
//   return <SnackForm />;
// };

// export default Form;