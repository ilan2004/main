import React from 'react';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import getOrderStatus from './lib/helpers';

export default function OrderTable({
  orders,
  editingOrder,
  orderForm,
  handleEditOrder,
  handleOrderChange,
  handleSaveOrder,
  setEditingOrder,
}) {
  return (
    <div className="border-x border-gray-200 rounded-sm mt-3">
      <table className="table">
        <thead>
          <tr className="table-row">
            <th className="table-cell">ID</th>
            <th className="table-cell">Brand</th>
            <th className="table-cell">Vehicle Model</th>
            <th className="table-cell">Chassis Number</th>
            <th className="table-cell">Battery Service Number</th>
            <th className="table-cell">Battery Voltage</th>
            <th className="table-cell">Battery Current</th>
            <th className="table-cell">Order Status</th>
            <th className="table-cell">Submission Date</th>
            <th className="table-cell">Submission Time</th>
            <th className="table-cell">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="table-row">
              <td className="table-cell">{order.id}</td>
              <td className="table-cell">
                {editingOrder && editingOrder.id === order.id ? (
                  <input
                    type="text"
                    name="brand"
                    className="text-edit"
                    value={orderForm.brand || ''}
                    onChange={handleOrderChange}
                  />
                ) : (
                  order.brand
                )}
              </td>
              <td className="table-cell">
                {editingOrder && editingOrder.id === order.id ? (
                  <input
                    type="text"
                    name="vehicleModel"
                    className="text-edit"
                    value={orderForm.vehicleModel || ''}
                    onChange={handleOrderChange}
                  />
                ) : (
                  order.vehicleModel
                )}
              </td>
              <td className="table-cell">
                {editingOrder && editingOrder.id === order.id ? (
                  <input
                    type="text"
                    name="chassisNumber"
                    className="text-edit"
                    value={orderForm.chassisNumber || ''}
                    onChange={handleOrderChange}
                  />
                ) : (
                  order.chassisNumber
                )}
              </td>
              <td className="table-cell">
                {editingOrder && editingOrder.id === order.id ? (
                  <input
                    type="text"
                    name="batteryServiceNumber"
                    className="text-edit"
                    value={orderForm.batteryServiceNumber || ''}
                    onChange={handleOrderChange}
                  />
                ) : (
                  order.batteryServiceNumber
                )}
              </td>
              <td className="table-cell">
                {editingOrder && editingOrder.id === order.id ? (
                  <input
                    type="text"
                    name="batteryVoltage"
                    className="text-edit"
                    value={orderForm.batteryVoltage || ''}
                    onChange={handleOrderChange}
                  />
                ) : (
                  order.batteryVoltage
                )}
              </td>
              <td className="table-cell">
                {editingOrder && editingOrder.id === order.id ? (
                  <input
                    type="text"
                    name="batteryCurrent"
                    className="text-edit"
                    value={orderForm.batteryCurrent || ''}
                    onChange={handleOrderChange}
                  />
                ) : (
                  order.batteryCurrent
                )}
              </td>
              <td className="table-cell">
                {editingOrder && editingOrder.id === order.id ? (
                  <select
                    name="status"
                    className="select"
                    value={orderForm.status || ''}
                    onChange={handleOrderChange}
                  >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                ) : (
                  getOrderStatus(order.status)
                )}
              </td>
              <td className="table-cell">
                {editingOrder && editingOrder.id === order.id ? (
                  <input
                    type="date"
                    name="date"
                    className="date-edit"
                    value={orderForm.date || ''}
                    onChange={handleOrderChange}
                  />
                ) : (
                  order.date
                )}
              </td>
              <td className="table-cell">
                {editingOrder && editingOrder.id === order.id ? (
                  <input
                    type="time"
                    name="time"
                    className="time-edit"
                    value={orderForm.time || ''}
                    onChange={handleOrderChange}
                  />
                ) : (
                  order.time
                )}
              </td>
              <td className="table-cell">
                {editingOrder && editingOrder.id === order.id ? (
                  <>
                    <button onClick={handleSaveOrder}>Save</button>
                    <button className="cancel" onClick={() => setEditingOrder(null)}>Cancel</button>
                  </>
                ) : (
                  <button onClick={() => handleEditOrder(order)}>
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
