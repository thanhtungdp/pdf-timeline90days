import React from 'react';
import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';
import { OKRData } from '../types/okr';
import { format } from 'date-fns';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 40,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 30,
    borderBottom: 2,
    borderBottomColor: '#2563EB',
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 15,
    borderBottom: 1,
    borderBottomColor: '#e5e7eb',
    paddingBottom: 5,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  column: {
    flex: 1,
  },
  objectiveCard: {
    backgroundColor: '#f9fafb',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    border: 1,
    borderColor: '#e5e7eb',
  },
  objectiveTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  objectiveDescription: {
    fontSize: 11,
    color: '#6b7280',
    marginBottom: 10,
    lineHeight: 1.4,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: 8,
    backgroundColor: '#2563EB',
    borderRadius: 4,
  },
  metaInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 10,
    color: '#6b7280',
    marginBottom: 10,
  },
  keyResult: {
    backgroundColor: '#ffffff',
    padding: 10,
    marginBottom: 8,
    borderRadius: 4,
    border: 1,
    borderColor: '#f3f4f6',
  },
  keyResultTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 4,
  },
  keyResultProgress: {
    fontSize: 10,
    color: '#6b7280',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: '#f8fafc',
    padding: 15,
    borderRadius: 8,
    border: 1,
    borderColor: '#e2e8f0',
    width: '22%',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 10,
    color: '#64748b',
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 10,
    color: '#9ca3af',
    borderTop: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 10,
  },
});

interface PDFReportProps {
  data: OKRData;
}

const PDFReport: React.FC<PDFReportProps> = ({ data }) => {
  const totalObjectives = data.objectives.length;
  const completedObjectives = data.objectives.filter(obj => obj.status === 'completed').length;
  const atRiskObjectives = data.objectives.filter(obj => obj.status === 'at-risk' || obj.status === 'behind').length;
  const averageProgress = Math.round(data.objectives.reduce((sum, obj) => sum + obj.progress, 0) / totalObjectives);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>OKR Report - Q1 2025</Text>
          <Text style={styles.subtitle}>Generated on {format(new Date(), 'MMMM dd, yyyy')}</Text>
          <Text style={styles.subtitle}>Company Performance Overview</Text>
        </View>

        {/* Executive Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Executive Summary</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{totalObjectives}</Text>
              <Text style={styles.statLabel}>Total Objectives</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{completedObjectives}</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{atRiskObjectives}</Text>
              <Text style={styles.statLabel}>At Risk</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{averageProgress}%</Text>
              <Text style={styles.statLabel}>Avg Progress</Text>
            </View>
          </View>
        </View>

        {/* Objectives Detail */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Objectives Overview</Text>
          {data.objectives.map((objective, index) => (
            <View key={objective.id} style={styles.objectiveCard}>
              <Text style={styles.objectiveTitle}>{objective.title}</Text>
              <Text style={styles.objectiveDescription}>{objective.description}</Text>
              
              <View style={styles.metaInfo}>
                <Text>Owner: {objective.owner}</Text>
                <Text>Team: {objective.team}</Text>
                <Text>Status: {objective.status.replace('-', ' ').toUpperCase()}</Text>
                <Text>Due: {format(new Date(objective.dueDate), 'MMM dd, yyyy')}</Text>
              </View>
              
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${objective.progress}%` }]} />
              </View>
              <Text style={styles.keyResultProgress}>Progress: {objective.progress}%</Text>
              
              <Text style={[styles.keyResultTitle, { marginTop: 10, marginBottom: 5 }]}>
                Key Results ({objective.keyResults.length}):
              </Text>
              {objective.keyResults.map((kr) => (
                <View key={kr.id} style={styles.keyResult}>
                  <Text style={styles.keyResultTitle}>{kr.title}</Text>
                  <Text style={styles.keyResultProgress}>
                    Progress: {kr.currentValue}/{kr.targetValue} {kr.unit} ({kr.progress}%)
                  </Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          OKR Management System - Confidential Report
        </Text>
      </Page>
    </Document>
  );
};

export default PDFReport;