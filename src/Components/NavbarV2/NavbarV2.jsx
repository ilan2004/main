import React, { useEffect, useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import { useAuth } from '../../Contexts/AuthContext';
import { db } from "../../firebase";

export default function NavbarV() {
  const { currentUser } = useAuth();
  const [role, setRole] = useState('');

  useEffect(() => {
    const fetchRole = async () => {
      if (currentUser) {
        try {
          const userDoc = await db.collection('users').doc(currentUser.uid).get();
          if (userDoc.exists) {
            setRole(userDoc.data().role);
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      }
    };
    fetchRole();
  }, [currentUser]);

  const handleClick = (e) => {
    e.preventDefault();
    if (role) {
      const url = role === 'manager' ? '/ManagerDashboard' : '/Dashboard';
      window.open(url, '_blank');
    } else {
      window.open('/Login', '_blank');
    }
  };

  return (
    <Navbar shouldHideOnScroll className="bg-black text-white hover:no-underline">
      <NavbarBrand>
        <p className="font-bold text-inherit">DION</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/" className="text-white">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page" className="text-white">
            Services
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            as={Link}
            to="#"
            onClick={handleClick}
            color="primary"
            href="#"
            variant="flat"
            className="bg-white text-black "
          >
            Account
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
