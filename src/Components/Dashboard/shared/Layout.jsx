import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import SidebarManage from '../../ManagerDash/shared/Sidebar';
import Header from './Header';
import './Layout.css';
import { useAuth } from '../../../Contexts/AuthContext'; // Import the useAuth hook

export default function Layout() {
    const { currentUser } = useAuth(); // Get the current user from the authentication context

    // Assuming currentUser has a 'role' property to distinguish between user and manager
    const isManager = currentUser?.role === 'manager';

    return (
        <div>
            <div className="layout-container">
                {isManager ? <SidebarManage /> : <Sidebar />}
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
