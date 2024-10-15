'use client';

import { useState } from 'react';
import ImageUpload from './components/ImageUpload';
import ImageDisplay from './components/ImageDisplay';
import PlantInfo from './components/PlantInfo';
import PlantTable from './components/PlantTable';
import { identifyPlant } from './lib/gemini';

export default function Home() {
  const [plantInfo, setPlantInfo] = useState<string | null>(null);
  const [plantTable, setPlantTable] = useState<{ [key: string]: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleImageUpload = async (imageBase64: string) => {
    setIsLoading(true);
    setError(null);
    setUploadedImage(`data:image/jpeg;base64,${imageBase64}`);
    try {
      const info = await identifyPlant(imageBase64);
      setPlantInfo(info);

      // Extract table information from the response
      const tableInfo = extractTableInfo(info);
      setPlantTable(tableInfo);
    } catch (error) {
      console.error('Error identifying plant:', error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
      setPlantInfo(null);
      setPlantTable(null);
    }
    setIsLoading(false);
  };

  const extractTableInfo = (info: string): { [key: string]: string } => {
    const lines = info.split('\n');
    const tableInfo: { [key: string]: string } = {};
    let currentKey = '';
    let currentValue = '';

    lines.forEach(line => {
      // Remove asterisks and trim the line
      line = line.replace(/\*/g, '').trim();

      // Check if the line is a key (ends with a colon)
      if (line.endsWith(':')) {
        // If we have a previous key-value pair, add it to the table
        if (currentKey && currentValue) {
          tableInfo[currentKey] = currentValue.trim();
        }
        // Start a new key-value pair
        currentKey = line.slice(0, -1).trim(); // Remove the colon
        currentValue = '';
      } else if (currentKey) {
        // If we have a current key, add this line to its value
        currentValue += ' ' + line;
      }
    });

    // Add the last key-value pair if it exists
    if (currentKey && currentValue) {
      tableInfo[currentKey] = currentValue.trim();
    }

    return tableInfo;
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-100 to-green-200 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl font-bold text-green-800 mb-2 text-center">Plant Identifier</h1>
        <p className="text-lg text-green-600 mb-8 text-center">Upload a photo to identify and learn about plants!</p>

        <ImageUpload onImageUpload={handleImageUpload} />

        {isLoading && <p className="mt-4 text-gray-600 text-center">Identifying plant...</p>}

        {error && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            Error: {error}
          </div>
        )}

        {uploadedImage && <ImageDisplay imageUrl={uploadedImage} />}

        {plantInfo && <PlantInfo info={plantInfo} />}

        {plantTable && Object.keys(plantTable).length > 0 && <PlantTable info={plantTable} />}
      </div>
    </main>
  );
}