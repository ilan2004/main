import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HiOutlineLogout, HiOutlineViewGrid, HiOutlineCube, HiOutlineCog, HiOutlineQuestionMarkCircle } from 'react-icons/hi';
import './Sidebar.css'; // Import the CSS file
import logo from '../../../assets/img/dion.png';
import { useAuth } from '../../../Contexts/AuthContext';

export default function Sidebar() {
    const { currentUser, logout } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            setError("");
            setLoading(true);
            await logout();
            setTimeout(() => {
                navigate("/");
            }, 1000);
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    // Dynamically set the sidebar links based on user role
    const DASHBOARD_SIDEBAR_LINKS = currentUser?.role === 'manager' ? [
        {
            key: 'dashboard',
            label: 'Manager Dashboard',
            path: '/ManagerDashboard',
            icon: <HiOutlineViewGrid />
        },
        // {
        //     key: 'Form',
        //     label: 'Manager Form',
        //     path: '/ManagerForm',
        //     icon: <HiOutlineCube />
        // }
    ] : [
        {
            key: 'dashboard',
            label: 'Dashboard',
            path: '/Dashboard',
            icon: <HiOutlineViewGrid />
        },
        // {
        //     key: 'Form',
        //     label: 'Form',
        //     path: '/Form',
        //     icon: <HiOutlineCube />
        // }
    ];

    const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
        {
            key: 'settings',
            label: 'Settings',
            path: '/settings',
            icon: <HiOutlineCog />
        },
        {
            key: 'support',
            label: 'Help & Support',
            path: "https://wa.me/918304963000",
            icon: <HiOutlineQuestionMarkCircle />
        }
    ];

    return (
        <div className="sidebar-container">
            <div className="flex items-center gap-2 px-1 py-3">
                <img className='side-emblem' src={logo} alt="Logo" />
            </div>
            <div className="link-container">
                {DASHBOARD_SIDEBAR_LINKS.map((link) => (
                    <SidebarLink key={link.key} link={link} />
                ))}
            </div>
            <div className="link-container">
                {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((link) => (
                    <SidebarLink key={link.key} link={link} />
                ))}
                <div className="logout-container">
                    <div className="logout-link" onClick={handleSignOut}>
                        <HiOutlineLogout />
                        Logout
                    </div>
                </div>
            </div>
        </div>
    );
}

function SidebarLink({ link }) {
    const { pathname } = useLocation();

    return (
        <Link
            to={link.path}
            className={`link ${pathname === link.path ? 'active' : ''}`}
        >
            {link.icon}
            {link.label}
        </Link>
    );
}
