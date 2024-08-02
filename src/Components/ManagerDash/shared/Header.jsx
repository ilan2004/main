import React, { useState, useEffect, Fragment } from 'react';
import { HiOutlineBell, HiOutlineSearch, HiOutlineChatAlt } from 'react-icons/hi';
import { Menu, Popover, Transition } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useAuth } from '../../../Contexts/AuthContext';
import './Header.css';

export default function Header({ onSearch }) {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        if (currentUser) {
          const db = getFirestore();
          const userDoc = doc(db, 'users', currentUser.uid);
          const docSnapshot = await getDoc(userDoc);

          if (docSnapshot.exists()) {
            const userData = docSnapshot.data();
            setUserRole(userData.role || '');
          }
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };

    fetchUserRole();
  }, [currentUser]);

  return (
    <div className="header-container">
      <div className="search-container relative">
        <HiOutlineSearch fontSize={20} className="icon" />
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
          onChange={onSearch}
        />
      </div>
      <div className="flex items-center gap-2 mr-2">
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={`group inline-flex items-center rounded-sm p-1.5 text-gray-700 hover:text-opacity-100 focus:outline-none active:bg-gray-100`}
              >
                <HiOutlineChatAlt fontSize={24} />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute right-0 z-10 mt-2.5 transform w-80">
                  <div className="bg-white rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5">
                    <strong className="text-gray-700 font-medium">Messages</strong>
                    <div className="mt-2 py-1 text-sm">This is messages panel.</div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
        <Menu as="div" className="relative">
          <div>
            <Menu.Button className="">
              <span className="sr-only">Open user menu</span>
              <div className="UserName">
                Welcome <br />
                {userRole}
                <span className="sr-only"></span>
              </div>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-sm shadow-md p-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <div
                    onClick={() => navigate('/profile')}
                    className={`active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer ${active ? 'bg-gray-100' : ''}`}
                  >
                    Your Profile
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div
                    onClick={() => navigate('/settings')}
                    className={`active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer ${active ? 'bg-gray-100' : ''}`}
                  >
                    Settings
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div
                    onClick={() => navigate('/signout')}
                    className={`active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer ${active ? 'bg-gray-100' : ''}`}
                  >
                    Sign out
                  </div>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}
