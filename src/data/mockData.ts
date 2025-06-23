import { OKRData } from '../types/okr';

export const mockData: OKRData = {
  teams: [
    { id: '1', name: 'Engineering', color: '#2563EB', members: ['John Doe', 'Jane Smith', 'Mike Johnson'] },
    { id: '2', name: 'Product', color: '#7C3AED', members: ['Sarah Wilson', 'Tom Brown'] },
    { id: '3', name: 'Marketing', color: '#059669', members: ['Lisa Chen', 'David Garcia'] },
    { id: '4', name: 'Sales', color: '#DC2626', members: ['Emily Davis', 'Alex Rodriguez'] },
  ],
  objectives: [
    {
      id: '1',
      title: 'Improve Product Performance',
      description: 'Enhance application speed and user experience across all platforms',
      owner: 'John Doe',
      team: 'Engineering',
      quarter: 'Q1',
      year: 2025,
      priority: 'high',
      status: 'on-track',
      progress: 75,
      createdAt: '2025-01-01',
      updatedAt: '2025-01-15',
      dueDate: '2025-03-31',
      startDate: '2025-01-01',
      keyActions: [
        {
          id: '1-a1',
          title: 'Performance Audit & Analysis',
          description: 'Conduct comprehensive performance analysis',
          startDate: '2025-01-01',
          endDate: '2025-01-14',
          progress: 100,
          status: 'completed',
          assignee: 'Jane Smith'
        },
        {
          id: '1-a2',
          title: 'Code Optimization Sprint',
          description: 'Optimize critical code paths and database queries',
          startDate: '2025-01-15',
          endDate: '2025-02-15',
          progress: 80,
          status: 'in-progress',
          assignee: 'Mike Johnson'
        },
        {
          id: '1-a3',
          title: 'Performance Testing & Validation',
          description: 'Comprehensive testing of performance improvements',
          startDate: '2025-02-16',
          endDate: '2025-03-15',
          progress: 20,
          status: 'in-progress',
          assignee: 'John Doe'
        },
        {
          id: '1-a4',
          title: 'Production Deployment & Monitoring',
          description: 'Deploy optimizations and monitor performance metrics',
          startDate: '2025-03-16',
          endDate: '2025-03-31',
          progress: 0,
          status: 'not-started',
          assignee: 'Jane Smith'
        }
      ],
      keyResults: [
        {
          id: '1-1',
          title: 'Reduce page load time',
          description: 'Decrease average page load time to under 2 seconds',
          targetValue: 2,
          currentValue: 2.5,
          unit: 'seconds',
          progress: 80,
          status: 'on-track',
          owner: 'Jane Smith',
          dueDate: '2025-02-28',
          createdAt: '2025-01-01',
          updatedAt: '2025-01-15',
          startDate: '2025-01-01',
          milestones: [
            { id: '1-1-m1', title: 'Baseline Measurement', date: '2025-01-07', completed: true },
            { id: '1-1-m2', title: 'Initial Optimizations', date: '2025-01-21', completed: true },
            { id: '1-1-m3', title: 'Performance Target Achieved', date: '2025-02-28', completed: false }
          ]
        },
        {
          id: '1-2',
          title: 'Improve Core Web Vitals',
          description: 'Achieve 90+ lighthouse performance score',
          targetValue: 90,
          currentValue: 75,
          unit: 'score',
          progress: 70,
          status: 'on-track',
          owner: 'Mike Johnson',
          dueDate: '2025-03-15',
          createdAt: '2025-01-01',
          updatedAt: '2025-01-15',
          startDate: '2025-01-15',
          milestones: [
            { id: '1-2-m1', title: 'Audit Complete', date: '2025-01-28', completed: true },
            { id: '1-2-m2', title: 'Critical Issues Fixed', date: '2025-02-15', completed: false },
            { id: '1-2-m3', title: 'Target Score Achieved', date: '2025-03-15', completed: false }
          ]
        }
      ]
    },
    {
      id: '2',
      title: 'Increase User Engagement',
      description: 'Drive higher user engagement and retention rates',
      owner: 'Sarah Wilson',
      team: 'Product',
      quarter: 'Q1',
      year: 2025,
      priority: 'high',
      status: 'at-risk',
      progress: 45,
      createdAt: '2025-01-01',
      updatedAt: '2025-01-15',
      dueDate: '2025-03-31',
      startDate: '2025-01-01',
      keyActions: [
        {
          id: '2-a1',
          title: 'User Research & Analysis',
          description: 'Conduct user interviews and analyze engagement data',
          startDate: '2025-01-01',
          endDate: '2025-01-21',
          progress: 100,
          status: 'completed',
          assignee: 'Sarah Wilson'
        },
        {
          id: '2-a2',
          title: 'Feature Design & Prototyping',
          description: 'Design new engagement features and create prototypes',
          startDate: '2025-01-22',
          endDate: '2025-02-14',
          progress: 60,
          status: 'in-progress',
          assignee: 'Tom Brown'
        },
        {
          id: '2-a3',
          title: 'A/B Testing Implementation',
          description: 'Implement and run A/B tests for new features',
          startDate: '2025-02-15',
          endDate: '2025-03-07',
          progress: 10,
          status: 'in-progress',
          assignee: 'Sarah Wilson'
        },
        {
          id: '2-a4',
          title: 'Feature Launch & Optimization',
          description: 'Launch features and optimize based on user feedback',
          startDate: '2025-03-08',
          endDate: '2025-03-31',
          progress: 0,
          status: 'not-started',
          assignee: 'Tom Brown'
        }
      ],
      keyResults: [
        {
          id: '2-1',
          title: 'Increase daily active users',
          description: 'Grow DAU by 25%',
          targetValue: 125,
          currentValue: 110,
          unit: 'percentage',
          progress: 60,
          status: 'at-risk',
          owner: 'Tom Brown',
          dueDate: '2025-03-31',
          createdAt: '2025-01-01',
          updatedAt: '2025-01-15',
          startDate: '2025-01-01',
          milestones: [
            { id: '2-1-m1', title: 'Baseline Established', date: '2025-01-14', completed: true },
            { id: '2-1-m2', title: '15% Growth Achieved', date: '2025-02-15', completed: false },
            { id: '2-1-m3', title: '25% Growth Target', date: '2025-03-31', completed: false }
          ]
        },
        {
          id: '2-2',
          title: 'Improve user retention',
          description: 'Achieve 70% 30-day retention rate',
          targetValue: 70,
          currentValue: 55,
          unit: 'percentage',
          progress: 30,
          status: 'behind',
          owner: 'Sarah Wilson',
          dueDate: '2025-03-31',
          createdAt: '2025-01-01',
          updatedAt: '2025-01-15',
          startDate: '2025-01-15',
          milestones: [
            { id: '2-2-m1', title: 'Retention Analysis Complete', date: '2025-01-28', completed: true },
            { id: '2-2-m2', title: '60% Retention Achieved', date: '2025-02-28', completed: false },
            { id: '2-2-m3', title: '70% Retention Target', date: '2025-03-31', completed: false }
          ]
        }
      ]
    },
    {
      id: '3',
      title: 'Expand Market Reach',
      description: 'Increase brand awareness and market penetration',
      owner: 'Lisa Chen',
      team: 'Marketing',
      quarter: 'Q1',
      year: 2025,
      priority: 'medium',
      status: 'on-track',
      progress: 85,
      createdAt: '2025-01-01',
      updatedAt: '2025-01-15',
      dueDate: '2025-03-31',
      startDate: '2025-01-01',
      keyActions: [
        {
          id: '3-a1',
          title: 'Market Research & Strategy',
          description: 'Analyze target markets and develop expansion strategy',
          startDate: '2025-01-01',
          endDate: '2025-01-14',
          progress: 100,
          status: 'completed',
          assignee: 'Lisa Chen'
        },
        {
          id: '3-a2',
          title: 'Content Marketing Campaign',
          description: 'Create and execute comprehensive content strategy',
          startDate: '2025-01-15',
          endDate: '2025-02-28',
          progress: 90,
          status: 'in-progress',
          assignee: 'David Garcia'
        },
        {
          id: '3-a3',
          title: 'Social Media Expansion',
          description: 'Expand presence across all major social platforms',
          startDate: '2025-02-01',
          endDate: '2025-03-15',
          progress: 75,
          status: 'in-progress',
          assignee: 'Lisa Chen'
        },
        {
          id: '3-a4',
          title: 'Partnership Development',
          description: 'Establish strategic partnerships for market expansion',
          startDate: '2025-03-01',
          endDate: '2025-03-31',
          progress: 40,
          status: 'in-progress',
          assignee: 'David Garcia'
        }
      ],
      keyResults: [
        {
          id: '3-1',
          title: 'Increase website traffic',
          description: 'Grow organic website traffic by 40%',
          targetValue: 140,
          currentValue: 130,
          unit: 'percentage',
          progress: 85,
          status: 'on-track',
          owner: 'David Garcia',
          dueDate: '2025-03-31',
          createdAt: '2025-01-01',
          updatedAt: '2025-01-15',
          startDate: '2025-01-01',
          milestones: [
            { id: '3-1-m1', title: 'SEO Optimization Complete', date: '2025-01-21', completed: true },
            { id: '3-1-m2', title: '25% Traffic Increase', date: '2025-02-15', completed: true },
            { id: '3-1-m3', title: '40% Traffic Target', date: '2025-03-31', completed: false }
          ]
        },
        {
          id: '3-2',
          title: 'Social media engagement',
          description: 'Achieve 50K followers across all platforms',
          targetValue: 50000,
          currentValue: 42000,
          unit: 'followers',
          progress: 84,
          status: 'on-track',
          owner: 'Lisa Chen',
          dueDate: '2025-03-31',
          createdAt: '2025-01-01',
          updatedAt: '2025-01-15',
          startDate: '2025-01-01',
          milestones: [
            { id: '3-2-m1', title: '35K Followers', date: '2025-01-31', completed: true },
            { id: '3-2-m2', title: '45K Followers', date: '2025-02-28', completed: true },
            { id: '3-2-m3', title: '50K Followers Target', date: '2025-03-31', completed: false }
          ]
        }
      ]
    }
  ]
};