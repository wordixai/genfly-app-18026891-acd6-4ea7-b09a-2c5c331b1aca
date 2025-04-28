import Link from 'next/link';
import { ArrowRight, BarChart3, Building, Home, Users, Wallet } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Real Estate Management System</h1>
        <p className="text-xl text-gray-600">Comprehensive property management and data visualization</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Home className="mr-2" size={24} />
            Property Management
          </h2>
          <p className="mb-6">
            Manage your properties, tenants, agreements, and more with our comprehensive management system.
          </p>
          <ul className="mb-6 space-y-2">
            <li className="flex items-center">
              <ArrowRight size={16} className="mr-2 text-blue-500" />
              Property listings and details
            </li>
            <li className="flex items-center">
              <ArrowRight size={16} className="mr-2 text-blue-500" />
              Tenant management
            </li>
            <li className="flex items-center">
              <ArrowRight size={16} className="mr-2 text-blue-500" />
              Lease agreements and documents
            </li>
            <li className="flex items-center">
              <ArrowRight size={16} className="mr-2 text-blue-500" />
              Maintenance tracking
            </li>
          </ul>
          <Link href="/dashboard" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
            Go to Dashboard
          </Link>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <BarChart3 className="mr-2" size={24} />
            Data Visualization
          </h2>
          <p className="mb-6">
            Gain insights from your property data with our Streamlit-powered visualization dashboard.
          </p>
          <ul className="mb-6 space-y-2">
            <li className="flex items-center">
              <ArrowRight size={16} className="mr-2 text-blue-500" />
              Property performance metrics
            </li>
            <li className="flex items-center">
              <ArrowRight size={16} className="mr-2 text-blue-500" />
              Financial analytics
            </li>
            <li className="flex items-center">
              <ArrowRight size={16} className="mr-2 text-blue-500" />
              Occupancy trends
            </li>
            <li className="flex items-center">
              <ArrowRight size={16} className="mr-2 text-blue-500" />
              Maintenance analysis
            </li>
          </ul>
          <a href="http://localhost:8501" target="_blank" rel="noopener noreferrer" className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">
            Open Streamlit Dashboard
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
          <Building className="mb-4 text-blue-600" size={32} />
          <h3 className="text-xl font-semibold mb-2">Property Portfolio</h3>
          <p>Manage your entire property portfolio in one place with detailed tracking and reporting.</p>
        </div>

        <div className="bg-green-50 p-6 rounded-lg border border-green-100">
          <Users className="mb-4 text-green-600" size={32} />
          <h3 className="text-xl font-semibold mb-2">Tenant Relations</h3>
          <p>Keep track of all tenant information, communications, and lease agreements.</p>
        </div>

        <div className="bg-purple-50 p-6 rounded-lg border border-purple-100">
          <Wallet className="mb-4 text-purple-600" size={32} />
          <h3 className="text-xl font-semibold mb-2">Financial Tracking</h3>
          <p>Monitor rent payments, expenses, and generate financial reports for your properties.</p>
        </div>
      </div>
    </div>
  );
}