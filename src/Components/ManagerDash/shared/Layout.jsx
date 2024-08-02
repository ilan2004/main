import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import './Layout.css'; // Import the CSS file


export default function ManagerLayout() {
    return (
        <div>
        <div className="layout-container">
            <Sidebar />
            <div className="main-content">
                <Header />
                <div className="content-container">
                    <Outlet />
                </div>
            </div>
        </div>
        </div>
        
    );
}

