
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';

type LocationState = {
  redirectTo?: string;
};

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const locationState = location.state as LocationState;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const success = await login(email, password);
      
      if (success) {
        // Redirect to the page the user was trying to access, or to homepage
        const redirectTo = locationState?.redirectTo || '/';
        navigate(redirectTo);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-luxe-dark text-white">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="luxe-container max-w-md mx-auto">
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-serif font-bold mb-2">Welcome Back</h1>
              <p className="text-gray-400">Sign in to your LuxeStay account</p>
              <div className="mt-4 p-2 bg-gray-800/60 rounded-lg">
                <p className="text-sm text-gray-300 mb-2">Demo Accounts:</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-gray-700/50 p-2 rounded">
                    <div className="font-medium text-luxe-gold">Customer</div>
                    <div>customer@example.com</div>
                  </div>
                  <div className="bg-gray-700/50 p-2 rounded">
                    <div className="font-medium text-luxe-gold">Manager</div>
                    <div>manager@example.com</div>
                  </div>
                  <div className="bg-gray-700/50 p-2 rounded">
                    <div className="font-medium text-luxe-gold">Admin</div>
                    <div>admin@example.com</div>
                  </div>
                  <div className="bg-gray-700/50 p-2 rounded">
                    <div className="font-medium text-luxe-gold">Guest</div>
                    <div>guest@example.com</div>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-2">Any password will work</p>
              </div>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-gray-800/50 border-gray-700 text-white focus:ring-luxe-gold focus:border-luxe-gold"
                  placeholder="Enter your email"
                  autoComplete="email"
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="password" className="block text-sm font-medium">
                    Password
                  </label>
                  <Link to="/forgot-password" className="text-xs text-luxe-gold hover:underline">
                    Forgot Password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-gray-800/50 border-gray-700 text-white focus:ring-luxe-gold focus:border-luxe-gold"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-luxe-gold hover:bg-luxe-gold/90 text-white"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
            
            <div className="relative flex justify-center items-center mt-8 mb-6">
              <Separator className="absolute w-full bg-gray-800" />
              <span className="bg-gray-900 px-2 z-10 text-gray-400 text-sm">Or continue with</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Button variant="outline" className="border-gray-700 hover:border-gray-600 text-white">
                Google
              </Button>
              <Button variant="outline" className="border-gray-700 hover:border-gray-600 text-white">
                Facebook
              </Button>
            </div>
            
            <p className="text-center text-gray-400 text-sm">
              Don't have an account?{' '}
              <Link to="/register" className="text-luxe-gold hover:underline">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
