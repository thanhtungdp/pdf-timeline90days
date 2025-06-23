import React from 'react';
import { Calendar, User, AlertTriangle, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { Objective } from '../types/okr';
import { format } from 'date-fns';

interface ObjectiveCardProps {
  objective: Objective;
  compact?: boolean;
}

const ObjectiveCard: React.FC<ObjectiveCardProps> = ({ objective, compact = false }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'on-track':
        return <TrendingUp className="h-4 w-4 text-blue-500" />;
      case 'at-risk':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'behind':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'on-track':
        return 'bg-blue-100 text-blue-800';
      case 'at-risk':
        return 'bg-yellow-100 text-yellow-800';
      case 'behind':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 ${compact ? 'p-4' : 'p-6'}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            {getStatusIcon(objective.status)}
            <h3 className={`font-semibold text-gray-900 ${compact ? 'text-sm' : 'text-lg'}`}>
              {objective.title}
            </h3>
          </div>
          {!compact && (
            <p className="text-gray-600 text-sm mb-3">{objective.description}</p>
          )}
        </div>
        <div className="flex space-x-2">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(objective.status)}`}>
            {objective.status.replace('-', ' ')}
          </span>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(objective.priority)}`}>
            {objective.priority}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm font-semibold text-gray-900">{objective.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${objective.progress}%` }}
          />
        </div>
      </div>

      {/* Key Results Preview */}
      {!compact && (
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Key Results ({objective.keyResults.length})</p>
          <div className="space-y-2">
            {objective.keyResults.slice(0, 2).map((kr) => (
              <div key={kr.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700 truncate">{kr.title}</span>
                <span className="text-xs font-medium text-gray-900">{kr.progress}%</span>
              </div>
            ))}
            {objective.keyResults.length > 2 && (
              <p className="text-xs text-gray-500">+{objective.keyResults.length - 2} more</p>
            )}
          </div>
        </div>
      )}

      {/* Meta Information */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <User className="h-4 w-4" />
            <span>{objective.owner}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{format(new Date(objective.dueDate), 'MMM dd')}</span>
          </div>
        </div>
        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">{objective.team}</span>
      </div>
    </div>
  );
};

export default ObjectiveCard;