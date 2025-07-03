import React, { useState } from 'react';
import { Brain, Shield, Zap, Users, ArrowRight, CheckCircle, Star, Clock, User, Calendar, AlertTriangle, XCircle, Home, LayoutDashboard, FileText, MessageCircle, LogOut } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onLogin }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'demo', label: 'Demo', icon: LayoutDashboard },
    { id: 'features', label: 'Features', icon: FileText },
    { id: 'about', label: 'About Us', icon: Users },
    { id: 'contact', label: 'Contact', icon: MessageCircle },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Floating Navigation Bar */}
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
                
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 text-slate-300 hover:text-white hover:bg-slate-800"
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
                  <button 
                    onClick={onLogin}
                    className="w-full text-left px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors text-sm"
                  >
                    Login
                  </button>
                  <button 
                    onClick={onGetStarted}
                    className="w-full text-left px-4 py-2 text-blue-400 hover:text-blue-300 hover:bg-slate-700 transition-colors text-sm flex items-center space-x-2"
                  >
                    <ArrowRight className="h-4 w-4" />
                    <span>Get Started</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Centered Title */}
      <section id="home" className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Centered Main Title */}
          <div className="text-center mb-16 pt-16">
            <div className="inline-flex items-center space-x-2 bg-blue-900/50 px-4 py-2 rounded-full border border-blue-700/50 mb-6">
              <Brain className="h-4 w-4 text-blue-400" />
              <span className="text-blue-200 text-sm">Advanced AI Trained</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Advanced CT Scan
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent block">
                Analysis
              </span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed max-w-4xl mx-auto mb-8">
              Revolutionary AI-powered platform for rapid and accurate hemorrhage detection in CT scans. 
              Upload DICOM images directly and get real-time analysis to enhance diagnostic precision and save critical time in emergency situations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={onGetStarted}
                className="flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-500 hover:to-cyan-500 transition-all duration-200 font-semibold text-lg"
              >
                <span>Start Analysis</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button 
                onClick={() => scrollToSection('demo')}
                className="px-8 py-4 border border-blue-500/50 text-blue-300 rounded-xl hover:border-blue-400 hover:text-white transition-all duration-200 font-semibold"
              >
                Watch Demo
              </button>
            </div>

            <div className="flex items-center justify-center space-x-12">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">96%</div>
                <div className="text-sm text-slate-400">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{"<30s"}</div>
                <div className="text-sm text-slate-400">Analysis Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">6000+</div>
                <div className="text-sm text-slate-400">Training Images</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Analysis Section */}
      <section id="demo" className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Get Real-Time Analysis Like This</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              See how our AI instantly analyzes CT scans and provides comprehensive diagnostic insights 
              with patient metadata and detailed hemorrhage detection results.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            {/* CT Scan Analysis Demo */}
            <div className="bg-gradient-to-r from-slate-800/95 to-slate-900/95 backdrop-blur-sm p-8 rounded-2xl border border-blue-700/30">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* CT Scan Image */}
                <div className="space-y-6">
                  <div className="bg-black rounded-xl border border-blue-600/30 overflow-hidden relative">
                    <img 
                      src="/images.jpeg" 
                      alt="CT Scan Analysis" 
                      className="w-full h-auto object-contain"
                    />
                    {/* Analysis Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-red-900/90 backdrop-blur-sm border border-red-600/50 rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-2">
                          <XCircle className="h-5 w-5 text-red-400" />
                          <span className="text-red-300 font-semibold">Hemorrhage Detected</span>
                        </div>
                        <div className="text-red-200 text-sm space-y-1">
                          <div>Type: Subdural Hemorrhage</div>
                          <div>Confidence: 94.2%</div>
                          <div>Location: Left Parietal</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Analysis Results */}
                <div className="space-y-6">
                  {/* Patient Metadata */}
                  <div className="bg-slate-700/50 rounded-lg p-6 border border-slate-600/50">
                    <div className="flex items-center space-x-2 mb-4">
                      <User className="h-5 w-5 text-blue-400" />
                      <span className="text-blue-300 font-semibold text-lg">Patient Information</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-slate-400 text-sm">Name:</span>
                        <div className="text-white font-medium">John Smith</div>
                      </div>
                      <div>
                        <span className="text-slate-400 text-sm">Age:</span>
                        <div className="text-white font-medium">45 years</div>
                      </div>
                      <div>
                        <span className="text-slate-400 text-sm">Gender:</span>
                        <div className="text-white font-medium">Male</div>
                      </div>
                      <div>
                        <span className="text-slate-400 text-sm">Case ID:</span>
                        <div className="text-blue-300 font-mono">CT-001234</div>
                      </div>
                      <div>
                        <span className="text-slate-400 text-sm">Scan Date:</span>
                        <div className="text-white font-medium">2025-01-15</div>
                      </div>
                      <div>
                        <span className="text-slate-400 text-sm">Scan Time:</span>
                        <div className="text-white font-medium">14:30</div>
                      </div>
                    </div>
                  </div>

                  {/* Hemorrhage Detection Results */}
                  <div className="bg-red-900/30 border border-red-700/50 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="h-5 w-5 text-red-400" />
                        <span className="text-red-300 font-semibold text-lg">Hemorrhage Analysis</span>
                      </div>
                      <span className="bg-red-900/50 text-red-200 px-3 py-1 rounded-full text-sm font-medium">High Priority</span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-red-200">Hemorrhage Type:</span>
                        <span className="text-white font-medium">Subdural</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-red-200">Location:</span>
                        <span className="text-white font-medium">Left Parietal</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-red-200">Estimated Volume:</span>
                        <span className="text-white font-medium">15.3 mL</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-red-200">AI Confidence:</span>
                        <span className="text-white font-medium">94.2%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-red-200">Urgency Level:</span>
                        <span className="text-red-300 font-medium">High</span>
                      </div>
                    </div>
                  </div>

                  {/* Clinical Recommendations */}
                  <div className="bg-blue-900/30 border border-blue-700/50 rounded-lg p-6">
                    <h4 className="font-semibold text-blue-300 mb-3 flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Clinical Recommendations
                    </h4>
                    <ul className="text-sm text-blue-200 space-y-2">
                      <li>• Immediate neurosurgical consultation</li>
                      <li>• Consider emergency intervention</li>
                      <li>• Continuous monitoring required</li>
                      <li>• Follow-up imaging in 6-12 hours</li>
                    </ul>
                  </div>

                  {/* Analysis Status */}
                  <div className="flex items-center justify-between p-4 bg-green-900/30 border border-green-700/50 rounded-lg">
                    <span className="text-green-300 font-medium">Analysis Status</span>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span className="text-green-400 font-medium">Complete</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Sophisticated Grid Background */}
      <section id="features" className="relative py-20 px-6 overflow-hidden">
        {/* Sophisticated Grid Background */}
        <div className="absolute inset-0">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-blue-900/95 to-slate-900/95"></div>
          
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="h-full w-full" style={{
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }}></div>
          </div>
          
          {/* Accent grid lines */}
          <div className="absolute inset-0 opacity-10">
            <div className="h-full w-full" style={{
              backgroundImage: `
                linear-gradient(rgba(34, 197, 94, 0.4) 1px, transparent 1px),
                linear-gradient(90deg, rgba(34, 197, 94, 0.4) 1px, transparent 1px)
              `,
              backgroundSize: '120px 120px'
            }}></div>
          </div>
          
          {/* CT Scan Setup Background Image */}
          <div className="absolute inset-0 opacity-15">
            <img 
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&w=1200&h=800&q=80" 
              alt="CT Scan Setup" 
              className="w-full h-full object-cover object-center"
            />
          </div>
          
          {/* Overlay gradient to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-slate-900/60"></div>
          
          {/* Radial gradient overlay for depth */}
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-blue-900/20 to-slate-900/40"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose Medisoma?</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Our advanced AI technology, trained on the RSNA Intracranial Hemorrhage Challenge dataset,
              provides unparalleled accuracy and speed in hemorrhage detection for faster clinical decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm p-8 rounded-2xl border border-blue-700/30 hover:border-blue-600/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="bg-blue-600 p-3 rounded-xl w-fit mb-6">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Lightning Fast Analysis</h3>
              <p className="text-slate-300 leading-relaxed">
                Get accurate hemorrhage analysis results in under 30 seconds. Our optimized AI algorithms 
                process CT scans with unprecedented speed, enabling faster clinical decision-making in critical situations.
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm p-8 rounded-2xl border border-blue-700/30 hover:border-blue-600/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="bg-green-600 p-3 rounded-xl w-fit mb-6">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Real-Time DICOM Processing</h3>
              <p className="text-slate-300 leading-relaxed">
                Direct DICOM image upload with instant processing. Our platform seamlessly integrates with your 
                existing workflow, allowing doctors to upload medical images and receive immediate diagnostic insights.
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm p-8 rounded-2xl border border-blue-700/30 hover:border-blue-600/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="bg-purple-600 p-3 rounded-xl w-fit mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">RSNA Challenge Trained</h3>
              <p className="text-slate-300 leading-relaxed">
                Trained on 400-6000 CT scan images from the prestigious RSNA Intracranial Hemorrhage Challenge. 
                Our AI model has been validated by leading radiologists and achieves 96% accuracy in hemorrhage detection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-900/50 px-4 py-2 rounded-full border border-blue-700/50 mb-6">
              <Users className="h-4 w-4 text-blue-400" />
              <span className="text-blue-200 text-sm">About Our Platform</span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">About Us</h2>
            <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              We are a team of passionate and curious students from Ramiah Institute of Technology, 
              united by a shared vision to revolutionize healthcare through innovative technology.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Our Story */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-blue-700/30 p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Our Story</h3>
              <div className="space-y-4 text-slate-300 leading-relaxed">
                <p>
                  Our team comprises four dedicated individuals who recognized a critical gap in medical diagnosis that needed urgent attention.
                </p>
                <p>
                  As students passionate about the intersection of technology and healthcare, we understand that 
                  behind every diagnosis is a human life. Our commitment goes beyond creating innovative software – 
                  we're dedicated to building solutions that genuinely improve patient outcomes.
                </p>
              </div>
            </div>

            {/* Our Mission */}
            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-2xl border border-blue-700/30 p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Our Mission</h3>
              <p className="text-slate-300 leading-relaxed mb-6">
                We believe that technology should enhance human expertise, not replace it. Medisoma empowers 
                healthcare providers with advanced AI analysis tools that accelerate diagnosis and reduce errors.
              </p>
              <div className="inline-flex items-center space-x-2 text-blue-400 font-semibold">
                <span>Ready to experience the future of diagnostic support?</span>
                <ArrowRight className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-900/50 to-cyan-900/50 p-12 rounded-3xl border border-blue-700/30 backdrop-blur-sm">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Diagnostic Workflow?
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Join medical professionals who trust Medisoma for accurate, fast hemorrhage detection. 
              Upload DICOM images directly and get real-time AI-powered analysis in critical care situations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onGetStarted}
                className="flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-500 hover:to-cyan-500 transition-all duration-200 font-semibold text-lg"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button
                onClick={onLogin}
                className="px-8 py-4 border border-blue-500/50 text-blue-300 rounded-xl hover:border-blue-400 hover:text-white transition-all duration-200 font-semibold"
              >
                Login to Account
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-blue-800/30 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-2 rounded-xl">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="text-white font-bold">Medisoma</div>
                <div className="text-slate-400 text-sm">An CT Scan Analyser</div>
              </div>
            </div>
            <div className="text-slate-400 text-sm text-center md:text-right">
              <p>© 2025 Medisoma. All rights reserved.</p>
              <p className="mt-1">For medical professionals only. AI assistance should supplement clinical judgment.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;