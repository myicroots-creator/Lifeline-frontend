// src/components/donor/BookingModal.tsx
"use client";

import React, { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const hospitals = [
  { id: 1, name: 'Lagos General Hospital' },
  { id: 2, name: 'National Hospital Abuja' },
  { id: 3, name: 'UITH Ilorin' },
];

interface BookingModalProps {
  onBookingSuccess: () => void; // This will tell the dashboard to update and close
}

export const BookingModal: React.FC<BookingModalProps> = ({ onBookingSuccess }) => {
  const [modalStep, setModalStep] = useState<'form' | 'success'>('form');
  const [selectedHospital, setSelectedHospital] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedHospital || !selectedDate) {
      setError('Please select a hospital and a date.');
      return;
    }
    
    // --- THIS IS THE NEW PART ---
    // 1. Create the booking object
    const bookingDetails = {
      hospital: selectedHospital,
      date: selectedDate,
    };

    // 2. Save it to localStorage
    localStorage.setItem('lifelineBooking', JSON.stringify(bookingDetails));
    
    console.log('Booking confirmed and saved to localStorage:', bookingDetails);
    
    // 3. Move to the success step
    setModalStep('success');
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-background rounded-lg shadow-xl w-full max-w-md m-4 p-6 relative animate-in fade-in-0 zoom-in-95">
        
        <button onClick={onBookingSuccess} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
          <X size={24} />
        </button>

        {modalStep === 'form' && (
          <>
            <h2 className="text-xl font-bold mb-4">Book Your Donation</h2>
            <p className="text-muted-foreground mb-6">Select your preferred location and date.</p>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="hospital" className="block text-sm font-medium mb-1">
                  Choose a Hospital
                </label>
                <select id="hospital" value={selectedHospital} onChange={(e) => setSelectedHospital(e.target.value)} className="w-full px-3 py-2 border rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="" disabled>Select a location</option>
                  {hospitals.map(h => <option key={h.id} value={h.name}>{h.name}</option>)}
                </select>
              </div>
              <div className="mb-6">
                <label htmlFor="date" className="block text-sm font-medium mb-1">
                  Select a Date
                </label>
                <input type="date" id="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="w-full px-3 py-2 border rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-primary" min={new Date().toISOString().split('T')[0]} />
              </div>
              {error && <p className="text-destructive text-center text-sm mb-4">{error}</p>}
              <Button type="submit" className="w-full">
                Confirm Booking
              </Button>
            </form>
          </>
        )}

        {modalStep === 'success' && (
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Booking Successful!</h2>
            <p className="text-muted-foreground mb-6">
              You're all set to donate at <strong>{selectedHospital}</strong> on <strong>{new Date(selectedDate).toLocaleDateString()}</strong>.
            </p>
            <Button onClick={onBookingSuccess}>
              Done
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};