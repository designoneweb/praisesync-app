
'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { useState, useEffect } from "react"; // Import useEffect
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ["latin"] });

const getHeaderTitle = (pathname: string): string => {
  if (pathname.startsWith('/dashboard')) return "Dashboard";
  if (pathname.startsWith('/schedule')) return "Volunteer Scheduler";
  if (pathname.startsWith('/setlist')) return "Set List Builder";
  if (pathname.startsWith('/bulletins')) return "Bulletin Generator";
  if (pathname.startsWith('/team')) return "Team Management";
  if (pathname.startsWith('/reports')) return "Reports";
  if (pathname.startsWith('/cclisettings')) return "CCLI Settings";
  if (pathname.startsWith('/billing')) return "Billing";
  if (pathname === '/') return "Welcome";
  return "PraiseSync"; 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const headerTitle = getHeaderTitle(pathname);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [theme, setTheme] = useState('light'); // Default theme

  useEffect(() => {
    // Check local storage for saved theme
    const savedTheme = localStorage.getItem('theme');
    // Check system preference if no saved theme
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (prefersDark) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <html lang="en">
      {/* The 'dark' class will be applied here by the useEffect hook */}
      <body className={`${inter.className} flex h-screen bg-praise-bg dark:bg-praise-dark-bg text-praise-text-dark dark:text-praise-dark-text overflow-hidden`}>
        <Sidebar isSidebarVisible={isSidebarVisible} /> 
        <div 
          className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${isSidebarVisible ? 'ml-64' : 'ml-0'}`}
        >
          <Header title={headerTitle} toggleSidebar={toggleSidebar} toggleTheme={toggleTheme} currentTheme={theme} />
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
