import React from 'react';

interface PlantTableProps {
  info: {
    [key: string]: string;
  };
}

const PlantTable: React.FC<PlantTableProps> = ({ info }) => {
  const entries = Object.entries(info);

  if (entries.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 p-4 bg-white rounded-lg shadow-md overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4 text-green-700">Plant Details</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <tbody className="bg-white divide-y divide-gray-200">
          {entries.map(([key, value]) => (
            <tr key={key}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{key}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlantTable;