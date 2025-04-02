
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Hotel, User, LogIn, ShoppingBag, Search, LogOut, Shield, Home, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserRole } from '@/lib/types';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, currentUser, logout, hasRole } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <nav className="bg-luxe-dark text-white py-4 shadow-md relative z-50">
      <div className="luxe-container flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <span className="text-luxe-gold font-serif text-2xl font-bold">LuxeStay</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          <Link to="/" className="font-medium hover:text-luxe-gold transition-colors">Home</Link>
          <Link to="/hotels" className="font-medium hover:text-luxe-gold transition-colors">Hotels</Link>
          <Link to="/redemption" className="font-medium hover:text-luxe-gold transition-colors">Rewards</Link>
          <Link to="/about" className="font-medium hover:text-luxe-gold transition-colors">About</Link>
        </div>

        {/* Desktop Right Nav Items */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="text-white hover:text-luxe-gold">
            <Search className="h-5 w-5" />
          </Button>

          {isLoggedIn && currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10 border border-gray-700">
                    <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                    <AvatarFallback className="bg-luxe-gold text-white">
                      {getInitials(currentUser.name)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-gray-900 border-gray-700 text-white">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{currentUser.name}</p>
                    <p className="text-xs leading-none text-gray-400">{currentUser.email}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-xs bg-luxe-gold/20 text-luxe-gold px-2 py-1 rounded-full">
                        {currentUser.role}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem className="text-white hover:bg-gray-800 cursor-pointer" onClick={() => navigate('/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                
                {hasRole(UserRole.ADMIN) && (
                  <DropdownMenuItem className="text-white hover:bg-gray-800 cursor-pointer" onClick={() => navigate('/admin/dashboard')}>
                    <Shield className="mr-2 h-4 w-4" />
                    <span>Admin Dashboard</span>
                  </DropdownMenuItem>
                )}
                
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem className="text-white hover:bg-gray-800 cursor-pointer" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login">
              <Button variant="outline" className="text-luxe-gold border-luxe-gold hover:bg-luxe-gold hover:text-white">
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-luxe-dark shadow-lg py-4 px-4 z-50">
          <div className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="flex items-center px-4 py-2 hover:bg-luxe-dark/60 rounded-md" 
              onClick={() => setIsMenuOpen(false)}
            >
              <Home className="mr-2 h-4 w-4" />
              Home
            </Link>
            <Link 
              to="/hotels" 
              className="flex items-center px-4 py-2 hover:bg-luxe-dark/60 rounded-md" 
              onClick={() => setIsMenuOpen(false)}
            >
              <Hotel className="mr-2 h-4 w-4" />
              Hotels
            </Link>
            <Link 
              to="/redemption" 
              className="flex items-center px-4 py-2 hover:bg-luxe-dark/60 rounded-md" 
              onClick={() => setIsMenuOpen(false)}
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              Rewards
            </Link>
            <Link 
              to="/about" 
              className="flex items-center px-4 py-2 hover:bg-luxe-dark/60 rounded-md" 
              onClick={() => setIsMenuOpen(false)}
            >
              <Info className="mr-2 h-4 w-4" />
              About
            </Link>
            <hr className="border-gray-700" />
            
            {isLoggedIn && currentUser ? (
              <>
                <div className="px-4 py-2">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-9 w-9 border border-gray-700">
                      <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                      <AvatarFallback className="bg-luxe-gold text-white">
                        {getInitials(currentUser.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{currentUser.name}</p>
                      <p className="text-xs text-gray-400">{currentUser.role}</p>
                    </div>
                  </div>
                </div>
                <Link 
                  to="/profile" 
                  className="flex items-center px-4 py-2 hover:bg-luxe-dark/60 rounded-md" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
                
                {hasRole(UserRole.ADMIN) && (
                  <Link 
                    to="/admin/dashboard" 
                    className="flex items-center px-4 py-2 hover:bg-luxe-dark/60 rounded-md" 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Admin Dashboard
                  </Link>
                )}
                
                <Button
                  variant="ghost"
                  className="flex items-center justify-start px-4 py-2 hover:bg-luxe-dark/60 rounded-md w-full text-left"
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="flex items-center px-4 py-2 hover:bg-luxe-dark/60 rounded-md" 
                onClick={() => setIsMenuOpen(false)}
              >
                <LogIn className="mr-2 h-4 w-4" />
                Login / Register
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
