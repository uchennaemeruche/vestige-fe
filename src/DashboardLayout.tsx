import Client, { Environment, Local } from "./client";

import { Navigate, Outlet, useOutletContext } from "react-router-dom";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "./components/ui/toaster";

import { getSessionToken } from "@descope/react-sdk";
import { DashboardNav } from "./components/DashboardNav";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";
import { CustomSidebarTrigger } from "./components/CustomSidebarTrigger";

type ContextType = { client: Client };

export const useClient = () => {
  return useOutletContext<ContextType>();
};

export const DashboardLayout = () => {
  const sessionToken = getSessionToken();

  if (!sessionToken) return <Navigate to="/auth" />;

  const client = new Client(
    import.meta.env.DEV ? Local : Environment("staging"),
    {
      requestInit: {
        // credentials: "include",
        headers: {
          Accept: "application/json",
          Authorization: sessionToken,
        },
      },
    }
  );

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarProvider>
        <AppSidebar />

        <main className="bg-slate-100 w-[80%] flex-auto h-screen overflow-y-auto">
          <div className="container max-w-[1240px] w-full mx-auto px-4 py-10 ">
            <div className="flex items-center justify-between">
              {/* <SidebarTrigger /> */}
              <CustomSidebarTrigger />
              <DashboardNav client={client} />
            </div>

            <section className="pt-8 pb-16 my-10">
              <Outlet context={{ client } satisfies ContextType} />
            </section>
          </div>
        </main>
      </SidebarProvider>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <Toaster />
    </div>
  );
};
