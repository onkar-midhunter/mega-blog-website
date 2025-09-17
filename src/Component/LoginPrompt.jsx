import React from "react";
import { Lock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LoginPrompt() {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center border border-slate-200">
          {/* Icon */}
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
            <Lock className="h-10 w-10 text-white" />
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-slate-800 mb-4">
            Welcome to MegaBlog
          </h1>

          {/* Subtitle */}
          <p className="text-slate-600 mb-8 leading-relaxed">
            Join our community to discover amazing stories, share your thoughts, and connect with fellow writers.
          </p>

          {/* Buttons */}
          <div className="space-y-4">
            <button 
              onClick={() => navigate("/login")}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl shadow-lg hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-200 hover:shadow-xl"
            >
              Sign In
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <button 
              onClick={() => navigate("/signup")}
              className="w-full px-6 py-4 border-2 border-slate-300 text-slate-700 font-semibold rounded-xl hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transform hover:scale-105 transition-all duration-200"
            >
              Create Account
            </button>
          </div>

          {/* Features */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <p className="text-sm text-slate-500 mb-4">What you'll get:</p>
            <div className="space-y-2 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Access to premium content</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Create and share your posts</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Connect with other writers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}