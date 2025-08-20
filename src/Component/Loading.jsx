import React from "react";
import { Loader2 } from "lucide-react"; // icon spinner

export default function LoadingScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-amber-950 text-white">
      {/* Spinner */}
      <Loader2 className="h-16 w-16 animate-spin text-amber-400" />

      {/* Title */}
      <h1 className="mt-6 text-2xl font-semibold tracking-wide">
        Loading, please wait...
      </h1>

      {/* Subtext */}
      <p className="mt-2 text-sm text-amber-200 opacity-80">
        We’re preparing things for you
      </p>
    </div>
  );
}
