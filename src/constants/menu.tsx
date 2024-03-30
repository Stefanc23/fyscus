import {
  FaChartLine,
  FaChartPie,
  FaHome,
  FaIcons,
  FaList,
  FaWallet,
} from 'react-icons/fa';

export default [
  { icon: <FaHome fontSize={20} />, label: 'Dashboard', href: '/dashboard' },
  {
    icon: <FaWallet fontSize={20} />,
    label: 'My Accounts',
    href: '/dashboard/accounts',
  },
  {
    icon: <FaIcons fontSize={20} />,
    label: 'Categories',
    href: '/dashboard/categories',
  },
  {
    icon: <FaList fontSize={20} />,
    label: 'Transactions',
    href: '/dashboard/transactions',
  },
  {
    icon: <FaChartPie fontSize={20} />,
    label: 'Budget',
    href: '/dashboard/budgets',
  },
  {
    icon: <FaChartLine fontSize={20} />,
    label: 'My Portfolio',
    href: '/dashboard/investments',
  },
];
