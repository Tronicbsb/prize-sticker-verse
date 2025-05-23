import React, { useState } from 'react';
import { Button } from '@/components/ui/button'; // Assuming you use shadcn Button
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ApresentacaoViewerProps {
  totalSlides: number;
  onClose: () => void; // Function to close the viewer
}

export const ApresentacaoViewer: React.FC<ApresentacaoViewerProps> = ({ totalSlides, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(1);

  const handleNext = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, totalSlides));
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 1));
  };

  // Format slide number with leading zero if needed (e.g., 01, 02, ... 31)
  const slideNumberFormatted = currentSlide.toString().padStart(2, '0');
  const imageUrl = `/apresentacao/slide-${slideNumberFormatted}.png`;

  return (
    <div className="fixed inset-0 bg-black/80 flex flex-col items-center justify-center z-50 p-4">
      {/* Close Button */}
      <Button
        variant="destructive"
        size="sm"
        onClick={onClose}
        className="absolute top-4 right-4"
      >
        Fechar (X)
      </Button>

      {/* Slide Image Container */}
      <div className="relative w-full max-w-4xl aspect-video bg-gray-900 rounded-lg overflow-hidden mb-4">
        <img
          src={imageUrl}
          alt={`Slide ${currentSlide}`}
          className="w-full h-full object-contain"
          onError={(e) => {
            // Optional: Handle image loading errors, e.g., show a placeholder
            console.error(`Erro ao carregar slide: ${imageUrl}`);
            (e.target as HTMLImageElement).src = '/placeholder.png'; // Provide a placeholder image path if needed
          }}
        />
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-center space-x-4">
        <Button onClick={handlePrev} disabled={currentSlide === 1} variant="outline" size="icon">
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <span className="text-white text-lg font-medium">
          Slide {currentSlide} de {totalSlides}
        </span>
        <Button onClick={handleNext} disabled={currentSlide === totalSlides} variant="outline" size="icon">
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

