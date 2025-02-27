import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Brain, BarChart2, GamepadIcon, MessageCircle, Flower } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();

  const links = [
    { to: '/app/dashboard', icon: Brain, label: 'Dashboard' },
    { to: '/app/mood', icon: BarChart2, label: 'Mood Tracker' },
    { to: '/app/games', icon: GamepadIcon, label: 'Games' },
    { to: '/app/meditation', icon: Flower, label: 'Meditation' },
    { to: '/app/chat', icon: MessageCircle, label: 'Chat' },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white border-b border-gray-200 z-50">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-around md:justify-start md:space-x-8 py-3">
          {links.map(({ to, icon: Icon, label }) => (
            <Link key={to} to={to} className="relative group">
              <div className="flex flex-col items-center">
                <Icon 
                  className={`w-6 h-6 ${location.pathname === to ? 'text-indigo-600' : 'text-gray-500'}`}
                />
                <span className="text-xs mt-1">{label}</span>
                {location.pathname === to && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-3 left-0 right-0 h-0.5 bg-indigo-600"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;