import React, { useState } from 'react';
import { Brain, Home, LayoutDashboard, MessageCircle, FileText, User, LogOut, Users } from 'lucide-react';

interface FloatingNavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onLogout?: () => void;
}

const FloatingNavbar: React.FC<FloatingNavbarProps> = ({ 
  currentView, 
  onNavigate, 
  onLogout
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'about', label: 'About Us', icon: Users },
    { id: 'contact', label: 'Contact', icon: MessageCircle },
  ];

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-slate-900/90 backdrop-blur-md border border-blue-700/30 rounded-2xl px-6 py-3 shadow-2xl">
        <div className="flex items-center space-x-8">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-2 rounded-xl">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <div className="text-white font-bold text-sm">Medisoma</div>
              <div className="text-blue-300 text-xs">CT Scan Analyser</div>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden md:inline text-sm font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 px-4 py-2 bg-slate-800 rounded-xl border border-slate-700 hover:border-blue-500 transition-all duration-200"
            >
              <User className="h-4 w-4 text-slate-400" />
              <span className="hidden sm:inline text-sm font-medium text-slate-300">User</span>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-slate-800 border border-slate-700 rounded-xl shadow-xl py-2">
                <div className="px-4 py-2 border-b border-slate-700">
                  <div className="text-white font-medium text-sm">Medical Professional</div>
                  <div className="text-slate-400 text-xs">Medisoma User</div>
                </div>
                <button className="w-full text-left px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors text-sm">
                  Profile Settings
                </button>
                <button className="w-full text-left px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors text-sm">
                  Preferences
                </button>
                {onLogout && (
                  <button
                    onClick={onLogout}
                    className="w-full text-left px-4 py-2 text-red-400 hover:text-red-300 hover:bg-slate-700 transition-colors text-sm flex items-center space-x-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default FloatingNavbar;