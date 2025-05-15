import React from 'react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FcBullish } from 'react-icons/fc';
import { HiOutlineLogout } from 'react-icons/hi';
import { useNavigate } from "react-router-dom";
import { DASHBOARD_SIDEBAR_LINKS, DASHBOARD_SIDEBAR_BOTTOM_LINKS } from '../lib/constants/index';
import './Sidebar.css'; // Import the CSS file
import logo from '../../../assets/img/dion.png';
import { useAuth } from '../../../Contexts/AuthContext';
export default function SidebarManage() {
    const { logout } = useAuth();
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const phoneNumber = "+918304963000";
    const emailAddress = "info@dionpower.in";
  const handleSignOut = async () => {
    try {
        setError("");
        setLoading(true);
      await logout();
      setTimeout(() => {
        navigate("/");
    }, 1000);
      // Redirect to login page or handle post sign-out actions
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
    return (
        <div className="sidebar-container">
            <div className="flex items-center gap-2 px-1 py-3">
            <img className='side-emblem' src={logo}  />
				{/* <a className="text-neutral-200 text-lg">HERTZEV</a> */}
			</div>
            <div className="link-container" >
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
                        <HiOutlineLogout   />
                        Logout
                    </div>
                </div>
            </div>
        </div>
    );
}

function SidebarLink({ link }) {
    const { pathname } = useLocation();
    const isExternal = link.path.startsWith('http');

    return isExternal ? (
        // For external links, use <a> tag
        <a
            href={link.path}
            target="_blank"
            rel="noopener noreferrer"
            className="link"
        >
            {link.icon}
            {link.label}
        </a>
    ) : (
        // For internal links, use React Router's <Link>
        <Link
            to={link.path}
            className={`link ${pathname === link.path ? 'active' : ''}`}
        >
            {link.icon}
            {link.label}
        </Link>
    );
}
