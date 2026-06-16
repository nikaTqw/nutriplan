import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import {
  FaHome,
  FaCalendarAlt,
  FaBook,
  FaUser,
  FaUtensils,
} from 'react-icons/fa';

import '../styles/theme.scss';

const BottomNav: React.FC = () => {
  const location = useLocation();

  const items = [
    {
      path: '/',
      icon: <FaHome />,
      text: 'Главная',
      color: 'var(--main-color-1)'
    },
    {
      path: '/calendar',
      icon: <FaCalendarAlt />,
      text: 'Календарь',
      color: 'var(--main-color-3)'
    },
    {
      path: '/ai',
      icon: <FaBook />,
      text: 'AI-рецепт',
      color: 'var(--main-color-2)'
    },
    {
      path: '/catalog',
      icon: <FaUtensils />,
      text: 'Каталог',
      color: 'var(--main-color-3)'
    },
    {
      path: '/profile',
      icon: <FaUser />,
      text: 'Профиль',
      color: 'var(--main-color-1)'
    },
  ];

  useEffect(() => {
    const currentItem = items.find(
      item => item.path === location.pathname
    );

    if (currentItem) {
      document.documentElement.style.setProperty(
        '--main-color',
        currentItem.color
      );
    }
  }, [location.pathname]);

  return (
    <div className="bottom-nav">
      {items.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`nav-item ${
            location.pathname === item.path ? 'active' : ''
          }`}
        >
          {item.icon}
        </Link>
      ))}
    </div>
  );
};

export default BottomNav;