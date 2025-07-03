import React, { useState, useRef, useCallback } from 'react';
import { ZoomIn, ZoomOut, RotateCw, Move, Ruler, Square } from 'lucide-react';

interface ImageViewerProps {
  imageUrl: string;
  onAnalysis: (results: any) => void;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ imageUrl, onAnalysis }) => {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [annotations, setAnnotations] = useState<any[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const imageRef = useRef<HTMLImageElement>(null);
  
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

  const runAnalysis = useCallback(() => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis with realistic hemorrhage detection
    setTimeout(() => {
      const mockResults = {
        hemorrhageDetected: Math.random() > 0.3,
        type: ['Epidural', 'Subdural', 'Subarachnoid', 'Intracerebral', 'Intraventricular'][Math.floor(Math.random() * 5)],
        confidence: (0.75 + Math.random() * 0.24).toFixed(2),
        location: ['Frontal lobe', 'Parietal lobe', 'Temporal lobe', 'Occipital lobe', 'Basal ganglia'][Math.floor(Math.random() * 5)],
        volume: (Math.random() * 50 + 5).toFixed(1),
        urgency: Math.random() > 0.7 ? 'High' : Math.random() > 0.4 ? 'Medium' : 'Low'
      };
      
      setIsAnalyzing(false);
      onAnalysis(mockResults);
    }, 3000);
  }, [onAnalysis]);

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
          
          <div className="flex items-center space-x-3">
            <span className="text-sm text-slate-400">Zoom: {(zoom * 100).toFixed(0)}%</span>
            <button
              onClick={runAnalysis}
              disabled={isAnalyzing}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-500 hover:to-cyan-500 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Analyzing...</span>
                </div>
              ) : (
                'Analyze for Hemorrhage'
              )}
            </button>
          </div>
        </div>
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
                height: annotation.height
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageViewer;