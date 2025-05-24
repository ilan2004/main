import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import './WarrantyVerification.css'; // Separate CSS file
import NavbarV from '../NavbarV2/NavbarV2'; // Import the Navbar component

const WarrantyVerification = () => {
  const { serialNumber } = useParams();
  const [warrantyData, setWarrantyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWarrantyData = async () => {
      try {
        setLoading(true);
        const db = getFirestore();
        
        // Query the warranty collection using the serial number
        const warrantyQuery = query(
          collection(db, 'warranties'), // Use your actual collection name
          where('serialNumber', '==', serialNumber)
        );
        
        const querySnapshot = await getDocs(warrantyQuery);
        
        // Inside your fetchWarrantyData function
        if (!querySnapshot.empty) {
          setWarrantyData(querySnapshot.docs[0].data());
        } else {
          // Try alternative collections if the primary one doesn't have results
          const alternativeCollections = ['formData', 'submissions'];
          let found = false;
          
          for (const collectionName of alternativeCollections) {
            if (found) break;
            
            console.log(`Trying alternative collection: ${collectionName}`);
            const altQuery = query(
              collection(db, collectionName),
              where('serialNumber', '==', serialNumber)
            );
            
            const altSnapshot = await getDocs(altQuery);
            if (!altSnapshot.empty) {
              console.log(`Found data in ${collectionName} collection`);
              setWarrantyData(altSnapshot.docs[0].data());
              found = true;
            }
          }
          
          if (!found) {
            setError('Warranty information not found for this serial number');
          }
        }
      } catch (err) {
        console.error('Error fetching warranty data:', err);
        setError('Failed to fetch warranty information. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (serialNumber) {
      fetchWarrantyData();
    }
  }, [serialNumber]);

  // Format timestamp to readable date
  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    
    // Check if it's a Firestore Timestamp
    if (timestamp instanceof Timestamp) {
      return timestamp.toDate().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    }
    
    // If it's a string or other format, try to parse it
    try {
      return new Date(timestamp).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch (e) {
      return 'Invalid date';
    }
  };

  return (
    <>
      <NavbarV />
      <div className="warranty-verification">
        <div className="warranty-verification-box">
          <div className="warranty-verification-content">
            {loading ? (
              <h1 className="warranty-verification-title">Loading Warranty Information...</h1>
            ) : error ? (
              <>
                <h1 className="warranty-verification-title">Warranty Verification</h1>
                <p className="warranty-verification-message">{error}</p>
                <p className="warranty-verification-serial">Serial Number: {serialNumber}</p>
              </>
            ) : (
              <>
                <h1 className="warranty-verification-title">Warranty Information</h1>
                
                <div className="warranty-verification-details">
                  <table className="warranty-verification-table">
                    <tbody>
                      <tr>
                        <td><strong>Serial Number:</strong></td>
                        <td>{warrantyData?.serialNumber || serialNumber}</td>
                      </tr>
                      <tr>
                        <td><strong>Model:</strong></td>
                        <td>{warrantyData?.model || 'N/A'}</td>
                      </tr>
                      <tr>
                        <td><strong>Customer Name:</strong></td>
                        <td>{warrantyData?.customerName || 'N/A'}</td>
                      </tr>
                      <tr>
                        <td><strong>Dealer Name:</strong></td>
                        <td>{warrantyData?.dealerName || 'N/A'}</td>
                      </tr>
                      <tr>
                        <td><strong>Purchase Date:</strong></td>
                        <td>{warrantyData?.purchaseDate ? formatDate(warrantyData.purchaseDate) : 'N/A'}</td>
                      </tr>
                      <tr>
                        <td><strong>Warranty Period:</strong></td>
                        <td>{warrantyData?.warrantyPeriod ? `${warrantyData.warrantyPeriod} year(s)` : 'N/A'}</td>
                      </tr>
                      <tr>
                        <td><strong>Warranty End Date:</strong></td>
                        <td>{warrantyData?.warrantyEndDate ? formatDate(warrantyData.warrantyEndDate) : 'N/A'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default WarrantyVerification;