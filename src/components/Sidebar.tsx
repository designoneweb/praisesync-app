
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, CalendarIcon, MusicNoteIcon, DocumentTextIcon, UsersIcon, ChartBarIcon, CogIcon, CreditCardIcon } from "@/components/Icons";

interface NavItem {
  name: string;
  icon: JSX.Element;
  href: string;
}

interface SidebarProps {
  isSidebarVisible: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarVisible }) => {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    { name: 'Dashboard', icon: <HomeIcon />, href: '/dashboard' },
    { name: 'Schedule', icon: <CalendarIcon />, href: '/schedule' },
    { name: 'Set Lists', icon: <MusicNoteIcon />, href: '/setlist' },
    { name: 'Bulletins', icon: <DocumentTextIcon />, href: '/bulletins' },
    { name: 'Team', icon: <UsersIcon />, href: '/team' },
    { name: 'Reports', icon: <ChartBarIcon />, href: '/reports' },
    { name: 'CCLI Settings', icon: <CogIcon />, href: '/cclisettings' },
    { name: 'Billing', icon: <CreditCardIcon />, href: '/billing' },
  ];

  return (
    <div 
      className={`w-64 h-screen bg-praise-sidebar dark:bg-praise-dark-sidebar text-white p-5 flex flex-col fixed top-0 left-0 z-20 transition-transform duration-300 ease-in-out ${
        isSidebarVisible ? 'translate-x-0' : '-translate-x-full'
      }`}
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      <div className="text-2xl font-bold text-praise-accent mb-10">PraiseSync</div>
      <nav>
        <ul>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name} className="mb-2">
                <Link 
                  href={item.href} 
                  className={`flex items-center w-full py-2 px-3 rounded-lg transition-colors duration-200 ${
                    isActive 
<<<<<<< HEAD
                      ? 'bg-[#F4B860] text-[#1E2A52]' 
                      : 'hover:bg-[#2A3B70] hover:text-[#F4B860]'
                  }`}
                >
                  {React.cloneElement(item.icon, { className: `w-5 h-5 ${isActive ? 'text-[#1E2A52]' : 'text-white'}` })}
=======
                      ? 'bg-praise-accent text-praise-sidebar dark:text-praise-dark-sidebar' 
                      : 'text-white hover:bg-[#2A3B70] dark:hover:bg-slate-700 hover:text-praise-accent dark:hover:text-praise-accent'
                  }`}
                >
                  {/* Ensure icons handle dark mode if they have stroke/fill that needs to change, or pass className */}
                  {React.cloneElement(item.icon, { className: isActive ? 'text-praise-sidebar dark:text-praise-dark-sidebar' : 'text-white group-hover:text-praise-accent' })}
>>>>>>> origin/main
                  <span className="ml-2">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="mt-auto text-xs text-gray-400 dark:text-gray-500">
        <p>&copy; {new Date().getFullYear()} PraiseSync</p>
        <p>Version 0.1.0</p>
      </div>
    </div>
  );
};

export default Sidebar;
