// CompanyUsers.js
import React, { useState } from 'react';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';

const CompanyUsers = ({ userData }) => {
  const [editingUser, setEditingUser] = useState(null);
  const [userForm, setUserForm] = useState({});

  const handleEditUser = (user) => {
    setEditingUser(user);
    setUserForm(user);
  };

  const handleUserChange = (e) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveUser = async () => {
    const db = getFirestore();
    const userRef = doc(db, 'users', editingUser.id);
    try {
      await updateDoc(userRef, userForm);
      setEditingUser(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="user-section">
      <strong className="header mt-8">Company Users</strong>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Display Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                {editingUser && editingUser.id === user.id ? (
                  <input
                    name="displayName"
                    value={userForm.displayName || ''}
                    onChange={handleUserChange}
                  />
                ) : (
                  user.displayName
                )}
              </td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                {editingUser && editingUser.id === user.id ? (
                  <>
                    <button onClick={handleSaveUser}>Save</button>
                    <button onClick={() => setEditingUser(null)}>Cancel</button>
                  </>
                ) : (
                  <button onClick={() => handleEditUser(user)}>
                    <HiOutlinePencilAlt /> Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyUsers;
