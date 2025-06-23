import React from 'react';
import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';
import { OKRData, Objective, KeyAction } from '../types/okr';
import { format, addDays, differenceInDays, startOfQuarter, endOfQuarter } from 'date-fns';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
    fontFamily: 'Helvetica',
    fontSize: 10,
  },
  header: {
    marginBottom: 20,
    borderBottom: 2,
    borderBottomColor: '#2563EB',
    paddingBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 3,
  },
  ganttContainer: {
    marginBottom: 20,
  },
  ganttHeader: {
    flexDirection: 'row',
    borderBottom: 1,
    borderBottomColor: '#e5e7eb',
    paddingBottom: 8,
    marginBottom: 10,
  },
  taskColumn: {
    width: '35%',
    paddingRight: 10,
  },
  timelineColumn: {
    width: '65%',
    flexDirection: 'row',
  },
  weekHeader: {
    flex: 1,
    textAlign: 'center',
    fontSize: 8,
    color: '#6b7280',
    paddingVertical: 4,
    borderRight: 1,
    borderRightColor: '#f3f4f6',
  },
  objectiveRow: {
    marginBottom: 15,
    borderLeft: 3,
    borderLeftColor: '#2563EB',
    paddingLeft: 8,
  },
  objectiveHeader: {
    flexDirection: 'row',
    marginBottom: 8,
    backgroundColor: '#f8fafc',
    padding: 6,
    borderRadius: 4,
  },
  objectiveTitle: {
    width: '35%',
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1f2937',
    paddingRight: 10,
  },
  objectiveTimeline: {
    width: '65%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskRow: {
    flexDirection: 'row',
    marginBottom: 6,
    alignItems: 'center',
  },
  taskName: {
    width: '35%',
    fontSize: 9,
    color: '#374151',
    paddingRight: 10,
    paddingLeft: 15,
  },
  taskTimeline: {
    width: '65%',
    flexDirection: 'row',
    height: 16,
    alignItems: 'center',
  },
  weekCell: {
    flex: 1,
    height: 16,
    borderRight: 1,
    borderRightColor: '#f3f4f6',
    position: 'relative',
  },
  taskBar: {
    height: 12,
    borderRadius: 2,
    marginVertical: 2,
    position: 'absolute',
  },
  taskBarCompleted: {
    backgroundColor: '#059669',
  },
  taskBarInProgress: {
    backgroundColor: '#2563EB',
  },
  taskBarNotStarted: {
    backgroundColor: '#9ca3af',
  },
  taskBarBlocked: {
    backgroundColor: '#dc2626',
  },
  milestone: {
    position: 'absolute',
    width: 8,
    height: 8,
    backgroundColor: '#f59e0b',
    borderRadius: 4,
    top: 4,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
    paddingTop: 10,
    borderTop: 1,
    borderTopColor: '#e5e7eb',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 12,
    height: 8,
    marginRight: 4,
    borderRadius: 2,
  },
  legendText: {
    fontSize: 8,
    color: '#6b7280',
  },
  summarySection: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 10,
  },
  summaryGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryItem: {
    alignItems: 'center',
    width: '22%',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 2,
  },
  summaryLabel: {
    fontSize: 8,
    color: '#64748b',
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 8,
    color: '#9ca3af',
    borderTop: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 8,
  },
});

interface GanttPDFReportProps {
  data: OKRData;
}

const GanttPDFReport: React.FC<GanttPDFReportProps> = ({ data }) => {
  const quarterStart = new Date('2025-01-01');
  const quarterEnd = new Date('2025-03-31');
  const totalDays = differenceInDays(quarterEnd, quarterStart) + 1;
  const totalWeeks = 12;

  // Generate week headers
  const weekHeaders = Array.from({ length: totalWeeks }, (_, i) => {
    const weekStart = addDays(quarterStart, i * 7);
    return format(weekStart, 'MMM dd');
  });

  const getTaskBarStyle = (action: KeyAction, weekIndex: number) => {
    const actionStart = new Date(action.startDate);
    const actionEnd = new Date(action.endDate);
    const weekStart = addDays(quarterStart, weekIndex * 7);
    const weekEnd = addDays(weekStart, 6);

    // Check if this week overlaps with the action
    if (actionEnd < weekStart || actionStart > weekEnd) {
      return null;
    }

    // Calculate position and width within the week
    const overlapStart = actionStart > weekStart ? actionStart : weekStart;
    const overlapEnd = actionEnd < weekEnd ? actionEnd : weekEnd;
    
    const startOffset = Math.max(0, differenceInDays(overlapStart, weekStart)) / 7;
    const width = (differenceInDays(overlapEnd, overlapStart) + 1) / 7;

    let backgroundColor = '#9ca3af'; // not-started
    if (action.status === 'completed') backgroundColor = '#059669';
    else if (action.status === 'in-progress') backgroundColor = '#2563EB';
    else if (action.status === 'blocked') backgroundColor = '#dc2626';

    return {
      left: `${startOffset * 100}%`,
      width: `${width * 100}%`,
      backgroundColor,
    };
  };

  const getMilestonePosition = (milestoneDate: string, weekIndex: number) => {
    const milestone = new Date(milestoneDate);
    const weekStart = addDays(quarterStart, weekIndex * 7);
    const weekEnd = addDays(weekStart, 6);

    if (milestone < weekStart || milestone > weekEnd) {
      return null;
    }

    const position = differenceInDays(milestone, weekStart) / 7;
    return {
      left: `${position * 100}%`,
    };
  };

  // Calculate summary statistics
  const totalActions = data.objectives.reduce((sum, obj) => sum + (obj.keyActions?.length || 0), 0);
  const completedActions = data.objectives.reduce((sum, obj) => 
    sum + (obj.keyActions?.filter(action => action.status === 'completed').length || 0), 0);
  const inProgressActions = data.objectives.reduce((sum, obj) => 
    sum + (obj.keyActions?.filter(action => action.status === 'in-progress').length || 0), 0);
  const averageProgress = Math.round(data.objectives.reduce((sum, obj) => sum + obj.progress, 0) / data.objectives.length);

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>OKR Gantt Timeline - Q1 2025</Text>
          <Text style={styles.subtitle}>12-Week Project Timeline & Key Actions</Text>
          <Text style={styles.subtitle}>Generated on {format(new Date(), 'MMMM dd, yyyy')}</Text>
        </View>

        {/* Gantt Chart */}
        <View style={styles.ganttContainer}>
          {/* Timeline Header */}
          <View style={styles.ganttHeader}>
            <View style={styles.taskColumn}>
              <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#374151' }}>
                Objectives & Key Actions
              </Text>
            </View>
            <View style={styles.timelineColumn}>
              {weekHeaders.map((week, index) => (
                <Text key={index} style={styles.weekHeader}>
                  Week {index + 1}{'\n'}{week}
                </Text>
              ))}
            </View>
          </View>

          {/* Objectives and Actions */}
          {data.objectives.map((objective) => (
            <View key={objective.id} style={styles.objectiveRow}>
              {/* Objective Header */}
              <View style={styles.objectiveHeader}>
                <Text style={styles.objectiveTitle}>
                  {objective.title} ({objective.progress}%)
                </Text>
                <View style={styles.objectiveTimeline}>
                  {Array.from({ length: totalWeeks }, (_, weekIndex) => (
                    <View key={weekIndex} style={styles.weekCell}>
                      {/* Objective milestones from key results */}
                      {objective.keyResults.map((kr) =>
                        kr.milestones?.map((milestone) => {
                          const position = getMilestonePosition(milestone.date, weekIndex);
                          return position ? (
                            <View
                              key={milestone.id}
                              style={[
                                styles.milestone,
                                position,
                                { backgroundColor: milestone.completed ? '#059669' : '#f59e0b' }
                              ]}
                            />
                          ) : null;
                        })
                      )}
                    </View>
                  ))}
                </View>
              </View>

              {/* Key Actions */}
              {objective.keyActions?.map((action) => (
                <View key={action.id} style={styles.taskRow}>
                  <Text style={styles.taskName}>
                    {action.title} ({action.progress}%)
                  </Text>
                  <View style={styles.taskTimeline}>
                    {Array.from({ length: totalWeeks }, (_, weekIndex) => {
                      const barStyle = getTaskBarStyle(action, weekIndex);
                      return (
                        <View key={weekIndex} style={styles.weekCell}>
                          {barStyle && (
                            <View style={[styles.taskBar, barStyle]} />
                          )}
                        </View>
                      );
                    })}
                  </View>
                </View>
              ))}
            </View>
          ))}
        </View>

        {/* Legend */}
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#059669' }]} />
            <Text style={styles.legendText}>Completed</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#2563EB' }]} />
            <Text style={styles.legendText}>In Progress</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#9ca3af' }]} />
            <Text style={styles.legendText}>Not Started</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#dc2626' }]} />
            <Text style={styles.legendText}>Blocked</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#f59e0b', borderRadius: 4 }]} />
            <Text style={styles.legendText}>Milestones</Text>
          </View>
        </View>

        {/* Summary Section */}
        <View style={styles.summarySection}>
          <Text style={styles.summaryTitle}>Quarter Summary</Text>
          <View style={styles.summaryGrid}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{data.objectives.length}</Text>
              <Text style={styles.summaryLabel}>Total Objectives</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{totalActions}</Text>
              <Text style={styles.summaryLabel}>Key Actions</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{completedActions}</Text>
              <Text style={styles.summaryLabel}>Completed Actions</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{averageProgress}%</Text>
              <Text style={styles.summaryLabel}>Average Progress</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          OKR Management System - Gantt Timeline Report - Confidential
        </Text>
      </Page>
    </Document>
  );
};

export default GanttPDFReport;