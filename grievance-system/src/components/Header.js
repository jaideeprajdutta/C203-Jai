import React from 'react';
import {
  Home,
  MessageSquare,
  Search,
  Shield,
  MessageCircle,
  LogOut,
  Building2,
  Menu,
  X
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Button } from './ui/button';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state, logoutUser, toggleChatbot } = useAppContext();
  const { user } = state;
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logoutUser();
    navigate('/institution-select');
  };

  const navigationItems = [
    {
      label: 'Anonymous Feedback',
      path: '/anonymous-feedback',
      icon: <MessageSquare className="h-4 w-4" />,
      public: true,
    },
    {
      label: 'Track Status',
      path: '/status-tracking',
      icon: <Search className="h-4 w-4" />,
      public: true,
    },
  ];

  const authenticatedNavItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: <Home className="h-4 w-4" />,
    },
    ...(user.selectedRole?.name === 'Admin' || user.selectedRole?.name === 'Grievance Officer'
      ? [
          {
            label: 'Admin Dashboard',
            path: '/admin-dashboard',
            icon: <Shield className="h-4 w-4" />,
          },
        ]
      : []),
  ];

  const currentItems = user.isAuthenticated
    ? [...authenticatedNavItems, ...navigationItems]
    : navigationItems;

  return (
    <header className="bg-black border-b border-[#A2D5C6] shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between py-4">
          {/* Logo and Title */}
          <div 
            className="flex items-center gap-3 cursor-pointer group transition-all duration-200 hover:scale-105"
            onClick={() => {
              if (user.isAuthenticated) {
                navigate('/dashboard');
              } else {
                navigate('/');
              }
            }}
          >
            <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#CFFFE2] to-[#A2D5C6] shadow-lg group-hover:shadow-xl transition-all duration-200">
              <Building2 className="h-5 w-5 sm:h-6 sm:w-6 text-black" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#CFFFE2] transition-colors duration-200">
                Grievance Portal
              </h1>
              <p className="text-xs text-gray-300 group-hover:text-[#A2D5C6] transition-colors duration-200 hidden sm:block">
                Secure & Confidential
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Institution and Role Display */}
            {user.selectedInstitution && (
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-sm font-medium text-white">
                    {user.selectedInstitution.name}
                  </div>
                  {user.selectedRole && (
                    <div className="text-xs text-[#A2D5C6]">
                      {user.selectedRole.name}
                    </div>
                  )}
                </div>
                <div className="w-px h-8 bg-gray-600"></div>
              </div>
            )}

            {/* Navigation Items */}
            <nav className="flex items-center gap-2">
              {currentItems.map((item) => (
                <Button
                  key={item.path}
                  variant={location.pathname === item.path ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => navigate(item.path)}
                  className={`gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                    location.pathname === item.path 
                      ? 'bg-[#CFFFE2] text-black border border-[#A2D5C6] shadow-md hover:bg-[#A2D5C6] hover:text-black' 
                      : 'text-white border border-transparent hover:bg-[#CFFFE2]/10 hover:text-[#CFFFE2] hover:border-[#A2D5C6]/30'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Button>
              ))}

              {/* Divider */}
              <div className="w-px h-6 bg-gray-600 mx-2"></div>

              {/* Chatbot Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleChatbot}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  state.chatbotOpen 
                    ? 'bg-[#CFFFE2] text-black border border-[#A2D5C6] shadow-md hover:bg-[#A2D5C6]' 
                    : 'text-white border border-transparent hover:bg-[#CFFFE2]/10 hover:text-[#CFFFE2] hover:border-[#A2D5C6]/30'
                }`}
                title="Open Help Chat"
              >
                <MessageCircle className="h-4 w-4" />
              </Button>

              {/* Logout Button */}
              {user.isAuthenticated && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="p-2 rounded-lg text-white border border-transparent hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 transition-all duration-200"
                  title="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              )}
            </nav>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            {/* Chatbot Toggle - Mobile */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleChatbot}
              className={`p-2 rounded-lg transition-all duration-200 ${
                state.chatbotOpen 
                  ? 'bg-[#CFFFE2] text-black border border-[#A2D5C6] shadow-md hover:bg-[#A2D5C6]' 
                  : 'text-white border border-transparent hover:bg-[#CFFFE2]/10 hover:text-[#CFFFE2] hover:border-[#A2D5C6]/30'
              }`}
              title="Open Help Chat"
            >
              <MessageCircle className="h-4 w-4" />
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-white border border-transparent hover:bg-[#CFFFE2]/10 hover:text-[#CFFFE2] hover:border-[#A2D5C6]/30 transition-all duration-200"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-700 py-4 space-y-2">
            {/* Institution and Role Display - Mobile */}
            {user.selectedInstitution && (
              <div className="px-4 py-2 border-b border-gray-700 mb-4">
                <div className="text-sm font-medium text-white">
                  {user.selectedInstitution.name}
                </div>
                {user.selectedRole && (
                  <div className="text-xs text-[#A2D5C6]">
                    {user.selectedRole.name}
                  </div>
                )}
              </div>
            )}

            {/* Mobile Navigation Items */}
            {currentItems.map((item) => (
              <Button
                key={item.path}
                variant="ghost"
                onClick={() => {
                  navigate(item.path);
                  setMobileMenuOpen(false);
                }}
                className={`w-full justify-start gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  location.pathname === item.path 
                    ? 'bg-[#CFFFE2] text-black border border-[#A2D5C6] shadow-md hover:bg-[#A2D5C6] hover:text-black' 
                    : 'text-white border border-transparent hover:bg-[#CFFFE2]/10 hover:text-[#CFFFE2] hover:border-[#A2D5C6]/30'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Button>
            ))}

            {/* Mobile Logout Button */}
            {user.isAuthenticated && (
              <Button
                variant="ghost"
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full justify-start gap-3 px-4 py-3 rounded-lg text-white border border-transparent hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 transition-all duration-200"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;