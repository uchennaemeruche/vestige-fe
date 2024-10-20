import { useAuth } from "@/context/useAuth";
import { Hanko, register } from "@teamhanko/hanko-elements";
import { useCallback, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const hankoApi = import.meta.env.VITE_HANKO_API_URL!;

export const HankoAuth = () => {
  const navigate = useNavigate();
  // const hanko = useMemo(() => new Hanko(hankoApi), []);
  const { hanko, setHanko } = useAuth();

  const redirectAfterLogin = useCallback(() => {
    navigate("/dashboard");
  }, [navigate]);

  useEffect(
    () =>
      hanko.onAuthFlowCompleted((details) => {
        console.log("Auth Details", details);
        console.log("Current User", hanko.user.getCurrent());
        redirectAfterLogin();
      }),
    [hanko, redirectAfterLogin]
  );

  // useEffect(() => {
  //   register(hankoApi).catch((error) => {
  //     // Handle Handle registeration error
  //     console.log("Hanko API registration Error", error);
  //   });
  // }, []);

  return <hanko-auth />;
};
