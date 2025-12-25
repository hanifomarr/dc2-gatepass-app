import { Navigate, Outlet, useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import type { RootState } from '@/app/store';

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { user } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard if role is not allowed
    if (user.role === 'resident') {
      return <Navigate to="/resident-dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
