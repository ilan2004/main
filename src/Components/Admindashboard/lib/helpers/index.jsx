
import React from 'react';
import './styles.css';

export function getOrderStatus(status) {
    if (!status) {
        return (
            <span className="capitalize py-1 px-2 rounded-md text-xs text-sky-600 bg-sky-100">
                PLACED
            </span>
        );
    }

    const statusText = status.replaceAll('_', ' ').toLowerCase();
    
    switch (status) {
        case 'PLACED':
            return (
                <span className="capitalize py-1 px-2 rounded-md text-xs text-sky-600 bg-sky-100">
                    {statusText}
                </span>
            );
        case 'CONFIRMED':
            return (
                <span className="capitalize py-1 px-2 rounded-md text-xs text-orange-600 bg-orange-100">
                    {statusText}
                </span>
            );
        case 'SHIPPED':
            return (
                <span className="capitalize py-1 px-2 rounded-md text-xs text-teal-600 bg-teal-100">
                    {statusText}
                </span>
            );
        case 'OUT_FOR_DELIVERY':
            return (
                <span className="capitalize py-1 px-2 rounded-md text-xs text-yellow-600 bg-yellow-100">
                    {statusText}
                </span>
            );
        case 'DELIVERED':
            return (
                <span className="capitalize py-1 px-2 rounded-md text-xs text-green-600 bg-green-100">
                    {statusText}
                </span>
            );
        default:
            return (
                <span className="capitalize py-1 px-2 rounded-md text-xs text-gray-600 bg-gray-100">
                    {statusText}
                </span>
            );
    }
}



export default getOrderStatus;
