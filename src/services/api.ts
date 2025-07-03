// API service for communicating with FastAPI backend
export interface AnalysisRequest {
  imageFile: File;
  patientData?: {
    name: string;
    age: number;
    gender: string;
    symptoms: string;
  };
}

export interface AnalysisResponse {
  success: boolean;
  analysis: {
    hemorrhageDetected: boolean;
    type: string;
    confidence: number;
    location: string;
    volume: string;
    urgency: 'Low' | 'Medium' | 'High';
    boundingBoxes?: Array<{
      x: number;
      y: number;
      width: number;
      height: number;
      confidence: number;
    }>;
    processingTime: number;
  };
  error?: string;
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

class ApiService {
  private baseUrl: string;

  constructor() {
    // Use environment variable or default to localhost
    this.baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  }

  async analyzeDicomImage(
    request: AnalysisRequest,
    onProgress?: (progress: UploadProgress) => void
  ): Promise<AnalysisResponse> {
    const formData = new FormData();
    formData.append('image', request.imageFile);
    
    if (request.patientData) {
      formData.append('patient_data', JSON.stringify(request.patientData));
    }

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      // Track upload progress
      if (onProgress) {
        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable) {
            const progress: UploadProgress = {
              loaded: event.loaded,
              total: event.total,
              percentage: Math.round((event.loaded / event.total) * 100)
            };
            onProgress(progress);
          }
        });
      }

      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          try {
            const response: AnalysisResponse = JSON.parse(xhr.responseText);
            resolve(response);
          } catch (error) {
            reject(new Error('Failed to parse response'));
          }
        } else {
          reject(new Error(`HTTP ${xhr.status}: ${xhr.statusText}`));
        }
      });

      xhr.addEventListener('error', () => {
        reject(new Error('Network error occurred'));
      });

      xhr.addEventListener('timeout', () => {
        reject(new Error('Request timeout'));
      });

      xhr.open('POST', `${this.baseUrl}/api/analyze-dicom`);
      xhr.timeout = 120000; // 2 minutes timeout
      xhr.send(formData);
    });
  }

  async checkHealth(): Promise<{ status: string; version: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/health`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      throw new Error('API service unavailable');
    }
  }

  async getModelInfo(): Promise<{
    model_name: string;
    version: string;
    accuracy: number;
    training_data_size: number;
  }> {
    try {
      const response = await fetch(`${this.baseUrl}/api/model-info`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      throw new Error('Failed to fetch model information');
    }
  }
}

export const apiService = new ApiService();