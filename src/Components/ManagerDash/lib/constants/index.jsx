import {
	HiOutlineViewGrid,
	HiOutlineCube,
	HiOutlineShoppingCart,
	HiOutlineUsers,
	HiOutlineDocumentText,
	HiOutlineAnnotation,
	HiOutlineQuestionMarkCircle,
	HiOutlineCog
} from 'react-icons/hi'

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/Dashboard',
		icon: <HiOutlineViewGrid />
	},
	{
		key: 'Form',
		label: 'Form',
		path: '/Form',
		icon: <HiOutlineCube />
	},
	// {
	// 	key: 'orders',
	// 	label: 'Orders',
	// 	path: '/orders',
	// 	icon: <HiOutlineShoppingCart />
	// },

]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
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
]
