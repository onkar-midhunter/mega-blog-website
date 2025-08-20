import React from "react";
import { Lock } from "lucide-react"; // lock icon
import { useNavigate } from "react-router-dom";

export default function LoginPrompt() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-wrap justify-center">
      <div className="p-6 w-full max-w-md bg-white rounded-2xl shadow-lg text-center">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <Lock className="h-10 w-10 text-amber-600" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Login Required
        </h1>

        {/* Subtitle */}
        <p className="text-gray-500 mb-6">
          Please log in to read posts and access exclusive content.
        </p>

        {/* Button */}
        <button onClick={() =>navigate("/login")}className="px-6 py-2 bg-amber-600 text-white rounded-xl shadow hover:bg-amber-700 transition cursor-pointer">
          Login
        </button>
      </div>
    </div>
  );
}
