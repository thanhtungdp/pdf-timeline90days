import React from 'react';
import { Download, FileText, Calendar, TrendingUp, Users, Target, BarChart3 } from 'lucide-react';
import { pdf } from '@react-pdf/renderer';
import { OKRData } from '../types/okr';
import PDFReport from './PDFReport';
import GanttPDFReport from './GanttPDFReport';
import { format } from 'date-fns';

interface ReportsProps {
  data: OKRData;
}

const Reports: React.FC<ReportsProps> = ({ data }) => {
  const generatePDFReport = async () => {
    try {
      const doc = <PDFReport data={data} />;
      const asPdf = pdf(doc);
      const blob = await asPdf.toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `OKR-Report-${format(new Date(), 'yyyy-MM-dd')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const generateGanttReport = async () => {
    try {
      const doc = <GanttPDFReport data={data} />;
      const asPdf = pdf(doc);
      const blob = await asPdf.toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `OKR-Gantt-Timeline-${format(new Date(), 'yyyy-MM-dd')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating Gantt PDF:', error);
    }
  };

  const totalObjectives = data.objectives.length;
  const completedObjectives = data.objectives.filter(obj => obj.status === 'completed').length;
  const atRiskObjectives = data.objectives.filter(obj => obj.status === 'at-risk' || obj.status === 'behind').length;
  const averageProgress = Math.round(data.objectives.reduce((sum, obj) => sum + obj.progress, 0) / totalObjectives);

  const reportTypes = [
    {
      title: 'Quarterly OKR Report',
      description: 'Comprehensive overview of all objectives and key results for Q1 2025',
      icon: FileText,
      type: 'quarterly',
      color: 'blue',
      action: generatePDFReport
    },
    {
      title: 'Gantt Timeline Report',
      description: '12-week visual timeline showing OKRs and key actions with milestones',
      icon: BarChart3,
      type: 'gantt',
      color: 'purple',
      action: generateGanttReport
    },
    {
      title: 'Team Performance Report',
      description: 'Detailed analysis of team-specific objectives and progress',
      icon: Users,
      type: 'team',
      color: 'green',
      action: generatePDFReport
    },
    {
      title: 'Executive Summary',
      description: 'High-level overview for leadership and stakeholders',
      icon: Target,
      type: 'executive',
      color: 'orange',
      action: generatePDFReport
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-700 border-blue-200',
      purple: 'bg-purple-50 text-purple-700 border-purple-200',
      green: 'bg-green-50 text-green-700 border-green-200',
      orange: 'bg-orange-50 text-orange-700 border-orange-200'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Reports & Analytics</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Generate comprehensive reports including Gantt timeline views to track progress, analyze performance, and share insights with your team and stakeholders.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 text-blue-700 rounded-xl">
              <Target className="h-6 w-6" />
            </div>
            <span className="text-sm text-green-600 font-medium">+12%</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{totalObjectives}</p>
          <p className="text-sm text-gray-600">Total Objectives</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-50 text-green-700 rounded-xl">
              <TrendingUp className="h-6 w-6" />
            </div>
            <span className="text-sm text-green-600 font-medium">+25%</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{completedObjectives}</p>
          <p className="text-sm text-gray-600">Completed</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-red-50 text-red-700 rounded-xl">
              <Users className="h-6 w-6" />
            </div>
            <span className="text-sm text-red-600 font-medium">-5%</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{atRiskObjectives}</p>
          <p className="text-sm text-gray-600">At Risk</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-50 text-purple-700 rounded-xl">
              <Calendar className="h-6 w-6" />
            </div>
            <span className="text-sm text-green-600 font-medium">+8%</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{averageProgress}%</p>
          <p className="text-sm text-gray-600">Avg Progress</p>
        </div>
      </div>

      {/* Report Types */}
      <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Available Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reportTypes.map((report, index) => {
            const Icon = report.icon;
            return (
              <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${getColorClasses(report.color)}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <button
                    onClick={report.action}
                    className="inline-flex items-center px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-sm"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </button>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{report.title}</h4>
                <p className="text-gray-600 text-sm">{report.description}</p>
                {report.type === 'gantt' && (
                  <div className="mt-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <p className="text-xs text-purple-700 font-medium">
                      ✨ New: Visual timeline with 12-week breakdown, key actions, and milestone tracking
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Recent Reports</h3>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View All
          </button>
        </div>
        
        <div className="space-y-4">
          {[
            { name: 'Q1 2025 Gantt Timeline', date: '2025-01-15', size: '3.1 MB', type: 'PDF', icon: BarChart3 },
            { name: 'Q1 2025 OKR Report', date: '2025-01-15', size: '2.3 MB', type: 'PDF', icon: FileText },
            { name: 'Team Performance Analysis', date: '2025-01-10', size: '1.8 MB', type: 'PDF', icon: Users },
            { name: 'Executive Summary December', date: '2024-12-31', size: '1.2 MB', type: 'PDF', icon: Target },
          ].map((report, index) => {
            const ReportIcon = report.icon;
            return (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
                    <ReportIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{report.name}</p>
                    <p className="text-sm text-gray-600">{format(new Date(report.date), 'MMM dd, yyyy')} • {report.size}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">{report.type}</span>
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Reports;