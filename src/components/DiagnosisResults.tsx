import React from 'react';
import { AlertTriangle, CheckCircle, XCircle, Brain, Activity, FileText, Printer } from 'lucide-react';

interface DiagnosisData {
  hemorrhageDetected: boolean;
  type: string;
  confidence: string;
  location: string;
  volume: string;
  urgency: 'Low' | 'Medium' | 'High';
}

interface DiagnosisResultsProps {
  results: DiagnosisData | null;
  patientName: string;
}

const DiagnosisResults: React.FC<DiagnosisResultsProps> = ({ results, patientName }) => {
  if (!results) {
    return (
      <div className="bg-slate-800 rounded-xl border-2 border-blue-700/30 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-slate-700 p-2 rounded-lg">
            <Brain className="h-6 w-6 text-slate-400" />
          </div>
          <h2 className="text-xl font-bold text-white">Analysis Results</h2>
        </div>
        <div className="text-center py-8">
          <Activity className="h-12 w-12 text-slate-500 mx-auto mb-4" />
          <p className="text-slate-400">Upload a CT scan and run analysis to see results</p>
        </div>
      </div>
    );
  }

  const urgencyColors = {
    Low: { bg: 'bg-green-900/50', border: 'border-green-700', text: 'text-green-300', icon: 'text-green-400' },
    Medium: { bg: 'bg-yellow-900/50', border: 'border-yellow-700', text: 'text-yellow-300', icon: 'text-yellow-400' },
    High: { bg: 'bg-red-900/50', border: 'border-red-700', text: 'text-red-300', icon: 'text-red-400' }
  };

  const colors = urgencyColors[results.urgency];

  return (
    <div className="bg-slate-800 rounded-xl border-2 border-blue-700/30 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${results.hemorrhageDetected ? 'bg-red-900/50' : 'bg-green-900/50'}`}>
            <Brain className={`h-6 w-6 ${results.hemorrhageDetected ? 'text-red-400' : 'text-green-400'}`} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Analysis Results</h2>
            <p className="text-sm text-blue-300">AI-Assisted Diagnosis</p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button className="flex items-center space-x-2 px-4 py-2 text-slate-400 hover:text-blue-400 border border-slate-600 rounded-lg hover:border-blue-500 transition-colors">
            <FileText className="h-4 w-4" />
            <span>Export</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 text-slate-400 hover:text-blue-400 border border-slate-600 rounded-lg hover:border-blue-500 transition-colors">
            <Printer className="h-4 w-4" />
            <span>Print</span>
          </button>
        </div>
      </div>

      {/* Primary Finding */}
      <div className={`mb-6 p-4 rounded-xl border-2 ${results.hemorrhageDetected ? 'bg-red-900/30 border-red-700' : 'bg-green-900/30 border-green-700'}`}>
        <div className="flex items-center space-x-3">
          {results.hemorrhageDetected ? (
            <XCircle className="h-8 w-8 text-red-400" />
          ) : (
            <CheckCircle className="h-8 w-8 text-green-400" />
          )}
          <div>
            <h3 className={`text-lg font-bold ${results.hemorrhageDetected ? 'text-red-300' : 'text-green-300'}`}>
              {results.hemorrhageDetected ? 'Hemorrhage Detected' : 'No Hemorrhage Detected'}
            </h3>
            <p className={`text-sm ${results.hemorrhageDetected ? 'text-red-400' : 'text-green-400'}`}>
              Confidence: {(parseFloat(results.confidence) * 100).toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      {results.hemorrhageDetected && (
        <div className="space-y-4">
          {/* Hemorrhage Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-700 p-4 rounded-lg border border-slate-600">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="font-medium text-slate-300">Hemorrhage Type</span>
              </div>
              <p className="text-lg font-bold text-white">{results.type} Hemorrhage</p>
            </div>
            
            <div className="bg-slate-700 p-4 rounded-lg border border-slate-600">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="font-medium text-slate-300">Location</span>
              </div>
              <p className="text-lg font-bold text-white">{results.location}</p>
            </div>
            
            <div className="bg-slate-700 p-4 rounded-lg border border-slate-600">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="font-medium text-slate-300">Estimated Volume</span>
              </div>
              <p className="text-lg font-bold text-white">{results.volume} mL</p>
            </div>
            
            <div className={`p-4 rounded-lg border-2 ${colors.bg} ${colors.border}`}>
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className={`h-5 w-5 ${colors.icon}`} />
                <span className={`font-medium ${colors.text}`}>Clinical Priority</span>
              </div>
              <p className={`text-lg font-bold ${colors.text}`}>{results.urgency} Priority</p>
            </div>
          </div>

          {/* Clinical Recommendations */}
          <div className="bg-blue-900/30 border-2 border-blue-700 p-4 rounded-lg">
            <h4 className="font-bold text-blue-300 mb-2">Clinical Recommendations</h4>
            <ul className="text-sm text-blue-200 space-y-1">
              {results.urgency === 'High' && (
                <>
                  <li>• Immediate neurosurgical consultation</li>
                  <li>• Consider emergency intervention</li>
                  <li>• Continuous monitoring required</li>
                </>
              )}
              {results.urgency === 'Medium' && (
                <>
                  <li>• Neurological consultation within 24 hours</li>
                  <li>• Monitor for neurological changes</li>
                  <li>• Follow-up imaging as indicated</li>
                </>
              )}
              {results.urgency === 'Low' && (
                <>
                  <li>• Routine follow-up with neurology</li>
                  <li>• Conservative management may be appropriate</li>
                  <li>• Symptom monitoring</li>
                </>
              )}
            </ul>
          </div>
        </div>
      )}

      {/* Report Summary */}
      <div className="mt-6 pt-4 border-t border-slate-700">
        <div className="flex justify-between items-center text-sm text-slate-400">
          <span>Patient: {patientName || 'Unknown'}</span>
          <span>Analysis Date: {new Date().toLocaleDateString()}</span>
          <span>System: Medisoma v2.1</span>
        </div>
      </div>
    </div>
  );
};

export default DiagnosisResults;