import React from 'react';
import { TrendingUp, TrendingDown, Clock, CheckCircle, AlertTriangle, Target } from 'lucide-react';
import { OKRData } from '../types/okr';
import ProgressChart from './ProgressChart';
import ObjectiveCard from './ObjectiveCard';

interface DashboardProps {
  data: OKRData;
}

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  const totalObjectives = data.objectives.length;
  const completedObjectives = data.objectives.filter(obj => obj.status === 'completed').length;
  const atRiskObjectives = data.objectives.filter(obj => obj.status === 'at-risk' || obj.status === 'behind').length;
  const averageProgress = Math.round(data.objectives.reduce((sum, obj) => sum + obj.progress, 0) / totalObjectives);

  const stats = [
    {
      title: 'Total Objectives',
      value: totalObjectives,
      change: '+12%',
      trend: 'up',
      icon: Target,
      color: 'blue'
    },
    {
      title: 'Completed',
      value: completedObjectives,
      change: '+25%',
      trend: 'up',
      icon: CheckCircle,
      color: 'green'
    },
    {
      title: 'At Risk',
      value: atRiskObjectives,
      change: '-5%',
      trend: 'down',
      icon: AlertTriangle,
      color: 'red'
    },
    {
      title: 'Avg Progress',
      value: `${averageProgress}%`,
      change: '+8%',
      trend: 'up',
      icon: TrendingUp,
      color: 'purple'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-700 border-blue-200',
      green: 'bg-green-50 text-green-700 border-green-200',
      red: 'bg-red-50 text-red-700 border-red-200',
      purple: 'bg-purple-50 text-purple-700 border-purple-200'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${getColorClasses(stat.color)}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className={`flex items-center space-x-1 text-sm ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <TrendIcon className="h-4 w-4" />
                  <span>{stat.change}</span>
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts and Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Progress Overview</h3>
          <ProgressChart data={data} />
        </div>
        
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Team Performance</h3>
          <div className="space-y-4">
            {data.teams.map((team) => {
              const teamObjectives = data.objectives.filter(obj => obj.team === team.name);
              const teamProgress = teamObjectives.length > 0 
                ? Math.round(teamObjectives.reduce((sum, obj) => sum + obj.progress, 0) / teamObjectives.length)
                : 0;
              
              return (
                <div key={team.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: team.color }}
                    />
                    <div>
                      <p className="font-medium text-gray-900">{team.name}</p>
                      <p className="text-sm text-gray-600">{teamObjectives.length} objectives</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${teamProgress}%`,
                          backgroundColor: team.color
                        }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-gray-900 w-10">{teamProgress}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Objectives */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Recent Objectives</h3>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View All
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {data.objectives.slice(0, 4).map((objective) => (
            <ObjectiveCard key={objective.id} objective={objective} compact />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;