"use client";

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DonorLayout } from "@/components/donor/donor-layout";
import { BookingModal } from "@/components/donor/BookingModal";
import { ResponseModal } from "@/components/donor/ResponseModal";
import {
  Calendar,
  Heart,
  MapPin,
  Clock,
  Bell,
  Award,
  TrendingUp,
} from "lucide-react";

// Define a type for our booking data for better code safety
interface Booking {
  hospital: string;
  date: string;
}

export default function DonorDashboard() {
  // State for the two modals
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isResponseModalOpen, setIsResponseModalOpen] = useState(false);
  const [selectedHospitalForResponse, setSelectedHospitalForResponse] = useState<string | null>(null);
  
  // State for the dynamic booking reminder
  const [upcomingBooking, setUpcomingBooking] = useState<Booking | null>(null);

  // This effect runs once when the component loads to check for a saved booking
  useEffect(() => {
    const savedBooking = localStorage.getItem('lifelineBooking');
    if (savedBooking) {
      setUpcomingBooking(JSON.parse(savedBooking));
    }
  }, []);

  // Hardcoded data for the demo
  const donorProfile = {
    name: "Lydia Solomon",
    bloodType: "O+",
    lastDonation: "2024-11-15",
    nextEligible: "2025-10-15",
    totalDonations: 12,
    livesImpacted: 36,
  };

  const nearbyShortages = [
    {
      hospital: "City General Hospital",
      bloodType: "O+",
      urgency: "critical",
      distance: "2.3 km",
    },
    {
      hospital: "Memorial Medical Center",
      bloodType: "O-",
      urgency: "urgent",
      distance: "4.1 km",
    },
  ];

  const defaultReminders = [
    {
      title: "Health checkup recommended",
      date: "Feb 20, 2025",
      type: "health",
    },
  ];

  // Handler for the "Respond" button in the shortages card
  const handleRespondClick = (hospital: string) => {
    setSelectedHospitalForResponse(hospital);
    setIsResponseModalOpen(true);
  };

  const handleCloseResponseModal = () => {
    setIsResponseModalOpen(false);
    setSelectedHospitalForResponse(null);
  };

  // Handler for the "Book Donation Slot" button
  const handleBookingSuccess = () => {
    const savedBooking = localStorage.getItem('lifelineBooking');
    if (savedBooking) {
      setUpcomingBooking(JSON.parse(savedBooking));
    }
    setIsBookingModalOpen(false);
  };

  return (
    <DonorLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold">
            Welcome back, {donorProfile.name}
          </h1>
          <p className="text-muted-foreground">
            Your next donation eligibility: {donorProfile.nextEligible}
          </p>
        </div>

        {/* Profile Card */}
        <Card className="border-border bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Heart className="h-8 w-8 fill-current" />
                </div>
                <div>
                  <div className="text-2xl font-bold font-mono">
                    {donorProfile.bloodType}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Blood Type
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">
                  {donorProfile.totalDonations}
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Donations
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Lives Impacted
              </CardTitle>
              <Heart className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {donorProfile.livesImpacted}
              </div>
              <p className="text-xs text-muted-foreground">
                Each donation helps 3 people
              </p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Last Donation
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {donorProfile.lastDonation}
              </div>
              <p className="text-xs text-muted-foreground">92 days ago</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Donor Level</CardTitle>
              <Award className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Gold</div>
              <p className="text-xs text-muted-foreground">10+ donations</p>
            </CardContent>
          </Card>
        </div>

        {/* Shortage Alerts */}
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Nearby Shortages</CardTitle>
                <CardDescription>
                  Hospitals near you need your blood type
                </CardDescription>
              </div>
              <Bell className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {nearbyShortages.map((shortage, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg bg-card border border-border"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium">{shortage.hospital}</p>
                    <Badge
                      variant="outline"
                      className={
                        shortage.urgency === "critical"
                          ? "bg-primary/20 text-primary border-primary/30"
                          : "bg-yellow-500/20 text-yellow-500 border-yellow-500/30"
                      }
                    >
                      {shortage.urgency}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {shortage.distance}
                    </span>
                    <span className="font-mono">{shortage.bloodType}</span>
                  </div>
                </div>
                <Button
                  size="sm"
                  onClick={() => handleRespondClick(shortage.hospital)}
                >
                  Respond
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Reminders */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Upcoming Reminders</CardTitle>
            <CardDescription>Important dates and notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingBooking && (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 border border-primary/30">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary">
                  <Calendar className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Upcoming Donation Appointment</p>
                  <p className="text-xs text-muted-foreground">
                    {upcomingBooking.hospital} on {new Date(upcomingBooking.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </div>
            )}

            {defaultReminders.map((reminder, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border"
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    reminder.type === "eligibility"
                      ? "bg-accent/10 text-accent"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  {reminder.type === "eligibility" ? (
                    <Clock className="h-5 w-5" />
                  ) : (
                    <TrendingUp className="h-5 w-5" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{reminder.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {reminder.date}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Book Donation CTA */}
        <Card className="border-border bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center">
                <img
                  src="/lifeline.png"
                  alt="Lifeline Logo"
                  className="h-12 w-12 object-contain"
                />
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2">Ready to Save Lives?</h3>
                <p className="text-muted-foreground mb-4">
                  You're eligible to donate. Schedule your next appointment.
                </p>
              </div>
              <Button size="lg" onClick={() => setIsBookingModalOpen(true)}>
                Book Donation Slot
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* --- RENDER BOTH MODALS CONDITIONALLY --- */}
      {isBookingModalOpen && <BookingModal onBookingSuccess={handleBookingSuccess} />}
      
      {isResponseModalOpen && selectedHospitalForResponse && (
        <ResponseModal
          hospitalName={selectedHospitalForResponse}
          onClose={handleCloseResponseModal}
        />
      )}
    </DonorLayout>
  );
}