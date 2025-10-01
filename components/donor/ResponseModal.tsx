// src/components/donor/ResponseModal.tsx
"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, CheckCircle, AlertTriangle } from 'lucide-react';

interface ResponseModalProps {
  hospitalName: string;
  onClose: () => void;
}

export const ResponseModal: React.FC<ResponseModalProps> = ({ hospitalName, onClose }) => {
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleConfirm = () => {
    // In a real app, you would make an API call here to notify the hospital.
    console.log(`User confirmed response for ${hospitalName}`);
    setIsConfirmed(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-background rounded-lg shadow-xl w-full max-w-md m-4 p-6 relative animate-in fade-in-0 zoom-in-95">
        
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
          <X size={24} />
        </button>

        {!isConfirmed ? (
          // --- Confirmation Step ---
          <div className="text-center py-4">
            <AlertTriangle className="w-16 h-16 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Confirm Your Response</h2>
            <p className="text-muted-foreground mb-6">
              You are about to respond to an urgent blood need at <strong>{hospitalName}</strong>. They will be notified and may contact you shortly.
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleConfirm}>
                Yes, I'm Available
              </Button>
            </div>
          </div>
        ) : (
          // --- Success Step ---
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Response Sent!</h2>
            <p className="text-muted-foreground mb-6">
              Thank you for your willingness to help. <strong>{hospitalName}</strong> has been notified.
            </p>
            <Button onClick={onClose}>
              Done
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};