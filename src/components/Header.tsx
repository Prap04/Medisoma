import React from 'react';
import { Brain, FileText, Settings, User, LogOut } from 'lucide-react';

interface HeaderProps {
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  return (
    <header className="bg-slate-900 shadow-lg border-b border-blue-800/30">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-2 rounded-xl">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Medisoma</h1>
              <p className="text-sm text-blue-300">CT Hemorrhage Analysis System</p>
            </div>
          </div>
          
          <nav className="flex items-center space-x-6">
            <button className="flex items-center space-x-2 px-4 py-2 text-slate-300 hover:text-blue-400 transition-colors">
              <FileText className="h-5 w-5" />
              <span>Reports</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 text-slate-300 hover:text-blue-400 transition-colors">
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </button>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-4 py-2 bg-slate-800 rounded-lg border border-slate-700">
                <User className="h-5 w-5 text-slate-400" />
                <span className="text-sm font-medium text-slate-300">Dr. Smith</span>
              </div>
              {onLogout && (
                <button
                  onClick={onLogout}
                  className="flex items-center space-x-2 px-4 py-2 text-slate-400 hover:text-red-400 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;