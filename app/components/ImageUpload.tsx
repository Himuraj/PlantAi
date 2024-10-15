import React, { useState } from 'react';

interface ImageUploadProps {
  onImageUpload: (imageBase64: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleImageUpload = async (file: File) => {
    setIsUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      onImageUpload(base64String.split(',')[1]);
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div 
      className={`flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md border-2 border-dashed transition-colors ${dragActive ? 'border-green-500 bg-green-50' : 'border-gray-300'}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <label htmlFor="image-upload" className="mb-4 text-lg font-semibold text-gray-700">
        {dragActive ? 'Drop the image here' : 'Upload a plant image'}
      </label>
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={(e) => e.target.files && handleImageUpload(e.target.files[0])}
        className="hidden"
      />
      <label
        htmlFor="image-upload"
        className="px-4 py-2 text-white bg-green-500 rounded-md cursor-pointer hover:bg-green-600 transition-colors"
      >
        {isUploading ? 'Uploading...' : 'Choose Image'}
      </label>
      <p className="mt-2 text-sm text-gray-500">or drag and drop your image here</p>
    </div>
  );
};

export default ImageUpload;