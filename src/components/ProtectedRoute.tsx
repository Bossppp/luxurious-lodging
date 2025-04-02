
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/lib/types';
import { toast } from '@/components/ui/use-toast';

type ProtectedRouteProps = {
  children: React.ReactNode;
  requiredRole?: UserRole;
};

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { isLoggedIn, currentUser } = useAuth();

  if (!isLoggedIn) {
    toast({
      title: "Authentication Required",
      description: "Please log in to access this page.",
      variant: "destructive"
    });
    return <Navigate to="/login" state={{ redirectTo: window.location.pathname }} />;
  }

  if (requiredRole && currentUser?.role !== requiredRole) {
    toast({
      title: "Access Denied",
      description: "You don't have permission to access this page.",
      variant: "destructive"
    });
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
