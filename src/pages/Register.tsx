
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { UserRole } from '@/lib/types';
import { toast } from '@/components/ui/use-toast';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, acceptTerms: checked }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive"
      });
      return;
    }
    
    if (!formData.acceptTerms) {
      toast({
        title: "Terms not accepted",
        description: "Please accept the terms and conditions to continue.",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);

    // Mock registration logic - would connect to authentication service in real app
    setTimeout(() => {
      setLoading(false);
      
      // Mock successful registration
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userRole', UserRole.CUSTOMER);
      
      toast({
        title: "Registration Successful",
        description: "Welcome to LuxeStay! Your account has been created.",
      });
      
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-luxe-dark text-white">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="luxe-container max-w-md mx-auto">
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-serif font-bold mb-2">Create Your Account</h1>
              <p className="text-gray-400">Join LuxeStay for exclusive luxury hotel experiences</p>
            </div>
            
            <form onSubmit={handleRegister} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                    First Name
                  </label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="bg-gray-800/50 border-gray-700 text-white focus:ring-luxe-gold focus:border-luxe-gold"
                    placeholder="First name"
                  />
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                    Last Name
                  </label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="bg-gray-800/50 border-gray-700 text-white focus:ring-luxe-gold focus:border-luxe-gold"
                    placeholder="Last name"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-gray-800/50 border-gray-700 text-white focus:ring-luxe-gold focus:border-luxe-gold"
                  placeholder="Enter your email"
                  autoComplete="email"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="bg-gray-800/50 border-gray-700 text-white focus:ring-luxe-gold focus:border-luxe-gold"
                  placeholder="Create a password"
                  autoComplete="new-password"
                />
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                  Confirm Password
                </label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="bg-gray-800/50 border-gray-700 text-white focus:ring-luxe-gold focus:border-luxe-gold"
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                />
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="acceptTerms"
                  checked={formData.acceptTerms}
                  onCheckedChange={handleCheckboxChange}
                  className="border-gray-600 data-[state=checked]:bg-luxe-gold data-[state=checked]:border-luxe-gold mt-1"
                />
                <label htmlFor="acceptTerms" className="text-sm text-gray-300">
                  I agree to the{' '}
                  <Link to="/terms" className="text-luxe-gold hover:underline">
                    Terms & Conditions
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-luxe-gold hover:underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-luxe-gold hover:bg-luxe-gold/90 text-white"
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>
            
            <div className="relative flex justify-center items-center mt-8 mb-6">
              <Separator className="absolute w-full bg-gray-800" />
              <span className="bg-gray-900 px-2 z-10 text-gray-400 text-sm">Or sign up with</span>
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
              Already have an account?{' '}
              <Link to="/login" className="text-luxe-gold hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Register;
