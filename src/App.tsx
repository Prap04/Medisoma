import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import LoginModal from './components/LoginModal';
import FloatingNavbar from './components/FloatingNavbar';
import Dashboard from './components/Dashboard';
import ContactPage from './components/ContactPage';
import ReportsPage from './components/ReportsPage';
import AboutPage from './components/AboutPage';
import Header from './components/Header';
import ImageUpload from './components/ImageUpload';
import ImageViewer from './components/ImageViewer';
import PatientInfo from './components/PatientInfo';
import DiagnosisResults from './components/DiagnosisResults';

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

interface DiagnosisData {
  hemorrhageDetected: boolean;
  type: string;
  confidence: string;
  location: string;
  volume: string;
  urgency: 'Low' | 'Medium' | 'High';
}

function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'home' | 'dashboard' | 'reports' | 'contact' | 'about'>('landing');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [diagnosisResults, setDiagnosisResults] = useState<DiagnosisData | null>(null);

  const handleGetStarted = () => {
    setCurrentView('home');
  };

  const handleLogin = (credentials: { email: string; password: string }) => {
    // Simulate login process
    console.log('Login attempt:', credentials);
    setShowLoginModal(false);
    setCurrentView('home');
  };

  const handleLogout = () => {
    setCurrentView('landing');
    setUploadedImage(null);
    setPatientData(null);
    setDiagnosisResults(null);
  };

  const handleNavigate = (view: string) => {
    setCurrentView(view as any);
  };

  const handleImageUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    setUploadedImage(url);
    setDiagnosisResults(null); // Reset results when new image is uploaded
  };

  const handleRemoveImage = () => {
    if (uploadedImage) {
      URL.revokeObjectURL(uploadedImage);
    }
    setUploadedImage(null);
    setDiagnosisResults(null);
  };

  const handlePatientUpdate = (data: PatientData) => {
    setPatientData(data);
  };

  const handleAnalysis = (results: DiagnosisData) => {
    setDiagnosisResults(results);
  };

  if (currentView === 'landing') {
    return (
      <>
        <LandingPage
          onGetStarted={handleGetStarted}
          onLogin={() => setShowLoginModal(true)}
        />
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onLogin={handleLogin}
        />
      </>
    );
  }

  // Render different views based on currentView
  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'reports':
        return <ReportsPage />;
      case 'contact':
        return <ContactPage />;
      case 'about':
        return <AboutPage />;
      case 'home':
      default:
        return (
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-24">
            <main className="max-w-7xl mx-auto px-6 py-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Patient Info and Upload */}
                <div className="space-y-6">
                  <PatientInfo onPatientUpdate={handlePatientUpdate} />
                  
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">CT Scan Upload</h3>
                    <ImageUpload
                      onImageUpload={handleImageUpload}
                      uploadedImage={uploadedImage}
                      onRemoveImage={handleRemoveImage}
                    />
                  </div>
                </div>

                {/* Middle Column - Image Viewer */}
                <div className="lg:col-span-1">
                  {uploadedImage ? (
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">CT Scan Analysis</h3>
                      <ImageViewer
                        imageUrl={uploadedImage}
                        onAnalysis={handleAnalysis}
                      />
                    </div>
                  ) : (
                    <div className="bg-slate-800 rounded-xl border-2 border-blue-700/30 p-8 text-center">
                      <div className="text-slate-500 mb-4">
                        <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">Upload CT Scan to Begin</h3>
                      <p className="text-slate-400">Upload a CT scan image to start the hemorrhage analysis process</p>
                    </div>
                  )}
                </div>

                {/* Right Column - Diagnosis Results */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Diagnosis & Results</h3>
                  <DiagnosisResults
                    results={diagnosisResults}
                    patientName={patientData?.name || ''}
                  />
                </div>
              </div>

              {/* Footer */}
              <footer className="mt-12 pt-8 border-t border-slate-700">
                <div className="text-center text-sm text-slate-400">
                  <p>Medisoma - Advanced CT Hemorrhage Analysis System</p>
                  <p className="mt-1">For medical professionals only. Always confirm AI findings with clinical assessment.</p>
                </div>
              </footer>
            </main>
          </div>
        );
    }
  };

  return (
    <>
      <FloatingNavbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      />
      {renderCurrentView()}
    </>
  );
}

export default App;