import { useSession, useUser } from "@descope/react-sdk";
import { Navigate } from "react-router-dom";
import { isSuperAdmin } from "./lib/permissions";
import { PageLoader } from "./components/Loader";

interface ProtectedRouteProps {
  children: JSX.Element;
}

export const AuthorizedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isSessionLoading } = useSession();
  const { user, isUserLoading } = useUser();

  // Show a loading screen while session is loading
  if (isSessionLoading || isUserLoading) {
    return <PageLoader />;
  }

  // If the user is not authenticated, redirect to the home page (or login)

  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  // Check if user has one of the allowed roles
  const userTenants = user?.userTenants || [];
  if (!isSuperAdmin(userTenants)) {
    return <Navigate to="/dashboard/" />;
  }

  // If user is authenticated and authorized, render the children
  return children;
};
