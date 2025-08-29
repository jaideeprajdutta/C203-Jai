import React from 'react';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Institution Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#CFFFE2]">
              Grievance Redressal System
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              A secure and transparent platform for addressing concerns and ensuring 
              your voice is heard within our educational community.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-md font-medium text-[#CFFFE2]">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="/anonymous-feedback" 
                  className="text-sm text-gray-300 hover:text-[#CFFFE2] transition-colors duration-200"
                >
                  Submit Anonymous Feedback
                </a>
              </li>
              <li>
                <a 
                  href="/status-tracking" 
                  className="text-sm text-gray-300 hover:text-[#CFFFE2] transition-colors duration-200"
                >
                  Track Your Grievance
                </a>
              </li>
              <li>
                <a 
                  href="/help" 
                  className="text-sm text-gray-300 hover:text-[#CFFFE2] transition-colors duration-200"
                >
                  Help & Support
                </a>
              </li>
              <li>
                <a 
                  href="/guidelines" 
                  className="text-sm text-gray-300 hover:text-[#CFFFE2] transition-colors duration-200"
                >
                  Grievance Guidelines
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="text-md font-medium text-[#CFFFE2]">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-[#A2D5C6]" />
                <span className="text-sm text-gray-300">grievance@institution.edu</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-[#A2D5C6]" />
                <span className="text-sm text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-[#A2D5C6]" />
                <span className="text-sm text-gray-300">Student Affairs Office, Main Campus</span>
              </div>
            </div>
          </div>

          {/* Important Links */}
          <div className="space-y-4">
            <h4 className="text-md font-medium text-[#CFFFE2]">Important</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="/privacy-policy" 
                  className="text-sm text-gray-300 hover:text-[#CFFFE2] transition-colors duration-200"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a 
                  href="/terms-of-service" 
                  className="text-sm text-gray-300 hover:text-[#CFFFE2] transition-colors duration-200"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a 
                  href="/accessibility" 
                  className="text-sm text-gray-300 hover:text-[#CFFFE2] transition-colors duration-200 flex items-center gap-1"
                >
                  Accessibility Statement
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a 
                  href="/anti-ragging" 
                  className="text-sm text-gray-300 hover:text-[#CFFFE2] transition-colors duration-200"
                >
                  Anti-Ragging Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} Educational Institution. All rights reserved.
            </div>

            {/* Emergency Contact */}
            <div className="text-sm text-gray-400">
              <span className="text-[#CFFFE2] font-medium">Emergency:</span> 
              <a 
                href="tel:+1-555-911-HELP" 
                className="ml-2 text-white hover:text-[#CFFFE2] transition-colors duration-200"
              >
                +1 (555) 911-HELP
              </a>
            </div>

            {/* Last Updated */}
            <div className="text-sm text-gray-400">
              System Status: <span className="text-green-400">Online</span>
            </div>
          </div>
        </div>

        {/* Additional Notice */}
        <div className="mt-6 p-4 bg-gray-900 rounded-lg border border-gray-700">
          <p className="text-xs text-gray-400 text-center leading-relaxed">
            This grievance system is monitored during business hours (Monday-Friday, 9:00 AM - 5:00 PM). 
            For urgent matters requiring immediate attention, please contact campus security or emergency services.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;