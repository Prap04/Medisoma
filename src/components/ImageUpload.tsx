import React, { useCallback, useState } from 'react';
import { Upload, X, Image as ImageIcon, FileText, AlertCircle } from 'lucide-react';

interface ImageUploadProps {
  onImageUpload: (file: File, url: string) => void;
  uploadedImage: string | null;
  onRemoveImage: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload, uploadedImage, onRemoveImage }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [fileInfo, setFileInfo] = useState<{
    name: string;
    size: string;
    type: string;
  } | null>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const validateFile = (file: File): boolean => {
    // Check file size (max 50MB)
    if (file.size > 50 * 1024 * 1024) {
      alert('File size must be less than 50MB');
      return false;
    }

    // Check file type
    const validTypes = [
      'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/bmp',
      'application/dicom', 'image/dicom', 'image/x-dicom'
    ];
    
    const validExtensions = ['.dcm', '.dicom', '.jpg', '.jpeg', '.png', '.gif', '.bmp'];
    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
    
    if (!validTypes.includes(file.type) && !validExtensions.includes(fileExtension)) {
      alert('Please upload a valid image or DICOM file');
      return false;
    }

    return true;
  };

  const handleFileProcess = useCallback((file: File) => {
    if (!validateFile(file)) return;

    const url = URL.createObjectURL(file);
    setFileInfo({
      name: file.name,
      size: formatFileSize(file.size),
      type: file.type || 'Unknown'
    });
    onImageUpload(file, url);
  }, [onImageUpload]);

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
    const file = files[0];
    
    if (file) {
      handleFileProcess(file);
    }
  }, [handleFileProcess]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
  }, [handleFileProcess]);

  const handleRemove = () => {
    setFileInfo(null);
    onRemoveImage();
  };

  if (uploadedImage) {
    return (
      <div className="relative">
        <div className="bg-slate-800 rounded-xl border-2 border-blue-700/30 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <ImageIcon className="h-5 w-5 text-blue-400" />
              <span className="font-medium text-white">Image Loaded</span>
            </div>
            <button
              onClick={handleRemove}
              className="p-1 text-slate-400 hover:text-red-400 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* File Information */}
          {fileInfo && (
            <div className="bg-slate-700 rounded-lg p-3 mb-3">
              <div className="flex items-center space-x-2 mb-2">
                <FileText className="h-4 w-4 text-blue-400" />
                <span className="text-white font-medium text-sm">File Details</span>
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Name:</span>
                  <span className="text-slate-300 truncate ml-2" title={fileInfo.name}>
                    {fileInfo.name.length > 20 ? `${fileInfo.name.substring(0, 20)}...` : fileInfo.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Size:</span>
                  <span className="text-slate-300">{fileInfo.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Type:</span>
                  <span className="text-slate-300">
                    {fileInfo.type.includes('dicom') ? 'DICOM' : 'Image'}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="aspect-square bg-slate-900 rounded-lg overflow-hidden border border-slate-700">
            <img
              src={uploadedImage}
              alt="CT Scan"
              className="w-full h-full object-contain"
            />
          </div>

          {/* DICOM Notice */}
          {fileInfo?.type.includes('dicom') && (
            <div className="mt-3 p-2 bg-blue-900/30 border border-blue-700/50 rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-blue-400" />
                <span className="text-blue-300 text-xs">DICOM file detected - Ready for AI analysis</span>
              </div>
            </div>
          )}
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
      <h3 className="text-lg font-semibold text-white mb-2">Upload CT Scan or DICOM</h3>
      <p className="text-slate-400 mb-4">Drag and drop your medical image or click to browse</p>
      
      <label className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-500 hover:to-cyan-500 transition-all cursor-pointer">
        <Upload className="h-5 w-5 mr-2" />
        Select File
        <input
          type="file"
          accept="image/*,.dcm,.dicom"
          onChange={handleFileSelect}
          className="hidden"
        />
      </label>
      
      <div className="mt-4 space-y-1">
        <p className="text-xs text-slate-500">
          Supported formats: JPEG, PNG, DICOM (.dcm)
        </p>
        <p className="text-xs text-slate-500">
          Maximum file size: 50MB
        </p>
      </div>
    </div>
  );
};

export default ImageUpload;