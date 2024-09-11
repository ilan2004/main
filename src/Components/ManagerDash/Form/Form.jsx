import React, { useState, useEffect } from 'react';
import './Form.scss';
import { getAuth } from 'firebase/auth';
import { useAuth } from '../../../Contexts/AuthContext';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { addDoc, collection } from 'firebase/firestore';
import emailjs from '@emailjs/browser';
import { SnackbarProvider, useSnackbar } from 'notistack';


const SnackForm = ({ userId }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { currentUser } = useAuth();
  const [companyName, setCompanyName] = useState('');
  const [formData, setFormData] = useState({
    brand: '',
    VehicleModel: '',
    chassisNumber: '', 
    servicenumber: '', 
    BatteryVoltage: '', 
    BatteryCurrent: '', 
    contactMobile: '',
    Repair: '',
    comment: '',
    companyName: '' // Add this line
  });
  const [submittedData, setSubmittedData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userData, setUserData] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    setSubmittedData({
      ...formData,
      date,
      time,
      companyName // Include this
    });
    // Reset the form (keep companyName)
    setFormData(prevData => ({
      ...prevData,
      brand: '',
      VehicleModel: '',
      chassisNumber: '',
      servicenumber: '',
      BatteryVoltage: '',
      BatteryCurrent: '',
      contactMobile: '',
      Repair: '',
      comment: ''
    }));
  };

  const handleFormSubmit = async () => {
    try {
      setIsSubmitting(true);

      // Access the current user's authentication information
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        throw new Error("User not authenticated");
      }

      // Prepare data for submission
      const formData = {
        ...submittedData,
        userId: user.uid
      };

      // Access Firestore
      const db = getFirestore();

      // Send data to Firestore
      await addDoc(collection(db, "formData"), formData);

      // Prepare data for email submission
      const templateParams = {
        ...formData,
        userEmail: currentUser.email // Use the current user's email address as the recipient
      };

      // Send email with form data to the current user's email address using EmailJS
      await emailjs.send('service_6fw3qz4', 'template_zevj6nm', templateParams, {
        publicKey: 'Qbcmn6dU4S2rOSw6O',
      });

      enqueueSnackbar('Submitted successfully!', { variant: 'success' });

      // Reset form submission state
      setIsSubmitting(false);

      // Optionally, you can add a success message or redirect the user
    } catch (error) {
      console.error("Error submitting form data:", error);
      enqueueSnackbar('Error submitting form data. Please try again.', { variant: 'error' });
      // Handle error, display error message, etc.
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchUserData(currentUser.uid);
    }
  }, [currentUser]); // Fetch user location when currentUser changes

  async function fetchUserData(userId) {
    try {
      const db = getFirestore();
      const userRef = doc(db, 'users', userId);
      const userSnapshot = await getDoc(userRef);
      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        setUserLocation(userData.Location);
        setCompanyName(userData.companyName || '');
        setFormData(prevData => ({
          ...prevData,
          companyName: userData.companyName || ''
        }));
      } else {
        console.log("User document does not exist");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  }

  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const toggleAdditionalFields = () => {
    setShowAdditionalFields(!showAdditionalFields);
    // Show or hide snackbar based on the visibility of additional fields
    if (!showAdditionalFields) {
      enqueueSnackbar('Extended Warranty FIELDS ON!', { variant: 'success' });

    } else {
      enqueueSnackbar('Extended Warranty FIELDS OFF!', { variant: 'warning' });
    
    }
  };
  const [year, setYear] = useState('');

  const handleYearClick = (selectedYear) => {
    setYear(selectedYear);
  };
  useEffect(() => {
    if (currentUser) {
      fetchUserData(currentUser.uid);
    }
  }, [currentUser]);
  return (
    <SnackbarProvider>
      <div className="alldetails">
        <div className="repairbut">
          <button className="Repair" >SERVICE/REPAIR</button>
          <button className="Repair" onClick={toggleAdditionalFields}>Extended Warranty</button>
        </div>
        <form className='form-fill' onSubmit={handleSubmit}>
        <input
          name="companyName"
          type="text"
           className="feedback-input"
            placeholder="Company Name"
           value={formData.companyName}
          readOnly
/>
          <input
            name="brand"
            type="text"
            className="feedback-input"
            placeholder="Vehicle Brand"
            value={formData.brand}
            onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
          />
          <input
            name="VehicleModel"
            type="text"
            className="feedback-input"
            placeholder="Vehicle Model"
            value={formData.VehicleModel}
            onChange={(e) => setFormData({ ...formData, VehicleModel: e.target.value })}
          />
          <input
            name="chassisNumber"
            type="text"
            className="feedback-input"
            placeholder="Chassis Number/ Motor Number:"
            value={formData.chassisNumber}
            onChange={(e) => setFormData({ ...formData, chassisNumber: e.target.value })}
          />
          <input
            name="servicenumber"
            type="number"
            className="feedback-input"
            placeholder="Battery Service Number: "
            value={formData.registrationNumber}
            onChange={(e) => setFormData({ ...formData, servicenumber: e.target.value })}
          />
          <input
            name="BatteryVoltage"
            type="number"
            className="feedback-input"
            placeholder="Battery Voltage"
            value={formData.BatteryVoltage}
            onChange={(e) => setFormData({ ...formData, BatteryVoltage: e.target.value })}
          />
          <input
            name="BatteryCurrent"
            type="number"
            className="feedback-input"
            placeholder="Battery Current"
            value={formData.BatteryCurrent}
            onChange={(e) => setFormData({ ...formData, BatteryCurrent: e.target.value })}
          />
          <input
            name="contactMobile"
            type="number"
            className="feedback-input"
            placeholder="Contact Mobile"
            value={formData.contactMobile}
            onChange={(e) => setFormData({ ...formData, contactMobile: e.target.value })}
          />
          {showAdditionalFields && (
            <>
              <input
                name="VehiclekiloMeters"
                type="text"
                className="feedback-input"
                placeholder="Vehicle kiloMeters"
                value={formData.VehiclekiloMeters}
                onChange={(e) => setFormData({ ...formData, VehiclekiloMeters: e.target.value })}
              />
              <input
                name="Battery Voltage "
                type="text"
                className="feedback-input"
                placeholder="BatteryVoltage"
                value={formData.BatteryVoltage}
                onChange={(e) => setFormData({ ...formData, BatteryVoltage: e.target.value })}
              />
              <input
                name="BatteryCurrent"
                type="text"
                className="feedback-input"
                placeholder="Additional Field 2"
                value={formData.BatteryCurrent}
                onChange={(e) => setFormData({ ...formData, BatteryCurrent: e.target.value })}
              />
            </>
          )}
          <textarea
            name="comment"
            className="feedback-input"
            placeholder="Comment"
            value={formData.comment}
            onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
          ></textarea>
          <input type="submit" value="SUBMIT" />
        </form>
        <div className="for-table">
          {/* Render table if form is submitted */}
          {submittedData && (
            <table>
              <tbody>
                <tr>
                  <th>Field</th>
                  <th>Value</th>
                </tr>
                <tr>
                  <td className='left-side'>Company Name</td>
                  <td className='Right-side'>{submittedData.companyName}</td>
                </tr>
                <tr>
                  <td className='left-side'>Vehicle Brand</td>
                  <td className='Right-side'>{submittedData.brand}</td>
                </tr>
                <tr>
                  <td className='left-side'>Vehicle Model</td>
                  <td className='Right-side'>{submittedData.VehicleModel}</td>
                </tr>
                <tr>
                  <td className='left-side'>Chassis Number/ Motor Number:</td>
                  <td className='Right-side'>{submittedData.chassisNumber}</td>
                </tr>
                <tr>
                  <td className='left-side'>Battery Service Number</td>
                  <td className='Right-side'>{submittedData.servicenumber}</td>
                </tr>
                <tr>
                  <td className='left-side'>Battery Voltage</td>
                  <td className='Right-side'>{submittedData.BatteryVoltage}</td>
                </tr>
                <tr>
                  <td className='left-side'>Battery Current</td>
                  <td className='Right-side'>{submittedData.BatteryCurrent}</td>
                </tr>
                <tr>
                  <td className='left-side'>Contact Mobile</td>
                  <td className='Right-side'>{submittedData.contactMobile}</td>
                </tr>
                <tr>
                  <td className='left-side'>Comment</td>
                  <td className='Right-side'>{submittedData.comment}</td>
                </tr>
                <tr>
                  <td className='left-side'>Submission Date</td>
                  <td className='Right-side'>{submittedData.date}</td>
                </tr>
                <tr>
                  <td className='left-side'>Submission Time</td>
                  <td className='Right-side'>{submittedData.time}</td>
                </tr>
                <div className="button-div">
                  <button className="table-submit" onClick={handleFormSubmit} disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
                <div className="years">
                  <button className="two" onClick={() => handleYearClick('2 Years')}>
                    2 Years E.Warranty
                  </button>
                  <button className="fiveyear" onClick={() => handleYearClick('5 Years')}>
                    5 Years E.Warranty
                  </button>
                </div>
                <div className="costof">
                  <h3>Cost of --{year}-- Warranty will be ------</h3>
                </div>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </SnackbarProvider>
  );
}

const ManagerForm = () => {
  return (
    <SnackbarProvider>
      <SnackForm />
    </SnackbarProvider>
  );
};

export default ManagerForm;
