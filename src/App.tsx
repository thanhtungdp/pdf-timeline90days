import React, { useState } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ObjectivesList from './components/ObjectivesList';
import Reports from './components/Reports';
import Settings from './components/Settings';
import { mockData } from './data/mockData';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard data={mockData} />;
      case 'objectives':
        return <ObjectivesList data={mockData} />;
      case 'reports':
        return <Reports data={mockData} />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard data={mockData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;