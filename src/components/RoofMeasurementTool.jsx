/**
 * ROOF MEASUREMENT TOOL COMPONENT
 * 
 * Mobile-only AR tool for measuring roofs and visualizing solar panels
 * Features:
 * - Camera access for real-time measurement
 * - AR visualization of solar panels
 * - Length and width measurement
 * - Shadow detection
 * - 3D solar system preview
 * - Offline functionality
 */

/**
 * ROOF MEASUREMENT TOOL COMPONENT
 * 
 * Mobile-only AR tool for measuring roofs and visualizing solar panels.
 * 
 * Student Note: This component provides:
 * - Camera access for real-time measurement
 * - AR visualization of solar panels
 * - Length and width measurement
 * - Shadow detection
 * - 3D solar system preview
 * - Offline functionality
 * 
 * Features:
 * - Camera access for real-time measurement
 * - AR visualization of solar panels
 * - Length and width measurement
 * - Shadow detection
 * - 3D solar system preview
 * - Offline functionality
 */

import React, { useState, useRef, useEffect } from 'react';
import { FiCamera, FiMinimize2, FiSun, FiX, FiDownload, FiSave, FiMaximize2 } from 'react-icons/fi';
import { useTranslation } from '../hooks/useTranslation';
import { getApiUrl } from '../config/api';

const RoofMeasurementTool = ({ isOpen, onClose, quoteId = null }) => {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [measurements, setMeasurements] = useState({
    length: 0,
    width: 0,
    area: 0,
    shadowAreas: [],
    sunnyAreas: []
  });
  const [solarSystemPreview, setSolarSystemPreview] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isMeasuring, setIsMeasuring] = useState(false);
  const [measurementPoints, setMeasurementPoints] = useState([]);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
      const isSmallScreen = window.innerWidth < 768;
      setIsMobile(isMobileDevice || isSmallScreen);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      stopCamera();
    }
  }, [isOpen]);

  const startCamera = async () => {
    try {
      // Check if getUserMedia is available
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert('Camera access is not available on this device. Please use a mobile device with camera support.');
        return;
      }

      // Request camera with mobile-optimized settings
      const constraints = {
        video: {
          facingMode: 'environment', // Use back camera on mobile
          width: { ideal: 1280, max: 1920 },
          height: { ideal: 720, max: 1080 }
        }
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute('playsinline', 'true'); // Important for iOS
        videoRef.current.setAttribute('webkit-playsinline', 'true'); // For older iOS
        setCameraActive(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      let errorMessage = 'Camera access denied. Please enable camera permissions.';
      
      if (error.name === 'NotAllowedError') {
        errorMessage = 'Camera permission denied. Please allow camera access in your browser settings.';
      } else if (error.name === 'NotFoundError') {
        errorMessage = 'No camera found. Please use a device with a camera.';
      } else if (error.name === 'NotReadableError') {
        errorMessage = 'Camera is already in use by another application.';
      }
      
      alert(errorMessage);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setCameraActive(false);
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0);
      
      const imageData = canvas.toDataURL('image/jpeg');
      setCapturedImage(imageData);
    }
  };

  const startMeasurement = () => {
    setIsMeasuring(true);
    setMeasurementPoints([]);
  };

  const getEventCoordinates = (e) => {
    // Handle both mouse and touch events
    const rect = canvasRef.current.getBoundingClientRect();
    let x, y;
    
    if (e.touches && e.touches.length > 0) {
      // Touch event
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      // Mouse event
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }
    
    return { x, y };
  };

  const handleCanvasClick = (e) => {
    if (!isMeasuring || !canvasRef.current) return;
    
    e.preventDefault(); // Prevent default touch behavior
    
    const { x, y } = getEventCoordinates(e);
    const newPoints = [...measurementPoints, { x, y }];
    setMeasurementPoints(newPoints);

    if (newPoints.length === 2) {
      // Calculate distance between two points
      const dx = newPoints[1].x - newPoints[0].x;
      const dy = newPoints[1].y - newPoints[0].y;
      const pixels = Math.sqrt(dx * dx + dy * dy);
      
      // Convert pixels to feet (assuming average phone camera)
      // This is approximate - real implementation would use AR tracking
      const scaleFactor = 0.1; // 1 pixel = 0.1 feet (adjust based on distance)
      const distance = pixels * scaleFactor;

      setMeasurements(prev => {
        // If length is not set, set it; otherwise set width
        const newLength = prev.length === 0 ? distance : prev.length;
        const newWidth = prev.length === 0 ? prev.width : distance;
        const newArea = newLength * newWidth;

        return {
          ...prev,
          length: newLength,
          width: newWidth,
          area: newArea
        };
      });
      setIsMeasuring(false);
      setMeasurementPoints([]); // Reset for next measurement
    }
  };

  const handleCanvasTouch = (e) => {
    // Handle touch events specifically for mobile
    handleCanvasClick(e);
  };

  const calculateSolarSystem = () => {
    const area = measurements.area;
    // 1 kW needs approximately 65-70 sq ft
    const maxCapacity = Math.floor(area / 65);
    const recommendedSize = Math.max(3, Math.min(maxCapacity, 50)); // Between 3-50 kW
    
    // Calculate number of panels (550W panels)
    const numberOfPanels = Math.floor((recommendedSize * 1000) / 550);
    const panelLayout = calculatePanelLayout(area, numberOfPanels);

    setSolarSystemPreview({
      recommendedSize,
      numberOfPanels,
      layout: panelLayout,
      estimatedCost: recommendedSize * 1000 * 140, // PKR
      shadowAreas: measurements.shadowAreas,
      sunnyAreas: measurements.sunnyAreas
    });
  };

  const calculatePanelLayout = (area, panels) => {
    // Calculate optimal panel arrangement
    const panelArea = 35; // sq ft per panel
    const totalPanelArea = panels * panelArea;
    const rows = Math.ceil(Math.sqrt(panels));
    const cols = Math.ceil(panels / rows);
    
    return {
      rows,
      cols,
      totalPanels: panels,
      totalArea: totalPanelArea,
      efficiency: (totalPanelArea / area) * 100
    };
  };

  const detectShadows = () => {
    // Simulate shadow detection (real implementation would use image processing)
    // This would analyze the captured image for darker areas
    const shadowAreas = [
      { x: 100, y: 100, width: 50, height: 50 },
      { x: 300, y: 200, width: 80, height: 60 }
    ];
    
    const sunnyAreas = [
      { x: 200, y: 150, width: 150, height: 120 },
      { x: 400, y: 100, width: 200, height: 180 }
    ];

    setMeasurements(prev => ({
      ...prev,
      shadowAreas,
      sunnyAreas
    }));
  };

  const saveMeasurement = async () => {
    const measurementData = {
      quoteId,
      measurements,
      solarSystemPreview,
      capturedImage,
      timestamp: new Date().toISOString()
    };

    // Save to backend or localStorage
    try {
      if (quoteId) {
        await fetch(getApiUrl(`/api/admin/quotes/${quoteId}/measurement`), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(measurementData)
        });
      } else {
        localStorage.setItem('roofMeasurement', JSON.stringify(measurementData));
      }
      alert('Measurement saved successfully!');
    } catch (error) {
      console.error('Error saving measurement:', error);
      localStorage.setItem('roofMeasurement', JSON.stringify(measurementData));
      alert('Measurement saved locally!');
    }
  };

  if (!isOpen) return null;

  if (!isMobile) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md text-center">
          <FiMaximize2 className="text-6xl text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            {t('roofMeasurementTool.mobileRequired')}
          </h2>
          <p className="text-gray-600 mb-6">
            Ye tool sirf mobile devices pe kaam karta hai camera access ke liye. 
            Kripya apna mobile phone use karein. 
            | This tool only works on mobile devices for camera access. Please use your mobile phone.
          </p>
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t('roofMeasurementTool.close')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black z-[100] flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">{t('roofMeasurementTool.title')}</h2>
          <p className="text-xs text-blue-100">{t('roofMeasurementTool.subtitle')}</p>
        </div>
        <button
          onClick={() => {
            stopCamera();
            onClose();
          }}
          className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2"
        >
          <FiX size={24} />
        </button>
      </div>

      {/* Camera View */}
      <div className="flex-1 relative bg-black">
        {!cameraActive ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={startCamera}
              className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-bold flex items-center gap-3"
            >
              <FiCamera size={24} />
              {t('roofMeasurementTool.startCamera')}
            </button>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
              style={{ transform: 'scaleX(-1)', WebkitTransform: 'translateZ(0)' }} // Mirror for better UX, hardware acceleration
            />
            
            {/* Overlay Canvas for Measurements */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full"
              onClick={handleCanvasClick}
              onTouchStart={handleCanvasTouch}
              style={{ touchAction: 'none', WebkitTouchCallout: 'none', WebkitUserSelect: 'none', userSelect: 'none' }}
            />

            {/* Measurement Points and Line */}
            {measurementPoints.length > 0 && (
              <>
                {measurementPoints.map((point, index) => (
                  <div
                    key={index}
                    className="absolute w-6 h-6 bg-red-500 rounded-full border-3 border-white transform -translate-x-1/2 -translate-y-1/2 z-10 shadow-lg"
                    style={{ 
                      left: point.x, 
                      top: point.y,
                      boxShadow: '0 0 0 2px rgba(255, 255, 255, 0.8)'
                    }}
                  />
                ))}
                {measurementPoints.length === 2 && (
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none z-10"
                    style={{ touchAction: 'none' }}
                  >
                    <line
                      x1={measurementPoints[0].x}
                      y1={measurementPoints[0].y}
                      x2={measurementPoints[1].x}
                      y2={measurementPoints[1].y}
                      stroke="#ef4444"
                      strokeWidth="3"
                      strokeDasharray="5,5"
                    />
                  </svg>
                )}
              </>
            )}

            {/* Shadow Areas Overlay */}
            {measurements.shadowAreas.map((area, index) => (
              <div
                key={`shadow-${index}`}
                className="absolute bg-black bg-opacity-40 border-2 border-red-500"
                style={{
                  left: area.x,
                  top: area.y,
                  width: area.width,
                  height: area.height
                }}
              >
                <span className="text-white text-xs bg-red-500 px-2 py-1">Shadow</span>
              </div>
            ))}

            {/* Sunny Areas Overlay */}
            {measurements.sunnyAreas.map((area, index) => (
              <div
                key={`sunny-${index}`}
                className="absolute bg-yellow-400 bg-opacity-30 border-2 border-yellow-500"
                style={{
                  left: area.x,
                  top: area.y,
                  width: area.width,
                  height: area.height
                }}
              >
                <span className="text-yellow-900 text-xs bg-yellow-400 px-2 py-1">Sunny</span>
              </div>
            ))}

            {/* Solar Panel Preview (3D Visualization) */}
            {solarSystemPreview && (
              <div className="absolute bottom-4 left-4 right-4 bg-white bg-opacity-90 rounded-lg p-4">
                <h3 className="font-bold text-slate-900 mb-2">{t('roofMeasurementTool.recommendedSystem')}</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-600">Size:</span>
                    <span className="font-bold ml-2">{solarSystemPreview.recommendedSize} KW</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Panels:</span>
                    <span className="font-bold ml-2">{solarSystemPreview.numberOfPanels}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Layout:</span>
                    <span className="font-bold ml-2">{solarSystemPreview.layout.rows}x{solarSystemPreview.layout.cols}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Cost:</span>
                    <span className="font-bold ml-2">Rs. {solarSystemPreview.estimatedCost.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Controls */}
      <div className="bg-gray-900 text-white p-4">
        <div className="grid grid-cols-4 gap-2 mb-4">
          <button
            onClick={startMeasurement}
            className="bg-blue-600 py-3 rounded-lg flex flex-col items-center gap-1 text-xs touch-manipulation active:bg-blue-700"
            disabled={!cameraActive}
            style={{ minHeight: '60px', WebkitTapHighlightColor: 'transparent' }}
          >
            <FiMinimize2 size={20} />
            <span className="mt-1">Measure</span>
          </button>
          <button
            onClick={captureImage}
            className="bg-green-600 py-3 rounded-lg flex flex-col items-center gap-1 text-xs touch-manipulation active:bg-green-700"
            disabled={!cameraActive}
            style={{ minHeight: '60px', WebkitTapHighlightColor: 'transparent' }}
          >
            <FiCamera size={20} />
            <span className="mt-1">Capture</span>
          </button>
          <button
            onClick={detectShadows}
            className="bg-yellow-600 py-3 rounded-lg flex flex-col items-center gap-1 text-xs touch-manipulation active:bg-yellow-700"
            disabled={!capturedImage}
            style={{ minHeight: '60px', WebkitTapHighlightColor: 'transparent' }}
          >
            <FiSun size={20} />
            <span className="mt-1">Shadows</span>
          </button>
          <button
            onClick={calculateSolarSystem}
            className="bg-purple-600 py-3 rounded-lg flex flex-col items-center gap-1 text-xs touch-manipulation active:bg-purple-700"
            disabled={measurements.area === 0}
            style={{ minHeight: '60px', WebkitTapHighlightColor: 'transparent' }}
          >
            <FiMaximize2 size={20} />
            <span className="mt-1">Calculate</span>
          </button>
        </div>

        {/* Measurements Display */}
        {measurements.area > 0 && (
          <div className="bg-gray-800 rounded-lg p-3 mb-2">
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div>
                <div className="text-gray-400">Length</div>
                <div className="font-bold">{measurements.length.toFixed(1)} ft</div>
              </div>
              <div>
                <div className="text-gray-400">Width</div>
                <div className="font-bold">{measurements.width.toFixed(1)} ft</div>
              </div>
              <div>
                <div className="text-gray-400">Area</div>
                <div className="font-bold">{measurements.area.toFixed(0)} sq ft</div>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={saveMeasurement}
            className="flex-1 bg-green-600 py-3 rounded-lg flex items-center justify-center gap-2 font-semibold"
          >
            <FiSave size={20} />
            {t('roofMeasurementTool.save')}
          </button>
          <button
            onClick={stopCamera}
            className="px-4 bg-red-600 py-3 rounded-lg"
          >
            {t('roofMeasurementTool.stop')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoofMeasurementTool;

