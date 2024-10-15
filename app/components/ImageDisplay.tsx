import React from 'react';
import Image from 'next/image';

interface ImageDisplayProps {
  imageUrl: string;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageUrl }) => {
  return (
    <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
      <div className="relative w-full h-64 md:h-96">
        <Image
          src={imageUrl}
          alt="Uploaded plant"
          layout="fill"
          objectFit="contain"
          className="rounded-lg"
        />
      </div>
    </div>
  );
};

export default ImageDisplay;