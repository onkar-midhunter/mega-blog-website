import React from "react";
import { Loader2 } from "lucide-react";

export default function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-900 to-amber-950 text-white px-4">
      <div className="flex flex-col items-center bg-amber-800/20 backdrop-blur-md rounded-2xl p-8 shadow-xl">
        {/* Spinner */}
        <Loader2 className="h-20 w-20 animate-spin text-amber-400" />

        {/* Title */}
        <h1 className="mt-6 text-3xl font-bold tracking-wider animate-fadeIn">
          Preparing your dashboard...
        </h1>

        {/* Subtext */}
        <p className="mt-2 text-md text-amber-200 opacity-90 animate-fadeIn delay-150">
          Hang tight, we’re setting things up for you
        </p>

        {/* Progress Dots */}
        <div className="flex mt-6 space-x-2">
          <span className="w-3 h-3 bg-amber-400 rounded-full animate-bounce"></span>
          <span className="w-3 h-3 bg-amber-400 rounded-full animate-bounce delay-150"></span>
          <span className="w-3 h-3 bg-amber-400 rounded-full animate-bounce delay-300"></span>
        </div>
      </div>

      {/* Tailwind Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease forwards;
        }

        .delay-150 {
          animation-delay: 0.15s;
        }

        .delay-300 {
          animation-delay: 0.3s;
        }
      `}</style>
    </div>
  );
}
