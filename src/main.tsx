import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import { AuthProvider } from "@descope/react-sdk";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { DashboardLayout } from "./DashboardLayout";
import { Home } from "./Home";
import { ErrorPage } from "./error-page";
import { Dashboard } from "./Dashboard";
import { ServiceHistory } from "./ServiceHistory";
import { UserList } from "./UserList";
import { AuditTrail } from "./AuditTrail";
import { ProtectedRoute } from "./ProtectedRoute";
import { AuthenticationPage } from "./Authentication";
import { AuthorizedRoute } from "./AuthorizedRoute";
import { PageLoader } from "./components/Loader";

import { Analytics } from "@vercel/analytics/react";
import { AuditTrailState } from "./AuditTrailState";

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        onError(err: any) {
          if (err?.status === 401) {
            console.log("STATUS IS 401");
            // Redirect to login on unauthorized errors
            // window.location.href = "/auth";
            // Navigate({ to: "/auth" });
          }
        },
      },
      mutations: {
        onError(err: any) {
          if (err?.status === 401) {
            // Redirect to login on unauthorized errors
            // window.location.href = "/auth";
            // Navigate({ to: "/auth" });
          }
        },
      },
    },

    queryCache: new QueryCache({
      onError(error: any, query) {
        if (error?.status === 401) {
          // Redirect to login on unauthorized errors
          // window.location.href = "/auth";
          // Navigate({ to: "/auth" });
        }
      },
    }),
    mutationCache: new MutationCache({
      onError(error: any) {
        if (error?.status === 401) {
          console.log("CACHE MUTATION STATUS IS 401");
          // Redirect to login on unauthorized errors
          // window.location.href = "/auth";
          // Navigate({ to: "/auth" });
        }
      },
    }),
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/auth",
      element: <AuthenticationPage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/dashboard/",
          element: <Dashboard />,
        },
        {
          path: "/dashboard/history",
          element: <ServiceHistory />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/dashboard/users",
          element: (
            <AuthorizedRoute>
              <UserList />
            </AuthorizedRoute>
          ),
          errorElement: <ErrorPage />,
        },
        {
          path: "/dashboard/audit",
          element: (
            // <AuthorizedRoute>
            <AuditTrail />
            // </AuthorizedRoute>
          ),
          errorElement: <ErrorPage />,
        },
        {
          path: "/dashboard/logs",
          element: <AuditTrailState />,
          errorElement: <ErrorPage />,
        },
      ],
    },

    {
      path: "*",
      element: <Home />,
      errorElement: <ErrorPage />,
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider projectId={import.meta.env.VITE_DESCOPE_PROJECT_ID!}>
        <Suspense fallback={<PageLoader />}>
          <RouterProvider router={router}></RouterProvider>
        </Suspense>
      </AuthProvider>
    </QueryClientProvider>
  );
};

const AppWrapper = () => {
  return (
    <React.StrictMode>
      <Analytics />
      <App />
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <AppWrapper />
);

// ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
//   <React.StrictMode>
//     <QueryClientProvider client={queryClient}>
//       <AuthProvider projectId={import.meta.env.VITE_DESCOPE_PROJECT_ID!}>
//         <Suspense fallback={<PageLoader />}>
//           <RouterProvider router={router}></RouterProvider>
//         </Suspense>
//       </AuthProvider>
//     </QueryClientProvider>
//   </React.StrictMode>
// );
