import { Link, useNavigate } from "react-router-dom";
// import UptimerLogo from "../assets/uptimer-logo.png";
import VestigeLogo from "../assets/Vestige.png";
import { useUser, UserProfile as Profile } from "@descope/react-sdk";
import { CustomPopupMenu } from "./CustomPopupMenu";
import { User } from "lucide-react";
import { useCallback } from "react";
import { isSuperAdmin } from "@/lib/permissions";
import { useMutation } from "@tanstack/react-query";

import Client from "@/client";

export const DashboardNav = ({ client }: { client: Client }) => {
  const { user, isUserLoading } = useUser();
  //   const { logout } = useDescope();
  const navigate = useNavigate();

  const redirectAfterLogout = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const logout = useCallback(() => {
    console.log("Inside logout callback");
    redirectAfterLogout();
  }, []);

  const logoutMutation = useMutation(
    () => {
      return client.auth.Logout();
    },
    {
      onSuccess: () => {
        navigate("/");
      },
      onError: () => {
        navigate("/");
      },
    }
  );

  return (
    <>
      {!isUserLoading && (
        <div className="nav flex justify-between">
          {/* <Link to="/dashboard">
            <h1 className="w-full text-3xl sm:text-3xl font-bold text-[#00df9a]">
              <img src={VestigeLogo} alt="vestige logo" className=" h-14" />
            </h1>
          </Link> */}

          <div className="flex items-center gap-4">
            {/* {isSuperAdmin(user.userTenants) && ( */}
            {/* <>
              <Link to="/dashboard/logs" className="">
                Logs
              </Link>
              <Link to="/dashboard/users" className="">
                Manage Users
              </Link>
              <Link to="/dashboard/audit" className="">
                Audit Trail
              </Link>
            </> */}
            {/* )} */}
            <CustomPopupMenu
              TriggerIcon={User}
              children={
                <Profile
                  widgetId="user-profile-widget"
                  onLogout={() => logoutMutation.mutate()}
                />
              }
            />

            {/* <UserProfile onLogout={logout} user={user} /> */}
          </div>
        </div>
      )}
    </>
  );
};
