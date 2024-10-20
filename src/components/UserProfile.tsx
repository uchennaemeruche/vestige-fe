import { Popover, Transition } from "@headlessui/react";

import { User } from "lucide-react";
import { Fragment, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { UserProfile as Profile } from "@descope/react-sdk";

export interface UserProfileProps {
  user: any;
  onLogout: Function;
}
export const UserProfile = ({ user, onLogout }: UserProfileProps) => {
  const navigate = useNavigate();

  const redirectAfterLogout = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const logout = useCallback(() => {
    // await hanko?.user.logout();
    onLogout();
    redirectAfterLogout();
  }, [onLogout]);

  return (
    <div className="relative">
      <Popover className="relative w-full">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? "" : "text-opacity-90"}
                group inline-flex items-center rounded-full bg-orange-700 p-3 text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <User />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute left-16 z-10 mt-3 w-[400px] max-w-sm -translate-x-full transform px-4 sm:px-0 lg:max-w-3xl">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <Profile widgetId="user-profile-widget" />
                  {/* <div className="relative bg-white p-7 lg:grid-cols-2">
                   
                    <p>{user.name}</p>
                    <p>{user.email}</p>
                    <p>{user.id}</p>
                  </div> */}

                  {/* <button
                    className="flex w-full justify-center bg-red-100 p-4 transition duration-150 ease-in-out hover:bg-red-200"
                    onClick={logout}
                  >
                    <span>Logout</span>
                  </button> */}
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};
