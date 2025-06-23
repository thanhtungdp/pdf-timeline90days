import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { OKRData } from '../types/okr';

interface ProgressChartProps {
  data: OKRData;
}

const ProgressChart: React.FC<ProgressChartProps> = ({ data }) => {
  const statusData = [
    { name: 'On Track', value: data.objectives.filter(obj => obj.status === 'on-track').length, color: '#059669' },
    { name: 'At Risk', value: data.objectives.filter(obj => obj.status === 'at-risk').length, color: '#F59E0B' },
    { name: 'Behind', value: data.objectives.filter(obj => obj.status === 'behind').length, color: '#DC2626' },
    { name: 'Completed', value: data.objectives.filter(obj => obj.status === 'completed').length, color: '#2563EB' },
  ];

  const progressData = data.objectives.map(obj => ({
    name: obj.title.substring(0, 20) + '...',
    progress: obj.progress,
    team: obj.team
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Status Distribution */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Status Distribution</h4>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-3">
            {statusData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs text-gray-600">{item.name} ({item.value})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Bar Chart */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Progress by Objective</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={progressData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis dataKey="name" type="category" width={80} fontSize={10} />
              <Tooltip />
              <Bar dataKey="progress" fill="#2563EB" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ProgressChart;