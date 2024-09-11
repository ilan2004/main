import React from 'react';
import { HiOutlinePencilAlt } from 'react-icons/hi';

export default function UserTable({
  users,
  editingUser,
  userForm,
  handleEditUser,
  handleUserChange,
  handleSaveUser,
  setEditingUser,
}) {
  return (
    <div className="border-x border-gray-200 rounded-sm mt-3">
      <table className="table">
        <thead>
          <tr className="table-row">
            <th className="table-cell">ID</th>
            <th className="table-cell">Display Name</th>
            <th className="table-cell">Email</th>
            <th className="table-cell">Role</th>
            <th className="table-cell">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="table-row">
              <td className="table-cell">{user.id}</td>
              <td className="table-cell">
                {editingUser && editingUser.id === user.id ? (
                  <input
                    type="text"
                    name="displayName"
                    className="text-edit"
                    value={userForm.displayName || ''}
                    onChange={handleUserChange}
                  />
                ) : (
                  user.displayName
                )}
              </td>
              <td className="table-cell">
                {editingUser && editingUser.id === user.id ? (
                  <input
                    type="email"
                    name="email"
                    className="email-edit"
                    value={userForm.email || ''}
                    onChange={handleUserChange}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td className="table-cell">
                {editingUser && editingUser.id === user.id ? (
                  <input
                    type="text"
                    name="role"
                    className="text-edit"
                    value={userForm.role || ''}
                    onChange={handleUserChange}
                  />
                ) : (
                  user.role
                )}
              </td>
              <td className="table-cell">
                {editingUser && editingUser.id === user.id ? (
                  <>
                    <button onClick={handleSaveUser}>Save</button>
                    <button className="cancel" onClick={() => setEditingUser(null)}>Cancel</button>
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
}
