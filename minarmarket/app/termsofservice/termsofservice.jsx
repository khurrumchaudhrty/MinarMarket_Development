"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"


export default function TermsOfService() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const lastUpdated = "February 1, 2024"

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-slate-900 text-white/80">
      {/* Noise texture overlay */}
      <div className="fixed inset-0 opacity-5 mix-blend-soft-light pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      {/* Animated particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: "rgba(255,255,255,0.3)",
              boxShadow: "0 0 10px rgba(255,255,255,0.2)",
              animation: `float-particle ${Math.random() * 20 + 30}s linear infinite`,
              opacity: Math.random() * 0.5 + 0.2,
            }}
          />
        ))}
      </div>

      {/* Mouse light effect */}
      <div
        className="fixed w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 70%)",
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: "translate(-50%, -50%)",
          transition: "left 1s ease-out, top 1s ease-out",
        }}
      />

      <div className="relative z-10">
      

        <main className="container px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12 animate-fade-in">
              <Link href="/">
                <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
            </div>

            <div className="space-y-12">
              <div className="animate-fade-in">
                <h1 className="text-4xl font-bold text-white/90 mb-4">Terms of Service</h1>
                <p className="text-white/60">Last updated: {lastUpdated}</p>
              </div>

              <div
                className="prose prose-invert prose-lg max-w-none space-y-8 animate-fade-in"
                style={{ animationDelay: "0.2s" }}
              >
                <p>
                  Welcome to MinarMarket. By accessing or using our services, you agree to be bound by these Terms of
                  Service.
                </p>

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold text-white/90">1. Account Terms</h2>
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                    <ul className="space-y-3 text-white/70">
                      <li>You must be 18 years or older to use this service</li>
                      <li>You must provide accurate and complete information</li>
                      <li>You are responsible for maintaining account security</li>
                      <li>One person or entity may not maintain multiple accounts</li>
                    </ul>
                  </div>
                </section>

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold text-white/90">2. Acceptable Use</h2>
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                    <ul className="space-y-3 text-white/70">
                      <li>No illegal or unauthorized use</li>
                      <li>No harassment or abuse of other users</li>
                      <li>No interference with service operation</li>
                      <li>No distribution of malware or harmful code</li>
                    </ul>
                  </div>
                </section>

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold text-white/90">3. Payment Terms</h2>
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                    <ul className="space-y-3 text-white/70">
                      <li>All fees are in USD unless otherwise stated</li>
                      <li>Payment is required before service delivery</li>
                      <li>Refunds are subject to our refund policy</li>
                      <li>We use secure payment processors</li>
                    </ul>
                  </div>
                </section>

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold text-white/90">4. Content Rights</h2>
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                    <ul className="space-y-3 text-white/70">
                      <li>You retain rights to your content</li>
                      <li>We may use your content for service operation</li>
                      <li>You must have rights to content you post</li>
                      <li>We may remove content that violates terms</li>
                    </ul>
                  </div>
                </section>

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold text-white/90">5. Termination</h2>
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                    <ul className="space-y-3 text-white/70">
                      <li>We may terminate service at our discretion</li>
                      <li>You may terminate your account at any time</li>
                      <li>Termination may result in content deletion</li>
                      <li>Some terms survive termination</li>
                    </ul>
                  </div>
                </section>

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold text-white/90">Contact</h2>
                  <p>For questions about these Terms of Service, please contact us at:</p>
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                    <p className="text-white/70">
                      Email: legal@minarmarket.com
                      <br />
                      Address: 123 Market Street, Suite 456, San Francisco, CA 94105
                    </p>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>

        
      </div>

      <style jsx global>{`
                @keyframes float-particle {
                    0% {
                        transform: translateY(0) translateX(0);
                    }
                    25% {
                        transform: translateY(-20px) translateX(10px);
                    }
                    50% {
                        transform: translateY(-10px) translateX(20px);
                    }
                    75% {
                        transform: translateY(10px) translateX(-10px);
                    }
                    100% {
                        transform: translateY(0) translateX(0);
                    }
                }
                
                @keyframes fade-in {
                    0% {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .animate-fade-in {
                    opacity: 0;
                    animation: fade-in 1s ease-out forwards;
                }
            `}</style>
    </div>
  )
}

