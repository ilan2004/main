import React from 'react';
import { Outlet } from 'react-router-dom';
import SidebarManage from './Sidebar';
import Header from './Header';
import './Layout.css'; // Import the CSS file


export default function ManagerLayout() {
    return (
        <div className='layout'>
        <div className="layout-container">
            <SidebarManage />
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

