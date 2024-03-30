import menu from '@/constants/menu';

import BottomNavigationItem from './BottomNavigationItem';

const BottomNavigation = () => {
  return (
    <nav className="w-full lg:hidden fixed left-0 bottom-0">
      <ul className="flex items-center justify-between">
        {menu.map((props) => (
          <BottomNavigationItem key={props.href} {...props} />
        ))}
      </ul>
    </nav>
  );
};

export default BottomNavigation;
