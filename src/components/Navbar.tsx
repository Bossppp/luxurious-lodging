
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Hotel, User, LogIn, ShoppingBag, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This would be replaced with proper auth state

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

          {isLoggedIn ? (
            <Link to="/profile">
              <Button variant="outline" className="text-luxe-gold border-luxe-gold hover:bg-luxe-gold hover:text-white">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Button>
            </Link>
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
              About
            </Link>
            <hr className="border-gray-700" />
            {isLoggedIn ? (
              <Link 
                to="/profile" 
                className="flex items-center px-4 py-2 hover:bg-luxe-dark/60 rounded-md" 
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="mr-2 h-4 w-4" />
                Profile
              </Link>
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
