import React from 'react';

export default function ImageCard({ img, isSelected, toggleSelect }) {
  return (
    <div className="relative rounded-md overflow-hidden">
      <img
        src={img.url_regular}
        alt={img.alt_description || img.photographer}
        className="w-full h-48 object-cover"
      />
      <label className="absolute top-2 left-2 bg-white bg-opacity-80 px-2 py-1 rounded-md flex items-center">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => toggleSelect(img.id)}
          className="mr-1"
        />
      </label>
    </div>
  );
}
