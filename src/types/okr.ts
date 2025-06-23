export interface KeyResult {
  id: string;
  title: string;
  description: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  progress: number;
  status: 'on-track' | 'at-risk' | 'behind' | 'completed';
  owner: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  startDate: string;
  milestones?: Milestone[];
}

export interface Milestone {
  id: string;
  title: string;
  date: string;
  completed: boolean;
  description?: string;
}

export interface Objective {
  id: string;
  title: string;
  description: string;
  keyResults: KeyResult[];
  owner: string;
  team: string;
  quarter: string;
  year: number;
  progress: number;
  status: 'on-track' | 'at-risk' | 'behind' | 'completed';
  priority: 'high' | 'medium' | 'low';
  createdAt: string;
  updatedAt: string;
  dueDate: string;
  startDate: string;
  keyActions?: KeyAction[];
}

export interface KeyAction {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  progress: number;
  status: 'not-started' | 'in-progress' | 'completed' | 'blocked';
  assignee: string;
  dependencies?: string[];
}

export interface Team {
  id: string;
  name: string;
  color: string;
  members: string[];
}

export interface OKRData {
  objectives: Objective[];
  teams: Team[];
}