import React from 'react';
import { Bell, Users, Globe, Shield, Palette, Download } from 'lucide-react';

const Settings: React.FC = () => {
  const settingSections = [
    {
      title: 'Notifications',
      icon: Bell,
      description: 'Manage your notification preferences',
      settings: [
        { label: 'Email notifications for objective updates', enabled: true },
        { label: 'Push notifications for deadline reminders', enabled: true },
        { label: 'Weekly progress summaries', enabled: false },
        { label: 'Team achievement alerts', enabled: true },
      ]
    },
    {
      title: 'Team Management',
      icon: Users,
      description: 'Configure team settings and permissions',
      settings: [
        { label: 'Allow team members to create objectives', enabled: true },
        { label: 'Require approval for new key results', enabled: false },
        { label: 'Enable cross-team collaboration', enabled: true },
        { label: 'Show team progress publicly', enabled: false },
      ]
    },
    {
      title: 'General',
      icon: Globe,
      description: 'General application settings',
      settings: [
        { label: 'Use dark mode', enabled: false },
        { label: 'Show progress percentages', enabled: true },
        { label: 'Enable analytics tracking', enabled: true },
        { label: 'Auto-save changes', enabled: true },
      ]
    },
    {
      title: 'Privacy & Security',
      icon: Shield,
      description: 'Manage your privacy and security settings',
      settings: [
        { label: 'Two-factor authentication', enabled: true },
        { label: 'Data export allowed', enabled: true },
        { label: 'Activity logging', enabled: true },
        { label: 'Share usage analytics', enabled: false },
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Settings</h2>
        <p className="text-gray-600">
          Customize your OKR management experience and configure team preferences.
        </p>
      </div>

      {/* Profile Section */}
      <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Profile Settings</h3>
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-white">JD</span>
          </div>
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  defaultValue="John Doe"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  defaultValue="john.doe@company.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Product Manager</option>
                  <option>Team Lead</option>
                  <option>Developer</option>
                  <option>Designer</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Engineering</option>
                  <option>Product</option>
                  <option>Marketing</option>
                  <option>Sales</option>
                </select>
              </div>
            </div>
            <button className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200">
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {settingSections.map((section, index) => {
          const Icon = section.icon;
          return (
            <div key={index} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-gray-50 rounded-xl">
                  <Icon className="h-6 w-6 text-gray-700" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                  <p className="text-sm text-gray-600">{section.description}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {section.settings.map((setting, settingIndex) => (
                  <div key={settingIndex} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{setting.label}</span>
                    <button
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        setting.enabled ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          setting.enabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Data Management */}
      <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Data Management</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-blue-50 rounded-xl border border-blue-200">
            <Download className="h-8 w-8 text-blue-600 mx-auto mb-4" />
            <h4 className="font-semibold text-gray-900 mb-2">Export Data</h4>
            <p className="text-sm text-gray-600 mb-4">Download all your OKR data</p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Export
            </button>
          </div>
          
          <div className="text-center p-6 bg-green-50 rounded-xl border border-green-200">
            <Palette className="h-8 w-8 text-green-600 mx-auto mb-4" />
            <h4 className="font-semibold text-gray-900 mb-2">Theme</h4>
            <p className="text-sm text-gray-600 mb-4">Customize your interface</p>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Customize
            </button>
          </div>
          
          <div className="text-center p-6 bg-red-50 rounded-xl border border-red-200">
            <Shield className="h-8 w-8 text-red-600 mx-auto mb-4" />
            <h4 className="font-semibold text-gray-900 mb-2">Reset</h4>
            <p className="text-sm text-gray-600 mb-4">Reset all settings to default</p>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;