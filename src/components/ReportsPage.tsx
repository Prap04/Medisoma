import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Calendar, 
  Filter, 
  Search, 
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

interface ReportData {
  id: string;
  title: string;
  date: string;
  type: 'case' | 'summary' | 'analytics';
  status: 'completed' | 'processing';
  patientCount?: number;
  hemorrhageRate?: number;
}

const ReportsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [dateRange, setDateRange] = useState('week');

  const reports: ReportData[] = [
    {
      id: 'RPT-001',
      title: 'Weekly Hemorrhage Analysis Summary',
      date: '2025-01-15',
      type: 'summary',
      status: 'completed',
      patientCount: 45,
      hemorrhageRate: 18.2
    },
    {
      id: 'RPT-002',
      title: 'Case Report - John Smith (CT-001234)',
      date: '2025-01-15',
      type: 'case',
      status: 'completed'
    },
    {
      id: 'RPT-003',
      title: 'Monthly Analytics Dashboard',
      date: '2025-01-14',
      type: 'analytics',
      status: 'completed',
      patientCount: 187,
      hemorrhageRate: 15.5
    },
    {
      id: 'RPT-004',
      title: 'Case Report - Sarah Johnson (CT-001235)',
      date: '2025-01-14',
      type: 'case',
      status: 'completed'
    },
    {
      id: 'RPT-005',
      title: 'Daily Summary Report',
      date: '2025-01-14',
      type: 'summary',
      status: 'processing',
      patientCount: 12,
      hemorrhageRate: 25.0
    }
  ];

  const analytics = {
    totalReports: 156,
    thisWeek: 12,
    avgHemorrhageRate: 16.8,
    totalPatients: 1247
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'case':
        return <FileText className="h-5 w-5" />;
      case 'summary':
        return <BarChart3 className="h-5 w-5" />;
      case 'analytics':
        return <PieChart className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'case':
        return 'bg-blue-600';
      case 'summary':
        return 'bg-green-600';
      case 'analytics':
        return 'bg-purple-600';
      default:
        return 'bg-slate-600';
    }
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || report.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-24 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Reports & Analytics</h1>
          <p className="text-slate-300">Generate, view, and download comprehensive diagnostic reports</p>
        </div>

        {/* Analytics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800 rounded-xl border border-blue-700/30 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Reports</p>
                <p className="text-2xl font-bold text-white">{analytics.totalReports}</p>
              </div>
              <div className="bg-blue-600 p-3 rounded-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl border border-blue-700/30 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">This Week</p>
                <p className="text-2xl font-bold text-white">{analytics.thisWeek}</p>
              </div>
              <div className="bg-green-600 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl border border-blue-700/30 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Avg. Hemorrhage Rate</p>
                <p className="text-2xl font-bold text-white">{analytics.avgHemorrhageRate}%</p>
              </div>
              <div className="bg-red-600 p-3 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl border border-blue-700/30 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Patients</p>
                <p className="text-2xl font-bold text-white">{analytics.totalPatients}</p>
              </div>
              <div className="bg-purple-600 p-3 rounded-lg">
                <Activity className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-slate-800 rounded-xl border border-blue-700/30 p-6 mb-8">
          <h3 className="text-lg font-bold text-white mb-4">Generate New Report</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center space-x-3 p-4 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors">
              <FileText className="h-6 w-6 text-white" />
              <div className="text-left">
                <div className="text-white font-medium">Case Report</div>
                <div className="text-blue-100 text-sm">Individual patient analysis</div>
              </div>
            </button>

            <button className="flex items-center space-x-3 p-4 bg-green-600 hover:bg-green-500 rounded-lg transition-colors">
              <BarChart3 className="h-6 w-6 text-white" />
              <div className="text-left">
                <div className="text-white font-medium">Summary Report</div>
                <div className="text-green-100 text-sm">Period overview analysis</div>
              </div>
            </button>

            <button className="flex items-center space-x-3 p-4 bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors">
              <PieChart className="h-6 w-6 text-white" />
              <div className="text-left">
                <div className="text-white font-medium">Analytics Report</div>
                <div className="text-purple-100 text-sm">Comprehensive statistics</div>
              </div>
            </button>
          </div>
        </div>

        {/* Reports List */}
        <div className="bg-slate-800 rounded-xl border border-blue-700/30 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Recent Reports</h2>
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              {/* Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="pl-10 pr-8 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                >
                  <option value="all">All Types</option>
                  <option value="case">Case Reports</option>
                  <option value="summary">Summary Reports</option>
                  <option value="analytics">Analytics Reports</option>
                </select>
              </div>

              {/* Date Range */}
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="pl-10 pr-8 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                >
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                  <option value="year">This Year</option>
                </select>
              </div>
            </div>
          </div>

          {/* Reports Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredReports.map((report) => (
              <div key={report.id} className="bg-slate-700 rounded-lg border border-slate-600 p-6 hover:border-blue-500 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${getTypeColor(report.type)}`}>
                      {getTypeIcon(report.type)}
                    </div>
                    <div>
                      <h3 className="font-bold text-white">{report.title}</h3>
                      <p className="text-slate-400 text-sm">ID: {report.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {report.status === 'completed' ? (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    ) : (
                      <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                    )}
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Date:</span>
                    <span className="text-slate-300">{report.date}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Type:</span>
                    <span className="text-slate-300 capitalize">{report.type} Report</span>
                  </div>
                  {report.patientCount && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Patients:</span>
                      <span className="text-slate-300">{report.patientCount}</span>
                    </div>
                  )}
                  {report.hemorrhageRate && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Hemorrhage Rate:</span>
                      <span className="text-slate-300">{report.hemorrhageRate}%</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    report.status === 'completed' 
                      ? 'bg-green-900/50 text-green-300 border border-green-700'
                      : 'bg-yellow-900/50 text-yellow-300 border border-yellow-700'
                  }`}>
                    {report.status === 'completed' ? 'Ready' : 'Processing'}
                  </span>
                  
                  {report.status === 'completed' && (
                    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors">
                      <Download className="h-4 w-4" />
                      <span>Download</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredReports.length === 0 && (
            <div className="text-center py-8">
              <div className="text-slate-400 mb-2">No reports found</div>
              <div className="text-slate-500 text-sm">Try adjusting your search or filter criteria</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;