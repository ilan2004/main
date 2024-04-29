import React, { useState } from 'react';
import './Form.scss'
import { useAuth } from '../../Contexts/AuthContext';
import { getFirestore } from 'firebase/firestore';
import { addDoc, collection } from 'firebase/firestore';
import emailjs from '@emailjs/browser';

function Form() {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    ownerName: '',
    brand: '',
    VehicleModel: '',
    kiloMeters: '',
    Voltage: '',
    Current: '',
    contactMobile: '',
    Repair: '',
    comment: ''
  });
  const [submittedData, setSubmittedData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Store the form data
    setSubmittedData(formData);
    // Reset the form
    setFormData({
      ownerName: '',
      brand: '',
      VehicleModel: '',
      kiloMeters: '',
      Voltage: '',
      Current: '',
      contactMobile: '',
      Repair: '',
      comment: ''
    });
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
        ownerName: submittedData.ownerName,
        brand: submittedData.brand,
        VehicleModel: submittedData.VehicleModel,
        kiloMeters: submittedData.kiloMeters,
        Voltage: submittedData.Voltage,
        Current: submittedData.Current,
        contactMobile: submittedData.contactMobile,
        Repair: submittedData.Repair,
        comment: submittedData.comment,
        // Include the user's UID in the form data
        userId: user.uid
      };
  
      // Access Firestore
      const db = getFirestore();
  
      // Send data to Firestore
      await addDoc(collection(db, "formData"), formData);
  
      // Prepare data for email submission
      const templateParams = {
        ownerName: formData.ownerName,
        brand: formData.brand,
        VehicleModel: formData.VehicleModel,
        kiloMeters: formData.kiloMeters,
        Voltage: formData.Voltage,
        Current: formData.Current,
        contactMobile: formData.contactMobile,
        Repair: formData.Repair,
        comment: formData.comment,
        userEmail: currentUser.email // Use the current user's email address as the recipient
      };
  
      // Send email with form data to the current user's email address using EmailJS
      await emailjs.send('service_6fw3qz4', 'template_zevj6nm', templateParams, {
        publicKey: 'Qbcmn6dU4S2rOSw6O',
      });
  
      // Reset form submission state
      setIsSubmitting(false);
  
      // Optionally, you can add a success message or redirect the user
    } catch (error) {
      console.error("Error submitting form data:", error);
      // Handle error, display error message, etc.
      setIsSubmitting(false);
    }
  };

  return (
    <div className="alldetails">
      <div className='welc-user'>
        <h1 className='welc'>WELCOME</h1>
        <h2>{currentUser && currentUser.displayName}</h2>
      </div>
      <h1 className='comp-loc'>Regestered Company Location:{currentUser && currentUser.Location} </h1>
      
      <form className='form-fill' onSubmit={handleSubmit}>
        <input
          name="ownerName"
          type="text"
          className="feedback-input"
          placeholder="Owner's Name"
          value={formData.ownerName}
          onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
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
          name="kiloMeters"
          type="text"
          className="feedback-input"
          placeholder="Vehicle kiloMeters"
          value={formData.kiloMeters}
          onChange={(e) => setFormData({ ...formData, kiloMeters: e.target.value })}
        />
        <input
          name="Voltage"
          type="number"
          className="feedback-input"
          placeholder="Battery Voltage"
          value={formData.Voltage}
          onChange={(e) => setFormData({ ...formData, Voltage: e.target.value })}
        />
        <input
          name="Current"
          type="number"
          className="feedback-input"
          placeholder="Battery Current"
          value={formData.Current}
          onChange={(e) => setFormData({ ...formData, Current: e.target.value })}
        />
        <input
          name="contactMobile"
          type="number"
          className="feedback-input"
          placeholder="Contact Mobile"
          value={formData.contactMobile}
          onChange={(e) => setFormData({ ...formData, contactMobile: e.target.value })}
        />
        <select
          name="Repair"
          className="feedback-input"
          value={formData.Repair}
          onChange={(e) => setFormData({ ...formData, Repair: e.target.value })}
        >
          <option className='repai-opti' value="service">Service</option>
          <option className='repai-opti' value="repair">Repair</option>
        </select>
        <textarea
          name="comment"
          className="feedback-input"
          placeholder="Comment"
          value={formData.comment}
          onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
        ></textarea>
        <input type="submit" value="SUBMIT"/>
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
                <td className='left-side'>Owner's Name</td>
                <td className='Right-side'>{submittedData.ownerName}</td>
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
                <td className='left-side'>Vehicle kiloMeters</td>
                <td className='Right-side'>{submittedData.kiloMeters}</td>
              </tr>
              <tr>
                <td className='left-side'>Battery Voltage</td>
                <td className='Right-side'>{submittedData.Voltage}</td>
              </tr>
              <tr>
                <td className='left-side'>Battery current</td>
                <td className='Right-side'>{submittedData.Current}</td>
              </tr>
              <tr>
                <td className='left-side'>contact Mobile</td>
                <td className='Right-side'>{submittedData.contactMobile}</td>
              </tr>
              <tr>
                <td className='left-side'>Comment</td>
                <td className='Right-side'>{submittedData.comment}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
      <div className="button-div">
        <button className="table-submit" onClick={handleFormSubmit} disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </div>
  );
}

export default Form;
