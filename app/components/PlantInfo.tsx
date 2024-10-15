import React from 'react';

interface PlantInfoProps {
  info: string;
}

const PlantInfo: React.FC<PlantInfoProps> = ({ info }) => {
  return (
    <div className="mt-6 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-green-700">Plant Information</h2>
      <div className="prose max-w-none">
        <p className="text-gray-700 whitespace-pre-wrap">{info}</p>
      </div>
    </div>
  );
};

export default PlantInfo;