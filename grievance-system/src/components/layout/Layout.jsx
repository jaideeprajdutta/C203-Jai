import React from 'react';
import Header from '../Header';
import Footer from './Footer';

const Layout = ({ children, showBackground = true, className = '' }) => {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background with college theme */}
      {showBackground && (
        <div className="fixed inset-0 z-0">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#F6F6F6] via-[#CFFFE2]/20 to-[#A2D5C6]/30"></div>
          
          {/* Geometric Patterns */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-10 w-32 h-32 border-2 border-black rounded-full animate-pulse"></div>
            <div className="absolute top-40 right-20 w-24 h-24 border-2 border-[#A2D5C6] rotate-45 animate-bounce"></div>
            <div className="absolute bottom-40 left-20 w-20 h-20 bg-[#CFFFE2] rounded-lg rotate-12 animate-pulse"></div>
            <div className="absolute bottom-20 right-40 w-28 h-28 border-2 border-black rounded-full animate-bounce"></div>
          </div>

          {/* Subtle Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          ></div>

          {/* College-themed Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Books/Education themed shapes */}
            <div className="absolute top-1/4 left-1/4 w-16 h-20 bg-[#CFFFE2]/20 rounded-sm rotate-12 animate-pulse"></div>
            <div className="absolute top-1/3 right-1/3 w-12 h-16 bg-[#A2D5C6]/20 rounded-sm -rotate-6 animate-pulse"></div>
            <div className="absolute bottom-1/4 left-1/3 w-14 h-18 bg-[#CFFFE2]/20 rounded-sm rotate-45 animate-pulse"></div>
            
            {/* Floating particles */}
            <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-[#A2D5C6] rounded-full animate-ping"></div>
            <div className="absolute top-1/3 left-2/3 w-1 h-1 bg-black rounded-full animate-ping animation-delay-1000"></div>
            <div className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 bg-[#CFFFE2] rounded-full animate-ping animation-delay-2000"></div>
          </div>

          {/* Blur overlay for content readability */}
          <div className="absolute inset-0 backdrop-blur-[0.5px] bg-white/10"></div>
        </div>
      )}

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className={`flex-1 relative z-10 ${className}`}>
        <div className="container mx-auto px-4 py-8">
          {children}
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Custom CSS for animation delays */}
      <style jsx>{`
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default Layout;