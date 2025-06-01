'use client';

import React, { createContext, useContext, useReducer, useRef } from 'react';
import imageCompression from 'browser-image-compression';
import { saveAs } from 'file-saver';

const ImageContext = createContext();

const initialState = {
  originalImage: null,
  processedImage: null,
  canvas: null,
  fileName: '',
  originalSize: 0,
  compressedSize: 0,
  dimensions: { width: 0, height: 0 },
  settings: {
    width: '',
    height: '',
    lockAspectRatio: false,
    quality: 75,
    format: 'jpeg',
    brightness: 50,
    contrast: 50,
    saturation: 50,
  },
  cropMode: false,
  cropArea: { x: 0, y: 0, width: 0, height: 0 },
  history: [],
  historyIndex: -1,
};

function imageReducer(state, action) {
  switch (action.type) {
    case 'SET_ORIGINAL_IMAGE':
      return {
        ...state,
        originalImage: action.payload.image,
        processedImage: action.payload.image,
        fileName: action.payload.fileName,
        originalSize: action.payload.size,
        dimensions: action.payload.dimensions,
        settings: {
          ...state.settings,
          width: action.payload.dimensions.width.toString(),
          height: action.payload.dimensions.height.toString(),
        },
        history: [action.payload.image],
        historyIndex: 0,
      };

    case 'SET_PROCESSED_IMAGE':
      const newHistory = state.history.slice(0, state.historyIndex + 1);
      newHistory.push(action.payload);
      return {
        ...state,
        processedImage: action.payload,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      };

    case 'UPDATE_SETTINGS':
      return {
        ...state,
        settings: { ...state.settings, ...action.payload },
      };

    case 'SET_CROP_MODE':
      return {
        ...state,
        cropMode: action.payload,
      };

    case 'SET_CROP_AREA':
      return {
        ...state,
        cropArea: action.payload,
      };

    case 'SET_CANVAS':
      return {
        ...state,
        canvas: action.payload,
      };

    case 'UNDO':
      if (state.historyIndex > 0) {
        const newIndex = state.historyIndex - 1;
        return {
          ...state,
          processedImage: state.history[newIndex],
          historyIndex: newIndex,
        };
      }
      return state;

    case 'REDO':
      if (state.historyIndex < state.history.length - 1) {
        const newIndex = state.historyIndex + 1;
        return {
          ...state,
          processedImage: state.history[newIndex],
          historyIndex: newIndex,
        };
      }
      return state;

    case 'RESET':
      return {
        ...initialState,
        originalImage: state.originalImage,
        processedImage: state.originalImage,
        fileName: state.fileName,
        originalSize: state.originalSize,
        dimensions: state.dimensions,
        settings: {
          ...initialState.settings,
          width: state.dimensions.width.toString(),
          height: state.dimensions.height.toString(),
        },
        cropMode: false,
        cropArea: { x: 0, y: 0, width: 0, height: 0 },
        history: [state.originalImage],
        historyIndex: 0,
      };

    case 'START_OVER':
      return initialState;

    default:
      return state;
  }
}

export function ImageProvider({ children }) {
  const [state, dispatch] = useReducer(imageReducer, initialState);
  const canvasRef = useRef(null);

  // Load image from file
  const loadImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          
          dispatch({
            type: 'SET_ORIGINAL_IMAGE',
            payload: {
              image: canvas,
              fileName: file.name,
              size: file.size,
              dimensions: { width: img.width, height: img.height },
            },
          });
          resolve(canvas);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  // Apply canvas filters
  const applyFilters = (canvas, filters) => {
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    const brightness = (filters.brightness - 50) * 2;
    const contrast = filters.contrast / 50;
    const saturation = filters.saturation / 50;

    for (let i = 0; i < data.length; i += 4) {
      // Apply brightness
      data[i] += brightness;
      data[i + 1] += brightness;
      data[i + 2] += brightness;

      // Apply contrast
      data[i] = ((data[i] - 128) * contrast) + 128;
      data[i + 1] = ((data[i + 1] - 128) * contrast) + 128;
      data[i + 2] = ((data[i + 2] - 128) * contrast) + 128;

      // Apply saturation
      const gray = 0.3 * data[i] + 0.59 * data[i + 1] + 0.11 * data[i + 2];
      data[i] = gray + saturation * (data[i] - gray);
      data[i + 1] = gray + saturation * (data[i + 1] - gray);
      data[i + 2] = gray + saturation * (data[i + 2] - gray);

      // Clamp values
      data[i] = Math.max(0, Math.min(255, data[i]));
      data[i + 1] = Math.max(0, Math.min(255, data[i + 1]));
      data[i + 2] = Math.max(0, Math.min(255, data[i + 2]));
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas;
  };

  // Apply filters to current image
  const applyFiltersToImage = () => {
    if (!state.processedImage) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = state.processedImage.width;
    canvas.height = state.processedImage.height;
    ctx.drawImage(state.processedImage, 0, 0);
    
    const filtered = applyFilters(canvas, state.settings);
    dispatch({ type: 'SET_PROCESSED_IMAGE', payload: filtered });
  };

  // Resize image
  const resizeImage = (width, height) => {
    if (!state.processedImage) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(state.processedImage, 0, 0, width, height);

    dispatch({ type: 'SET_PROCESSED_IMAGE', payload: canvas });
  };

  // Rotate image
  const rotateImage = (degrees) => {
    if (!state.processedImage) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    const radians = (degrees * Math.PI) / 180;
    const sin = Math.abs(Math.sin(radians));
    const cos = Math.abs(Math.cos(radians));
    
    canvas.width = state.processedImage.height * sin + state.processedImage.width * cos;
    canvas.height = state.processedImage.height * cos + state.processedImage.width * sin;
    
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(radians);
    ctx.drawImage(state.processedImage, -state.processedImage.width / 2, -state.processedImage.height / 2);

    dispatch({ type: 'SET_PROCESSED_IMAGE', payload: canvas });
  };

  // Flip image
  const flipImage = (horizontal = true) => {
    if (!state.processedImage) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = state.processedImage.width;
    canvas.height = state.processedImage.height;

    ctx.save();
    if (horizontal) {
      ctx.scale(-1, 1);
      ctx.drawImage(state.processedImage, -canvas.width, 0);
    } else {
      ctx.scale(1, -1);
      ctx.drawImage(state.processedImage, 0, -canvas.height);
    }
    ctx.restore();

    dispatch({ type: 'SET_PROCESSED_IMAGE', payload: canvas });
  };

  // Apply grayscale
  const applyGrayscale = () => {
    if (!state.processedImage) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = state.processedImage.width;
    canvas.height = state.processedImage.height;
    ctx.drawImage(state.processedImage, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      data[i] = gray;
      data[i + 1] = gray;
      data[i + 2] = gray;
    }

    ctx.putImageData(imageData, 0, 0);
    dispatch({ type: 'SET_PROCESSED_IMAGE', payload: canvas });
  };

  // Apply sepia
  const applySepia = () => {
    if (!state.processedImage) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = state.processedImage.width;
    canvas.height = state.processedImage.height;
    ctx.drawImage(state.processedImage, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      data[i] = Math.min(255, (r * 0.393) + (g * 0.769) + (b * 0.189));
      data[i + 1] = Math.min(255, (r * 0.349) + (g * 0.686) + (b * 0.168));
      data[i + 2] = Math.min(255, (r * 0.272) + (g * 0.534) + (b * 0.131));
    }

    ctx.putImageData(imageData, 0, 0);
    dispatch({ type: 'SET_PROCESSED_IMAGE', payload: canvas });
  };

  // Download image
  const downloadImage = async () => {
    if (!state.processedImage) return;

    const format = state.settings.format;
    const quality = state.settings.quality / 100;
    
    state.processedImage.toBlob((blob) => {
      const fileName = state.fileName.replace(/\.[^/.]+$/, '') + '.' + format;
      saveAs(blob, fileName);
    }, `image/${format}`, quality);
  };

  // Crop image
  const cropImage = (cropArea) => {
    if (!state.processedImage || !cropArea) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = cropArea.width;
    canvas.height = cropArea.height;
    
    ctx.drawImage(
      state.processedImage,
      cropArea.x,
      cropArea.y,
      cropArea.width,
      cropArea.height,
      0,
      0,
      cropArea.width,
      cropArea.height
    );

    dispatch({ type: 'SET_PROCESSED_IMAGE', payload: canvas });
    dispatch({ type: 'SET_CROP_MODE', payload: false });
  };

  // Start crop mode
  const startCrop = () => {
    if (!state.processedImage) return;
    
    // Initialize crop area to center 80% of image
    const margin = 0.1;
    const cropArea = {
      x: state.processedImage.width * margin,
      y: state.processedImage.height * margin,
      width: state.processedImage.width * (1 - 2 * margin),
      height: state.processedImage.height * (1 - 2 * margin),
    };
    
    dispatch({ type: 'SET_CROP_AREA', payload: cropArea });
    dispatch({ type: 'SET_CROP_MODE', payload: true });
  };

  // Cancel crop mode
  const cancelCrop = () => {
    dispatch({ type: 'SET_CROP_MODE', payload: false });
  };

  // Compress image
  const compressImage = async () => {
    if (!state.originalImage) return;

    const canvas = state.processedImage || state.originalImage;
    canvas.toBlob(async (blob) => {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: Math.max(canvas.width, canvas.height),
        useWebWorker: true,
        quality: state.settings.quality / 100,
      };

      try {
        const compressedFile = await imageCompression(blob, options);
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            const newCanvas = document.createElement('canvas');
            const ctx = newCanvas.getContext('2d');
            newCanvas.width = img.width;
            newCanvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            dispatch({ type: 'SET_PROCESSED_IMAGE', payload: newCanvas });
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error('Compression failed:', error);
      }
    });
  };

  const value = {
    state,
    dispatch,
    canvasRef,
    loadImage,
    applyFilters,
    applyFiltersToImage,
    resizeImage,
    rotateImage,
    flipImage,
    applyGrayscale,
    applySepia,
    downloadImage,
    compressImage,
    cropImage,
    startCrop,
    cancelCrop,
  };

  return <ImageContext.Provider value={value}>{children}</ImageContext.Provider>;
}

export const useImage = () => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error('useImage must be used within an ImageProvider');
  }
  return context;
};
