import React, { useState } from 'react';
import { GalleryItem } from '../types';
import { X } from 'lucide-react';

interface GalleryGridProps {
  items: GalleryItem[];
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ items }) => {
  const [filter, setFilter] = useState('All');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Baju', 'Pelamin', 'Dewan', 'Majlis', 'Outdoor'];

  const filteredItems = filter === 'All' ? items : items.filter(item => item.category === filter);

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === cat 
                ? 'bg-roseGold text-white shadow-md' 
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {filteredItems.map((item) => (
          <div 
            key={item.id} 
            className="break-inside-avoid group relative rounded-xl overflow-hidden cursor-pointer"
            onClick={() => setSelectedImage(item)}
          >
            <img 
              src={item.src} 
              alt={item.caption} 
              className="w-full h-auto transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <p className="text-white font-serif text-lg">{item.caption}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <button className="absolute top-6 right-6 text-white hover:text-roseGold transition-colors">
            <X size={32} />
          </button>
          <div className="max-w-4xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <img 
              src={selectedImage.src} 
              alt={selectedImage.caption} 
              className="w-full h-full object-contain rounded-sm" 
            />
            <div className="mt-4 text-center text-white font-serif text-xl">
              {selectedImage.caption}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryGrid;