import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import { useAuth } from '../../Contexts/AuthContext';
export default function NavbarV() {
  const { currentUser } = useAuth();
  const handleClick = (e) => {
    e.preventDefault();
    const url = currentUser ? '/Dashboard' : '/Login';
    window.open(url, '_blank');
  };
  return (
    <Navbar shouldHideOnScroll className="bg-black text-white">
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
        <NavbarItem>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {/* <NavbarItem className="hidden lg:flex">
          <Link href="#" className="text-white">Login</Link>
        </NavbarItem> */}
        <NavbarItem>
          <Button as={Link} to={currentUser ? '/Dashboard' : '/Login'} onClick={handleClick} color="primary" href="#" variant="flat" className="bg-white text-black">
            Account
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
