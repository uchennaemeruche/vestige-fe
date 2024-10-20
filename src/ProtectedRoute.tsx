import { useSession } from "@descope/react-sdk";
import { Navigate } from "react-router-dom";
import { PageLoader } from "./components/Loader";

interface ProtectedRouteProps {
  children: JSX.Element;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isSessionLoading } = useSession();

  // Show a loading screen while session is loading
  if (isSessionLoading) {
    return <PageLoader />;
  }

  // If the user is not authenticated, redirect to the home page (or login)

  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  // If the user is authenticated, render the children components (DashboardLayout)
  return children;
};
