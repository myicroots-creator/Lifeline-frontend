import Image from "next/image"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Activity, Database, Bell, Users, TrendingUp, FileUp, ArrowRight, Heart, Shield, Zap } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              {/* <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Heart className="h-6 w-6 text-primary-foreground fill-current" />
              </div> */}
              <div className="flex items-center gap-2 ">
  <Image 
    src="/lifeline.png" 
    alt="Lifeline Logo" 
    width={80} 
    height={80} 
    className="rounded-lg"
  />
  
  </div>

              <span className="text-xl font-bold">Lifeline</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                How It Works
              </Link>
              <Link href="#impact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Impact
              </Link>
              <Link href="/auth/login">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button size="sm">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10 opacity-50" />
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-balance mb-6">
              Predict. Connect. <span className="text-primary">Save Lives.</span>
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground text-balance mb-10 max-w-3xl mx-auto">
              AI-powered blood bank management system that prevents shortages, reduces wastage, and connects hospitals
              with donors in real-time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register?role=hospital">
                <Button size="lg" className="text-base px-8">
                  Register Hospital
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/auth/register?role=donor">
                <Button size="lg" variant="outline" className="text-base px-8 bg-transparent">
                  Become a Donor
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">The Crisis We're Solving</h2>
            <p className="text-lg text-muted-foreground">
              Blood shortages claim thousands of lives annually, while 25% of collected blood expires unused.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="p-6 bg-card border-border">
              <div className="text-4xl font-bold text-primary mb-2">30%</div>
              <div className="text-sm text-muted-foreground">of maternal deaths due to blood unavailability</div>
            </Card>
            <Card className="p-6 bg-card border-border">
              <div className="text-4xl font-bold text-primary mb-2">25%</div>
              <div className="text-sm text-muted-foreground">of blood units wasted due to expiry</div>
            </Card>
            <Card className="p-6 bg-card border-border">
              <div className="text-4xl font-bold text-primary mb-2">48hrs</div>
              <div className="text-sm text-muted-foreground">average time to find rare blood types</div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Comprehensive Blood Bank Management</h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to manage inventory, predict demand, and save lives.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                <Database className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Inventory Management</h3>
              <p className="text-muted-foreground">
                Track blood units with expiry dates, blood types, and real-time stock levels across your facility.
              </p>
            </Card>

            <Card className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 mb-4">
                <TrendingUp className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Predictions</h3>
              <p className="text-muted-foreground">
                Forecast shortages by blood type using historical data and seasonal patterns to stay ahead.
              </p>
            </Card>

            <Card className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                <Bell className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Alerts</h3>
              <p className="text-muted-foreground">
                Get notified about low stock, expiring units, and critical shortages before they become emergencies.
              </p>
            </Card>

            <Card className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 mb-4">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Donor Management</h3>
              <p className="text-muted-foreground">
                Maintain donor records, track eligibility, and send automated reminders when they can donate again.
              </p>
            </Card>

            <Card className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                <Activity className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Inter-Hospital Network</h3>
              <p className="text-muted-foreground">
                Request and share blood units with nearby hospitals to prevent shortages and reduce wastage.
              </p>
            </Card>

            <Card className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 mb-4">
                <FileUp className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Data Extraction</h3>
              <p className="text-muted-foreground">
                Upload existing records (CSV, Excel, PDF, images) and let AI extract and digitize your data instantly.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">How Lifeline Works</h2>
            <p className="text-lg text-muted-foreground">Three simple steps to transform your blood bank operations</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Track</h3>
              <p className="text-muted-foreground">
                Digitize your inventory and donor records. Upload existing files or enter data manually.
              </p>
            </div>
            <div className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 mx-auto mb-4">
                <Zap className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Predict</h3>
              <p className="text-muted-foreground">
                AI analyzes patterns and forecasts shortages before they happen, giving you time to act.
              </p>
            </div>
            <div className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto mb-4">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Save</h3>
              <p className="text-muted-foreground">
                Connect with donors and hospitals instantly. Reduce wastage and ensure blood is always available.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="py-20 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Impact</h2>
            <p className="text-lg text-muted-foreground">Join hospitals and donors making a difference</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <Card className="p-6 bg-card border-border text-center">
              <div className="text-4xl font-bold text-accent mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Lives Saved</div>
            </Card>
            <Card className="p-6 bg-card border-border text-center">
              <div className="text-4xl font-bold text-accent mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Hospitals Onboarded</div>
            </Card>
            <Card className="p-6 bg-card border-border text-center">
              <div className="text-4xl font-bold text-accent mb-2">2,000+</div>
              <div className="text-sm text-muted-foreground">Active Donors</div>
            </Card>
            <Card className="p-6 bg-card border-border text-center">
              <div className="text-4xl font-bold text-accent mb-2">40%</div>
              <div className="text-sm text-muted-foreground">Wastage Reduced</div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-12 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Save Lives?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join the network of hospitals and donors using Lifeline to prevent blood shortages and reduce wastage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register?role=hospital">
                <Button size="lg" className="text-base px-8">
                  Register Your Hospital
                </Button>
              </Link>
              <Link href="/auth/register?role=donor">
                <Button size="lg" variant="outline" className="text-base px-8 bg-transparent">
                  Sign Up as Donor
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                {/* <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <Heart className="h-5 w-5 text-primary-foreground fill-current" />
                </div> */}
                           <div className="flex items-center gap-2 ">
  <Image 
    src="/lifeline.png" 
    alt="Lifeline Logo" 
    width={60} 
    height={60} 
    className="rounded-lg"
  />
  
  </div>
                
                <span className="text-lg font-bold">Lifeline</span>
              </div>
              <p className="text-sm text-muted-foreground">Predict. Connect. Save Lives.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#features" className="hover:text-foreground transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#how-it-works" className="hover:text-foreground transition-colors">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="#impact" className="hover:text-foreground transition-colors">
                    Impact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#how-it-works" className="hover:text-foreground transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#privacy" className="hover:text-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#terms" className="hover:text-foreground transition-colors">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link href="#regulatory" className="hover:text-foreground transition-colors">
                    Regulatory Notice
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>&copy; 2025 Lifeline. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
