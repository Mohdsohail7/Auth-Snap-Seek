import React from 'react';
import ImageCard from './ImageCard';

export default function ImageGrid({ images = [], selected = [], setSelected }) {
  const toggleSelect = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((x) => x !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-3">
      {images.map((img) => (
        <ImageCard
          key={img.id}
          img={img}
          isSelected={selected.includes(img.id)}
          toggleSelect={toggleSelect}
        />
      ))}
    </div>
  );
}
