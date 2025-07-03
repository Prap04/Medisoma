import React, { useCallback, useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  uploadedImage: string | null;
  onRemoveImage: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload, uploadedImage, onRemoveImage }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      onImageUpload(imageFile);
    }
  }, [onImageUpload]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onImageUpload(file);
    }
  }, [onImageUpload]);

  if (uploadedImage) {
    return (
      <div className="relative">
        <div className="bg-slate-800 rounded-xl border-2 border-blue-700/30 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <ImageIcon className="h-5 w-5 text-blue-400" />
              <span className="font-medium text-white">CT Scan Loaded</span>
            </div>
            <button
              onClick={onRemoveImage}
              className="p-1 text-slate-400 hover:text-red-400 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="aspect-square bg-slate-900 rounded-lg overflow-hidden border border-slate-700">
            <img
              src={uploadedImage}
              alt="CT Scan"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
        isDragOver
          ? 'border-blue-400 bg-blue-900/20'
          : 'border-slate-600 bg-slate-800/50 hover:border-blue-500 hover:bg-blue-900/10'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-white mb-2">Upload CT Scan</h3>
      <p className="text-slate-400 mb-4">Drag and drop your CT scan image or click to browse</p>
      
      <label className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-500 hover:to-cyan-500 transition-all cursor-pointer">
        <Upload className="h-5 w-5 mr-2" />
        Select Image
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </label>
      
      <p className="text-xs text-slate-500 mt-3">
        Supported formats: JPEG, PNG, DICOM
      </p>
    </div>
  );
};

export default ImageUpload;