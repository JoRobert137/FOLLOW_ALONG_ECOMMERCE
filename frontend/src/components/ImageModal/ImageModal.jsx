/* eslint-disable react/prop-types */
import { ArrowLeft, ArrowRight, X } from 'lucide-react';

function ImageModal({
  product,
  selectedImage,
  setSelectedImage,
  setShowImageModal,
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in"
      style={{ background: 'rgba(15, 23, 42, 0.95)' }}
      onClick={() => setShowImageModal(false)}
    >
      <button
        onClick={() => setShowImageModal(false)}
        className="absolute top-6 right-6 p-2 rounded-full transition-all duration-200 hover:scale-110 z-10"
        style={{
          background: 'rgba(255,255,255,0.1)',
          color: 'white',
        }}
      >
        <X className="w-5 h-5" />
      </button>

      <div
        className="relative w-full max-w-4xl px-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={product.images[selectedImage]}
          alt={product.title}
          className="w-full max-h-[80vh] object-contain rounded-2xl"
        />

        {/* Dots */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
          {product.images.map((_, idx) => (
            <button
              key={idx}
              className="w-2.5 h-2.5 rounded-full transition-all duration-200"
              style={{
                background: selectedImage === idx ? 'var(--amber)' : 'rgba(255,255,255,0.3)',
                transform: selectedImage === idx ? 'scale(1.3)' : 'scale(1)',
              }}
              onClick={() => setSelectedImage(idx)}
            />
          ))}
        </div>

        {/* Prev */}
        {selectedImage > 0 && (
          <button
            onClick={() => setSelectedImage((prev) => prev - 1)}
            className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full transition-all duration-200 hover:scale-110"
            style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(8px)',
              color: 'white',
            }}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}

        {/* Next */}
        {selectedImage < product.images.length - 1 && (
          <button
            onClick={() => setSelectedImage((prev) => prev + 1)}
            className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full transition-all duration-200 hover:scale-110"
            style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(8px)',
              color: 'white',
            }}
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}

export default ImageModal;