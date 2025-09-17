import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (
    <footer className="mt-auto bg-gradient-to-r from-slate-900 to-slate-800 text-white">
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <Logo width="80px" />
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                MegaBlog
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              Your ultimate destination for insightful articles, creative stories, and engaging content.
            </p>
            <p className="text-slate-400 text-xs">
              &copy; 2025 MegaBlog. All Rights Reserved.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 relative">
              Company
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"></div>
            </h3>
            <ul className="space-y-3">
              {['Features', 'Pricing', 'Affiliate Program', 'Press Kit'].map((item) => (
                <li key={item}>
                  <Link
                    className="text-slate-300 hover:text-white hover:translate-x-1 transition-all duration-200 text-sm"
                    to="/"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 relative">
              Support
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"></div>
            </h3>
            <ul className="space-y-3">
              {['Account', 'Help', 'Contact Us', 'Customer Support'].map((item) => (
                <li key={item}>
                  <Link
                    className="text-slate-300 hover:text-white hover:translate-x-1 transition-all duration-200 text-sm"
                    to="/"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 relative">
              Legal
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"></div>
            </h3>
            <ul className="space-y-3">
              {['Terms & Conditions', 'Privacy Policy', 'Licensing'].map((item) => (
                <li key={item}>
                  <Link
                    className="text-slate-300 hover:text-white hover:translate-x-1 transition-all duration-200 text-sm"
                    to="/"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom border */}
        <div className="mt-12 pt-8 border-t border-slate-700 text-center">
          <p className="text-slate-400 text-sm">
            Made with ❤️ for the community
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer