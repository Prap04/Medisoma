import React, { useState } from 'react';
import { User, Calendar, Clock, AlertCircle } from 'lucide-react';

interface PatientData {
  id: string;
  name: string;
  age: number;
  gender: string;
  scanDate: string;
  scanTime: string;
  symptoms: string;
  urgency: 'Low' | 'Medium' | 'High';
}

interface PatientInfoProps {
  onPatientUpdate: (data: PatientData) => void;
}

const PatientInfo: React.FC<PatientInfoProps> = ({ onPatientUpdate }) => {
  const [patientData, setPatientData] = useState<PatientData>({
    id: `CT-${Date.now().toString().slice(-6)}`,
    name: '',
    age: 0,
    gender: '',
    scanDate: new Date().toISOString().split('T')[0],
    scanTime: new Date().toTimeString().slice(0, 5),
    symptoms: '',
    urgency: 'Medium'
  });

  const handleChange = (field: keyof PatientData, value: string | number) => {
    const updatedData = { ...patientData, [field]: value };
    setPatientData(updatedData);
    onPatientUpdate(updatedData);
  };

  const urgencyColors = {
    Low: 'bg-green-900/50 text-green-300 border-green-700',
    Medium: 'bg-yellow-900/50 text-yellow-300 border-yellow-700',
    High: 'bg-red-900/50 text-red-300 border-red-700'
  };

  return (
    <div className="bg-slate-800 rounded-xl border-2 border-blue-700/30 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-blue-600 p-2 rounded-lg">
          <User className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Patient Information</h2>
          <p className="text-sm text-blue-300">Case ID: {patientData.id}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Patient Name
            </label>
            <input
              type="text"
              value={patientData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter patient name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Age
            </label>
            <input
              type="number"
              value={patientData.age || ''}
              onChange={(e) => handleChange('age', parseInt(e.target.value) || 0)}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Age"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Gender
            </label>
            <select
              value={patientData.gender}
              onChange={(e) => handleChange('gender', e.target.value)}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Urgency Level
            </label>
            <select
              value={patientData.urgency}
              onChange={(e) => handleChange('urgency', e.target.value as 'Low' | 'Medium' | 'High')}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <Calendar className="h-4 w-4 inline mr-1" />
              Scan Date
            </label>
            <input
              type="date"
              value={patientData.scanDate}
              onChange={(e) => handleChange('scanDate', e.target.value)}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <Clock className="h-4 w-4 inline mr-1" />
              Scan Time
            </label>
            <input
              type="time"
              value={patientData.scanTime}
              onChange={(e) => handleChange('scanTime', e.target.value)}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Clinical Symptoms
          </label>
          <textarea
            value={patientData.symptoms}
            onChange={(e) => handleChange('symptoms', e.target.value)}
            rows={3}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Describe patient symptoms and clinical presentation..."
          />
        </div>

        <div className={`p-3 rounded-lg border ${urgencyColors[patientData.urgency]}`}>
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5" />
            <span className="font-medium">Priority: {patientData.urgency}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientInfo;