// src/config/sidebarConfig.js
import { SettingsIcon } from '@chakra-ui/icons';
import { AiOutlineTeam, AiOutlineHome } from 'react-icons/ai';
import { BiWallet } from 'react-icons/bi';
import { HiHome } from 'react-icons/hi';
import { MdDeveloperBoard, MdOutlinePayment, MdPayment, MdPayments, MdSecurity } from 'react-icons/md';
import { RiSecurePaymentFill } from 'react-icons/ri';
import { FaRegUserCircle } from 'react-icons/fa';
import { IoIosLogOut } from 'react-icons/io';
import { GrTransaction } from 'react-icons/gr';

export const sidebardatails = {
    name: "Shilinso"
}

export const sidebarItems = [
    { name: 'Home', path: '/dashboard', icon: HiHome },
    {name:"My Wallet",path:"/wallet",icon:BiWallet},
    { name: 'Payments', path: '/payments', icon: MdPayments },
    {name:"Transactions",path:"/transactions",icon:GrTransaction},
    { name: 'Security', path: '/security', icon: MdSecurity },
    { name: 'Team', path: '/team', icon: AiOutlineTeam },
    { name: 'Cards', path: '/cards', icon: MdOutlinePayment },
    {name:"Developers",icon:MdDeveloperBoard},
    { name: 'Profile', path: '/dashboard/profile', icon: FaRegUserCircle },
    { name: 'Settings', path: '/settings', icon: SettingsIcon },
    { name: 'Logout', path: '/logout', icon: IoIosLogOut },
];