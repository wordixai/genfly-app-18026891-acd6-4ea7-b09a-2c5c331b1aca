import Link from 'next/link';
import { ArrowLeft, BarChart3, Building, Calendar, Home, Settings, Users, Wallet } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white h-screen shadow-md p-6 hidden md:block">
          <div className="mb-8">
            <h2 className="text-xl font-bold">REMS Dashboard</h2>
          </div>
          
          <nav>
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard" className="flex items-center p-2 rounded-md bg-blue-50 text-blue-700">
                  <Home className="mr-3" size={18} />
                  <span>Overview</span>
                </Link>
              </li>
              <li>
                <Link href="/dashboard/properties" className="flex items-center p-2 rounded-md hover:bg-gray-100">
                  <Building className="mr-3" size={18} />
                  <span>Properties</span>
                </Link>
              </li>
              <li>
                <Link href="/dashboard/tenants" className="flex items-center p-2 rounded-md hover:bg-gray-100">
                  <Users className="mr-3" size={18} />
                  <span>Tenants</span>
                </Link>
              </li>
              <li>
                <Link href="/dashboard/finances" className="flex items-center p-2 rounded-md hover:bg-gray-100">
                  <Wallet className="mr-3" size={18} />
                  <span>Finances</span>
                </Link>
              </li>
              <li>
                <Link href="/dashboard/calendar" className="flex items-center p-2 rounded-md hover:bg-gray-100">
                  <Calendar className="mr-3" size={18} />
                  <span>Calendar</span>
                </Link>
              </li>
              <li>
                <Link href="/dashboard/analytics" className="flex items-center p-2 rounded-md hover:bg-gray-100">
                  <BarChart3 className="mr-3" size={18} />
                  <span>Analytics</span>
                </Link>
              </li>
              <li>
                <Link href="/dashboard/settings" className="flex items-center p-2 rounded-md hover:bg-gray-100">
                  <Settings className="mr-3" size={18} />
                  <span>Settings</span>
                </Link>
              </li>
            </ul>
          </nav>
          
          <div className="mt-auto pt-8">
            <a href="http://localhost:8501" target="_blank" rel="noopener noreferrer" className="flex items-center p-2 bg-green-100 text-green-700 rounded-md">
              <BarChart3 className="mr-2" size={18} />
              <span>Streamlit Dashboard</span>
            </a>
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex-1 p-8">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <Link href="/" className="flex items-center text-gray-600 mb-4">
                <ArrowLeft size={16} className="mr-2" />
                Back to Home
              </Link>
              <h1 className="text-2xl font-bold">Dashboard Overview</h1>
            </div>
            <div>
              <a href="http://localhost:8501" target="_blank" rel="noopener noreferrer" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors flex items-center">
                <BarChart3 className="mr-2" size={18} />
                Open Streamlit Dashboard
              </a>
            </div>
          </div>
          
          {/* Dashboard content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-gray-500 text-sm font-medium mb-2">Total Properties</h3>
              <div className="flex items-end">
                <span className="text-3xl font-bold">5</span>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-gray-500 text-sm font-medium mb-2">Active Tenants</h3>
              <div className="flex items-end">
                <span className="text-3xl font-bold">12</span>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-gray-500 text-sm font-medium mb-2">Pending Tasks</h3>
              <div className="flex items-end">
                <span className="text-3xl font-bold">8</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4 py-1">
                  <p className="font-medium">New tenant application received</p>
                  <p className="text-sm text-gray-500">Today, 10:30 AM</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4 py-1">
                  <p className="font-medium">Rent payment received</p>
                  <p className="text-sm text-gray-500">Yesterday, 2:15 PM</p>
                </div>
                <div className="border-l-4 border-yellow-500 pl-4 py-1">
                  <p className="font-medium">Maintenance request submitted</p>
                  <p className="text-sm text-gray-500">Yesterday, 9:45 AM</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4 py-1">
                  <p className="font-medium">Lease agreement signed</p>
                  <p className="text-sm text-gray-500">Aug 15, 2023</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold mb-4">Upcoming Events</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-blue-100 text-blue-800 p-2 rounded mr-4 text-center min-w-16">
                    <div className="text-sm">AUG</div>
                    <div className="text-xl font-bold">18</div>
                  </div>
                  <div>
                    <p className="font-medium">Property Inspection</p>
                    <p className="text-sm text-gray-500">123 Main St, 10:00 AM</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-100 text-green-800 p-2 rounded mr-4 text-center min-w-16">
                    <div className="text-sm">AUG</div>
                    <div className="text-xl font-bold">20</div>
                  </div>
                  <div>
                    <p className="font-medium">Tenant Meeting</p>
                    <p className="text-sm text-gray-500">456 Oak Ave, 2:00 PM</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-purple-100 text-purple-800 p-2 rounded mr-4 text-center min-w-16">
                    <div className="text-sm">AUG</div>
                    <div className="text-xl font-bold">25</div>
                  </div>
                  <div>
                    <p className="font-medium">Lease Renewal</p>
                    <p className="text-sm text-gray-500">789 Pine St, 11:30 AM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}