import React, { useState } from 'react';
import { 
  Activity, 
  Users, 
  FileText, 
  Clock, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Calendar,
  Search,
  Filter
} from 'lucide-react';

interface CaseData {
  id: string;
  patientName: string;
  date: string;
  time: string;
  status: 'completed' | 'pending' | 'urgent';
  hemorrhageDetected: boolean;
  confidence: number;
  type?: string;
}

const Dashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data for recent cases
  const recentCases: CaseData[] = [
    {
      id: 'CT-001234',
      patientName: 'John Smith',
      date: '2025-01-15',
      time: '14:30',
      status: 'completed',
      hemorrhageDetected: true,
      confidence: 0.94,
      type: 'Subdural'
    },
    {
      id: 'CT-001235',
      patientName: 'Sarah Johnson',
      date: '2025-01-15',
      time: '13:45',
      status: 'completed',
      hemorrhageDetected: false,
      confidence: 0.98
    },
    {
      id: 'CT-001236',
      patientName: 'Michael Brown',
      date: '2025-01-15',
      time: '12:20',
      status: 'urgent',
      hemorrhageDetected: true,
      confidence: 0.91,
      type: 'Epidural'
    },
    {
      id: 'CT-001237',
      patientName: 'Emily Davis',
      date: '2025-01-15',
      time: '11:15',
      status: 'pending',
      hemorrhageDetected: false,
      confidence: 0.89
    }
  ];

  const stats = {
    totalCases: 156,
    todayCases: 12,
    hemorrhageDetected: 23,
    avgConfidence: 94.2
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-900/50 text-green-300 border-green-700';
      case 'pending':
        return 'bg-yellow-900/50 text-yellow-300 border-yellow-700';
      case 'urgent':
        return 'bg-red-900/50 text-red-300 border-red-700';
      default:
        return 'bg-slate-700 text-slate-300 border-slate-600';
    }
  };

  const filteredCases = recentCases.filter(case_ => {
    const matchesSearch = case_.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         case_.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || case_.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-24 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
          <p className="text-slate-300">Your diagnostic dashboard and case management</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800 rounded-xl border border-blue-700/30 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Cases</p>
                <p className="text-2xl font-bold text-white">{stats.totalCases}</p>
              </div>
              <div className="bg-blue-600 p-3 rounded-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl border border-blue-700/30 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Today's Cases</p>
                <p className="text-2xl font-bold text-white">{stats.todayCases}</p>
              </div>
              <div className="bg-green-600 p-3 rounded-lg">
                <Activity className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl border border-blue-700/30 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Hemorrhages Detected</p>
                <p className="text-2xl font-bold text-white">{stats.hemorrhageDetected}</p>
              </div>
              <div className="bg-red-600 p-3 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl border border-blue-700/30 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Avg. Confidence</p>
                <p className="text-2xl font-bold text-white">{stats.avgConfidence}%</p>
              </div>
              <div className="bg-purple-600 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Cases Section */}
        <div className="bg-slate-800 rounded-xl border border-blue-700/30 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Recent Cases</h2>
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search cases..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              {/* Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="pl-10 pr-8 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>
          </div>

          {/* Cases Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Case ID</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Patient</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Date & Time</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Result</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Confidence</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Type</th>
                </tr>
              </thead>
              <tbody>
                {filteredCases.map((case_) => (
                  <tr key={case_.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                    <td className="py-4 px-4">
                      <span className="text-blue-400 font-mono text-sm">{case_.id}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-white font-medium">{case_.patientName}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-slate-300 text-sm">
                        <div>{case_.date}</div>
                        <div className="text-slate-400">{case_.time}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(case_.status)}`}>
                        {case_.status.charAt(0).toUpperCase() + case_.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        {case_.hemorrhageDetected ? (
                          <XCircle className="h-5 w-5 text-red-400" />
                        ) : (
                          <CheckCircle className="h-5 w-5 text-green-400" />
                        )}
                        <span className={`text-sm font-medium ${case_.hemorrhageDetected ? 'text-red-300' : 'text-green-300'}`}>
                          {case_.hemorrhageDetected ? 'Detected' : 'Clear'}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-white font-medium">{(case_.confidence * 100).toFixed(1)}%</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-slate-300">
                        {case_.type || '-'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredCases.length === 0 && (
            <div className="text-center py-8">
              <div className="text-slate-400 mb-2">No cases found</div>
              <div className="text-slate-500 text-sm">Try adjusting your search or filter criteria</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;