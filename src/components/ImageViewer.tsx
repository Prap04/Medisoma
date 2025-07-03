import React, { useState, useRef, useCallback } from 'react';
import { ZoomIn, ZoomOut, RotateCw, Move, Ruler, Square, Wifi, WifiOff, AlertCircle } from 'lucide-react';
import { apiService, UploadProgress } from '../services/api';

interface ImageViewerProps {
  imageUrl: string;
  imageFile: File | null;
  patientData?: {
    name: string;
    age: number;
    gender: string;
    symptoms: string;
  };
  onAnalysis: (results: any) => void;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ imageUrl, imageFile, patientData, onAnalysis }) => {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [annotations, setAnnotations] = useState<any[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress | null>(null);
  const [apiStatus, setApiStatus] = useState<'connected' | 'disconnected' | 'checking'>('checking');
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  
  const imageRef = useRef<HTMLImageElement>(null);
  
  // Check API health on component mount
  React.useEffect(() => {
    checkApiHealth();
  }, []);

  const checkApiHealth = async () => {
    setApiStatus('checking');
    try {
      await apiService.checkHealth();
      setApiStatus('connected');
    } catch (error) {
      setApiStatus('disconnected');
      console.error('API health check failed:', error);
    }
  };
  
  const handleZoomIn = useCallback(() => {
    setZoom(prev => Math.min(prev * 1.2, 5));
  }, []);
  
  const handleZoomOut = useCallback(() => {
    setZoom(prev => Math.max(prev / 1.2, 0.1));
  }, []);
  
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (activeTool === 'move') {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  }, [activeTool, position]);
  
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
    }
  }, [isDragging, dragStart]);
  
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const runAnalysis = useCallback(async () => {
    if (!imageFile) {
      setAnalysisError('No image file available for analysis');
      return;
    }

    if (apiStatus !== 'connected') {
      setAnalysisError('API service is not available. Please check your connection.');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisError(null);
    setUploadProgress(null);
    
    try {
      const response = await apiService.analyzeDicomImage(
        {
          imageFile,
          patientData
        },
        (progress) => {
          setUploadProgress(progress);
        }
      );

      if (response.success) {
        // Add bounding boxes as annotations if provided
        if (response.analysis.boundingBoxes) {
          setAnnotations(response.analysis.boundingBoxes.map(box => ({
            x: box.x,
            y: box.y,
            width: box.width,
            height: box.height,
            confidence: box.confidence
          })));
        }

        // Convert API response to expected format
        const analysisResults = {
          hemorrhageDetected: response.analysis.hemorrhageDetected,
          type: response.analysis.type,
          confidence: response.analysis.confidence.toString(),
          location: response.analysis.location,
          volume: response.analysis.volume,
          urgency: response.analysis.urgency,
          processingTime: response.analysis.processingTime
        };

        onAnalysis(analysisResults);
      } else {
        throw new Error(response.error || 'Analysis failed');
      }
    } catch (error) {
      console.error('Analysis error:', error);
      setAnalysisError(error instanceof Error ? error.message : 'Analysis failed');
    } finally {
      setIsAnalyzing(false);
      setUploadProgress(null);
    }
  }, [imageFile, patientData, onAnalysis, apiStatus]);

  const getApiStatusIcon = () => {
    switch (apiStatus) {
      case 'connected':
        return <Wifi className="h-4 w-4 text-green-400" />;
      case 'disconnected':
        return <WifiOff className="h-4 w-4 text-red-400" />;
      case 'checking':
        return <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>;
    }
  };

  const getApiStatusText = () => {
    switch (apiStatus) {
      case 'connected':
        return 'API Connected';
      case 'disconnected':
        return 'API Disconnected';
      case 'checking':
        return 'Checking...';
    }
  };

  return (
    <div className="bg-slate-800 rounded-xl border-2 border-blue-700/30 overflow-hidden">
      {/* Toolbar */}
      <div className="bg-slate-900 border-b border-slate-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={handleZoomIn}
              className="p-2 text-slate-400 hover:text-blue-400 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <ZoomIn className="h-5 w-5" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-2 text-slate-400 hover:text-blue-400 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <ZoomOut className="h-5 w-5" />
            </button>
            <div className="w-px h-6 bg-slate-600 mx-2" />
            <button
              onClick={() => setActiveTool(activeTool === 'move' ? null : 'move')}
              className={`p-2 rounded-lg transition-colors ${
                activeTool === 'move' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-slate-400 hover:text-blue-400 hover:bg-slate-700'
              }`}
            >
              <Move className="h-5 w-5" />
            </button>
            <button
              onClick={() => setActiveTool(activeTool === 'measure' ? null : 'measure')}
              className={`p-2 rounded-lg transition-colors ${
                activeTool === 'measure' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-slate-400 hover:text-blue-400 hover:bg-slate-700'
              }`}
            >
              <Ruler className="h-5 w-5" />
            </button>
            <button
              onClick={() => setActiveTool(activeTool === 'annotate' ? null : 'annotate')}
              className={`p-2 rounded-lg transition-colors ${
                activeTool === 'annotate' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-slate-400 hover:text-blue-400 hover:bg-slate-700'
              }`}
            >
              <Square className="h-5 w-5" />
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* API Status */}
            <div className="flex items-center space-x-2">
              {getApiStatusIcon()}
              <span className={`text-xs ${
                apiStatus === 'connected' ? 'text-green-400' : 
                apiStatus === 'disconnected' ? 'text-red-400' : 'text-blue-400'
              }`}>
                {getApiStatusText()}
              </span>
              {apiStatus === 'disconnected' && (
                <button
                  onClick={checkApiHealth}
                  className="text-xs text-blue-400 hover:text-blue-300 underline"
                >
                  Retry
                </button>
              )}
            </div>

            <span className="text-sm text-slate-400">Zoom: {(zoom * 100).toFixed(0)}%</span>
            
            <button
              onClick={runAnalysis}
              disabled={isAnalyzing || !imageFile || apiStatus !== 'connected'}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-500 hover:to-cyan-500 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Analyzing...</span>
                </div>
              ) : (
                'Analyze with AI'
              )}
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        {uploadProgress && (
          <div className="mt-3">
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>Uploading to AI Service</span>
              <span>{uploadProgress.percentage}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-600 to-cyan-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress.percentage}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Error Display */}
        {analysisError && (
          <div className="mt-3 p-3 bg-red-900/30 border border-red-700/50 rounded-lg">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-4 w-4 text-red-400" />
              <span className="text-red-300 text-sm">{analysisError}</span>
            </div>
          </div>
        )}
      </div>
      
      {/* Image Container */}
      <div 
        className="relative overflow-hidden bg-black h-96"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ cursor: activeTool === 'move' ? 'move' : 'crosshair' }}
      >
        <img
          ref={imageRef}
          src={imageUrl}
          alt="CT Scan"
          className="absolute top-1/2 left-1/2 max-w-none"
          style={{
            transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px)) scale(${zoom})`,
            transition: isDragging ? 'none' : 'transform 0.1s ease-out'
          }}
        />
        
        {/* Annotations overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {annotations.map((annotation, index) => (
            <div
              key={index}
              className="absolute border-2 border-red-500 bg-red-500 bg-opacity-20"
              style={{
                left: annotation.x,
                top: annotation.y,
                width: annotation.width,
                height: annotation.height,
                transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`
              }}
            >
              {annotation.confidence && (
                <div className="absolute -top-6 left-0 bg-red-600 text-white text-xs px-2 py-1 rounded">
                  {(annotation.confidence * 100).toFixed(1)}%
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Analysis Status Overlay */}
        {isAnalyzing && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-slate-800 p-6 rounded-xl border border-blue-700/30 text-center">
              <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <div className="text-white font-medium mb-2">AI Analysis in Progress</div>
              <div className="text-slate-400 text-sm">
                {uploadProgress ? `Uploading: ${uploadProgress.percentage}%` : 'Processing DICOM image...'}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageViewer;