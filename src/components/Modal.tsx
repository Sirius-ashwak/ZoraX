import React from 'react';

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-strong">
      <div className="bg-bg-primary rounded-xl shadow-glow p-8 relative min-w-[320px] max-w-lg w-full">
        <button
          className="absolute top-3 right-3 text-accent hover:text-accent-hover text-2xl font-bold focus:outline-none"
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}; 