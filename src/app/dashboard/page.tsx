
'use client';

import React, { useState, useEffect } from 'react'; // Ensured useState, useEffect are imported
import { MusicNoteIcon, CalendarIcon, DocumentTextIcon, UsersIcon } from "@/components/Icons";
import { formatDate } from "@/components/Icons";
import Link from 'next/link';

// Mock data for services - moved outside to be accessible by useEffect
const allMockServices: any[] = [
  { id: 1, date: '2025-05-11', time: '10:00 AM', theme: "Mother's Day Service", bulletinReady: true, ccliStatus: 'Reported' },
  { id: 2, date: '2025-05-18', time: '10:00 AM', theme: 'Pentecost Sunday', bulletinReady: false, ccliStatus: 'Pending' },
  { id: 3, date: '2025-05-25', time: '10:00 AM', theme: 'Trinity Sunday', bulletinReady: true, ccliStatus: 'Reported' },
];

const Dashboard: React.FC<{}> = () => {
    const [nextService, setNextService] = useState<any | null>(null);
    const [upcomingServices, setUpcomingServices] = useState<any[]>([]);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);
      const now = new Date();
      const sortedServices = [...allMockServices].sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      const futureServices = sortedServices.filter(s => new Date(s.date) >= now);
      
      setNextService(futureServices.length > 0 ? futureServices[0] : null);
      setUpcomingServices(futureServices.slice(0, 3));
    }, []);

    if (!isClient) {
      // Render a loading state or null for server render to avoid mismatch
      return (
        <div className="p-6 min-h-screen flex items-center justify-center">
          Loading Dashboard...
        </div>
      );
    }

  return (
    <div className="p-6 bg-[#FAF9F7]" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Main KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <h3 className="text-sm font-medium text-gray-500">Next Service</h3>
          {nextService ? (
            <>
              <p className="text-2xl font-semibold text-[#1E2A52]">{formatDate(nextService.date)}</p>
              <p className="text-sm text-gray-600">{nextService.theme}</p>
            </>
          ) : (
            <p className="text-2xl font-semibold text-[#1E2A52]">No upcoming services</p>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <h3 className="text-sm font-medium text-gray-500">Next Bulletin Status</h3>
          {nextService ? (
            <p className={`text-2xl font-semibold ${nextService.bulletinReady ? 'text-green-500' : 'text-yellow-500'}`}>
              {nextService.bulletinReady ? 'Ready' : 'Pending'}
            </p>
          ) : (
             <p className="text-2xl font-semibold text-gray-400">N/A</p>
          )}
          <Link href="/bulletins" className="mt-2 text-sm text-[#F4B860] hover:underline">
            View Bulletins
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <h3 className="text-sm font-medium text-gray-500">CCLI Reporting</h3>
           {nextService ? (
            <p className={`text-2xl font-semibold ${nextService.ccliStatus === 'Reported' ? 'text-green-500' : 'text-orange-500'}`}>
              {nextService.ccliStatus}
            </p>
          ) : (
             <p className="text-2xl font-semibold text-gray-400">N/A</p>
          )}
          <Link href="/cclisettings" className="mt-2 text-sm text-[#F4B860] hover:underline">
            Manage CCLI
          </Link>
        </div>
      </div>

      {/* Prepare Sunday Button */}
      <div className="mb-8 text-center">
        <button 
          onClick={() => alert('Prepare Sunday Wizard (not implemented yet)')} 
          className="bg-[#F4B860] text-[#1E2A52] font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-opacity-90 transition-colors text-lg"
        >
          Prepare Sunday
        </button>
      </div>
      
      {/* Upcoming Services Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-[#1E2A52] mb-4">Upcoming Services</h2>
        {upcomingServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingServices.map(service => (
                <div key={service.id} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-[#1E2A52]">{formatDate(service.date)} - {service.time}</h3>
                  <p className="text-sm text-gray-700">{service.theme}</p>
                  <div className="mt-2">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${service.bulletinReady ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      Bulletin: {service.bulletinReady ? 'Ready' : 'Pending'}
                      </span>
                  </div>
                  <Link href={`/schedule/${service.id}`} className="mt-3 text-sm text-[#F4B860] hover:underline">
                    View Plan
                  </Link>
                </div>
            ))}
            </div>
        ) : (
            <p className="text-gray-600">No upcoming services scheduled.</p>
        )}
      </div>

      {/* Quick Actions Section - Already corrected for legacyBehavior */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-[#1E2A52] mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/setlist" className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow text-[#1E2A52] hover:bg-gray-50 flex flex-col items-center justify-center">
            <>
              <MusicNoteIcon />
              <span className="mt-1 text-sm font-medium">New Set List</span>
            </>
          </Link>
          <Link href="/schedule" className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow text-[#1E2A52] hover:bg-gray-50 flex flex-col items-center justify-center">
            <>
              <CalendarIcon />
              <span className="mt-1 text-sm font-medium">Schedule Team</span>
            </>
          </Link>
          <Link href="/bulletins" className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow text-[#1E2A52] hover:bg-gray-50 flex flex-col items-center justify-center">
            <>
              <DocumentTextIcon />
              <span className="mt-1 text-sm font-medium">Create Bulletin</span>
            </>
          </Link>
           <Link href="/team" className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow text-[#1E2A52] hover:bg-gray-50 flex flex-col items-center justify-center">
            <>
              <UsersIcon />
              <span className="mt-1 text-sm font-medium">Manage Team</span>
            </>
          </Link>
        </div>
      </div>
      
      {/* PraiseSync Tips - Placeholder */}
      <div className="bg-[#e9e4dd] p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-[#1E2A52] mb-2">PraiseSync Tips ✨</h3>
        <p className="text-sm text-gray-700">
          Tip: You can quickly add songs to a set list by dragging them from your song library!
          Need help? Check out our <a href="#" className="text-[#F4B860] hover:underline">support docs</a>.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
