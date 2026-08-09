import React, { useRef, useState, useEffect } from 'react';
import { Camera, SwitchCamera, Upload, Sparkles, RefreshCw, AlertCircle, Image as ImageIcon, CheckCircle2 } from 'lucide-react';
import { CropType, SampleDatasetItem } from '../types';
import { SAMPLE_DATASET } from '../data/sampleDataset';

interface CameraCaptureProps {
  onCapture: (imageDataUrl: string, selectedCrop: CropType) => void;
  selectedCrop: CropType;
  setSelectedCrop: (crop: CropType) => void;
  isAnalyzing: boolean;
}

export const CameraCapture: React.FC<CameraCaptureProps> = ({
  onCapture,
  selectedCrop,
  setSelectedCrop,
  isAnalyzing,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [cameraFacing, setCameraFacing] = useState<'environment' | 'user'>('environment');
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [selectedSampleId, setSelectedSampleId] = useState<string>('rice-blast-01');

  // Start smartphone camera stream
  const startCamera = async () => {
    setCameraError(null);
    try {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }

      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: cameraFacing,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setIsCameraActive(true);
      }
    } catch (err: any) {
      console.warn('Camera access warning:', err);
      setCameraError('Camera access unavailable or blocked in browser frame. You can upload photos or select sample crop images below.');
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  const toggleCameraFacing = () => {
    setCameraFacing((prev) => (prev === 'environment' ? 'user' : 'environment'));
  };

  useEffect(() => {
    if (isCameraActive) {
      startCamera();
    }
    return () => {
      stopCamera();
    };
  }, [cameraFacing]);

  // Capture frame from video feed
  const capturePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 1280;
    canvas.height = videoRef.current.videoHeight || 720;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
      onCapture(dataUrl, selectedCrop);
    }
  };

  // Handle uploaded photo
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onCapture(event.target.result as string, selectedCrop);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onCapture(event.target.result as string, selectedCrop);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle sample dataset click
  const handleSampleSelect = (item: SampleDatasetItem) => {
    setSelectedSampleId(item.id);
    setSelectedCrop(item.crop);
    onCapture(item.sampleImageUrl, item.crop);
  };

  return (
    <div className="space-y-6">
      
      {/* Crop Selection & Friendly Helper Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-bold text-white flex items-center space-x-1.5">
            <span>Select Crop:</span>
          </span>
          <div className="inline-flex rounded-lg bg-slate-800 p-1 border border-slate-700">
            {(['Auto-detect', 'Rice', 'Corn'] as CropType[]).map((crop) => (
              <button
                key={crop}
                onClick={() => setSelectedCrop(crop)}
                className={`px-3.5 py-1.5 rounded-md text-xs font-bold transition-all ${
                  selectedCrop === crop
                    ? 'bg-emerald-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {crop === 'Rice' && '🌾 '}
                {crop === 'Corn' && '🌽 '}
                {crop}
              </button>
            ))}
          </div>
        </div>

        <div className="text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1.5 rounded-lg flex items-center space-x-2">
          <Sparkles className="w-4 h-4 flex-shrink-0" />
          <span><strong>Instant AI Scanner:</strong> Take or upload a leaf photo to diagnose diseases instantly</span>
        </div>
      </div>

      {/* Quick Photo Tips Bar for Non-Technical Users */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-950 border border-slate-800 p-3.5 rounded-xl text-xs text-slate-300">
        <div className="flex items-center space-x-2">
          <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center flex-shrink-0 text-[11px]">1</span>
          <span><strong>Get Close:</strong> Fill frame with the leaf & disease spots</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center flex-shrink-0 text-[11px]">2</span>
          <span><strong>Good Light:</strong> Use daylight or bright indirect light</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center flex-shrink-0 text-[11px]">3</span>
          <span><strong>Clear Focus:</strong> Hold steady so the spots are sharp</span>
        </div>
      </div>

      {/* Main Capture Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 7 Columns: Camera Frame or Drag-Drop Uploader */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative flex flex-col justify-between min-h-[380px]">
          
          {isCameraActive ? (
            <div className="relative w-full h-[400px] bg-black flex items-center justify-center">
              <video
                ref={videoRef}
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              
              {/* Smartphone Viewfinder Overlay */}
              <div className="absolute inset-0 pointer-events-none border-2 border-emerald-500/40 m-6 rounded-xl flex items-center justify-center">
                <div className="w-48 h-48 border border-dashed border-emerald-400/80 rounded-lg flex items-center justify-center bg-emerald-500/5">
                  <span className="text-xs text-emerald-300 font-mono bg-slate-900/80 px-2 py-1 rounded">
                    Position Leaf Here
                  </span>
                </div>
              </div>

              {/* Camera Controls Overlay */}
              <div className="absolute top-4 right-4 flex space-x-2">
                <button
                  onClick={toggleCameraFacing}
                  className="p-2 rounded-full bg-slate-900/80 text-slate-200 hover:text-white border border-slate-700 backdrop-blur-sm"
                  title="Switch Camera (Front/Rear)"
                >
                  <SwitchCamera className="w-5 h-5" />
                </button>
              </div>

              {/* Capture Button Bar */}
              <div className="absolute bottom-4 inset-x-0 flex items-center justify-center space-x-4">
                <button
                  onClick={capturePhoto}
                  disabled={isAnalyzing}
                  className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold flex items-center space-x-2 shadow-lg shadow-emerald-500/30 transition-transform active:scale-95 disabled:opacity-50"
                >
                  <Camera className="w-5 h-5" />
                  <span>{isAnalyzing ? 'Processing...' : 'Capture & Analyze Leaf'}</span>
                </button>

                <button
                  onClick={stopCamera}
                  className="px-4 py-3 rounded-full bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
                >
                  Close Camera
                </button>
              </div>
            </div>
          ) : (
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`p-8 text-center flex flex-col items-center justify-center flex-1 border-2 border-dashed rounded-2xl transition-all ${
                dragActive
                  ? 'border-emerald-500 bg-emerald-500/10'
                  : 'border-slate-700 bg-slate-900/60 hover:border-slate-600'
              }`}
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 shadow-lg">
                <Camera className="w-8 h-8" />
              </div>

              <h3 className="text-lg font-bold text-white mb-1">
                Scan Crop Leaf via Camera or Photo
              </h3>
              <p className="text-sm text-slate-400 max-w-md mb-6">
                Take a photo with your smartphone camera or upload a leaf image to trigger CLAHE enhancement, UNet region segmentation, and dual model classification.
              </p>

              {cameraError && (
                <div className="mb-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center space-x-2 max-w-md text-left">
                  <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>{cameraError}</span>
                </div>
              )}

              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={startCamera}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center space-x-2 shadow-md shadow-emerald-500/20 transition-all"
                >
                  <Camera className="w-4 h-4" />
                  <span>Open Smartphone Camera</span>
                </button>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm flex items-center space-x-2 border border-slate-700 transition-all"
                >
                  <Upload className="w-4 h-4 text-slate-300" />
                  <span>Upload Image File</span>
                </button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          )}
        </div>

        {/* Right 5 Columns: 1-Click Sample Dataset Quick Test */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <ImageIcon className="w-4 h-4 text-emerald-400" />
                <h4 className="text-sm font-bold text-white">Instant Sample Test Dataset</h4>
              </div>
              <span className="text-xs text-slate-400">1-Click Diagnostic Test</span>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Select pre-configured rice or corn disease leaf samples from dataset to run the hybrid analysis instantly:
            </p>

            <div className="grid grid-cols-2 gap-2.5 max-h-[320px] overflow-y-auto pr-1">
              {SAMPLE_DATASET.map((item) => {
                const isSelected = selectedSampleId === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSampleSelect(item)}
                    disabled={isAnalyzing}
                    className={`group relative text-left p-2.5 rounded-xl border transition-all flex items-center space-x-2.5 ${
                      isSelected
                        ? 'bg-emerald-950/60 border-emerald-500 ring-1 ring-emerald-500'
                        : 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800 hover:border-slate-600'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-lg bg-slate-950 overflow-hidden border border-slate-700 flex-shrink-0 relative">
                      <img
                        src={item.sampleImageUrl}
                        alt={item.diseaseName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center space-x-1">
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-700 text-slate-300">
                          {item.crop}
                        </span>
                        <span
                          className={`text-[10px] font-semibold ${
                            item.severity === 'Severe'
                              ? 'text-rose-400'
                              : item.severity === 'Moderate'
                              ? 'text-amber-400'
                              : 'text-emerald-400'
                          }`}
                        >
                          {item.severity}
                        </span>
                      </div>
                      <h5 className="text-xs font-semibold text-white truncate mt-0.5">
                        {item.diseaseName.split('(')[0]}
                      </h5>
                    </div>
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 absolute top-2 right-2" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Hybrid Pipeline: ResNet50 + EfficientNet B3</span>
            <span className="text-emerald-400 font-semibold">97.4% Avg Accuracy</span>
          </div>
        </div>

      </div>
    </div>
  );
};
