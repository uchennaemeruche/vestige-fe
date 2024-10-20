import { Descope, getSessionToken, useSession } from "@descope/react-sdk";
import Client, { Environment, Local } from "./client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import UptimerLogo from "./assets/uptimer-logo.png";
import { useEffect } from "react";

export const AuthenticationPage = () => {
  const { isAuthenticated, isSessionLoading } = useSession();
  const sessionToken = getSessionToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && !isSessionLoading) {
      // navigate("/dashboard");
    }
  }, [isAuthenticated, isSessionLoading]);

  // if (isAuthenticated && !isSessionLoading) {
  //   navigate("/dashboard");
  // }
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

  const createUser = useMutation(
    async ({
      name,
      email,
      user_id,
      oauth,
      status,
    }: {
      name: string;
      email: string;
      user_id: string;
      status: string;
      oauth: string;
    }) => {
      await client.user.CreateUser({
        name,
        email,
        user_id,
        oauth,
        status,
      });
    },
    {
      onSuccess: (d) => {
        console.log("Succesful registration", d);
        // queryClient.invalidateQueries(["sites"]);
        // queryClient.invalidateQueries(["status"]);
        navigate("/dashboard");
      },
      onError: (err) => {
        console.log("Error occured here", err);
        navigate("/auth");
      },
    }
  );

  return (
    <section className="flex flex-col items-center mt-10">
      <Link to={"/"}>
        <img src={UptimerLogo} alt="" className=" h-24" />
      </Link>
      <Descope
        flowId="sign-up-or-in"
        onSuccess={async (e) => {
          console.log("Workflow completed", e);

          if (e && e.detail.user) {
            console.log("Sending user request");
            // const user = await client.user.getUser(e.detail.user.userId);
            // console.log({ user });
            // if (!user) {
            //   console.log("User Not found");

            createUser.mutate({
              email: e.detail.user.email!,
              name: e.detail.user.name!,
              oauth: e.detail.user.OAuth!.toString(),
              status: e.detail.user.status,
              user_id: e.detail.user.userId,
            });

            // console.log({ user });
          }
          // navigate("/dashboard");

          // if (e && e.detail && e.detail.firstSeen && e.detail.user) {
          //   createUser.mutate({
          //     email: e.detail.user.email!,
          //     name: e.detail.user.name!,
          //     oauth: e.detail.user.OAuth!.toString(),
          //     status: e.detail.user.status,
          //     user_id: e.detail.user.userId,
          //   });
          // }
          // navigate("/dashboard");
        }}
        onError={(e) => {}}
      ></Descope>
    </section>
  );
};
