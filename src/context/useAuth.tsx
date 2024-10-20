import { Hanko, User, register } from "@teamhanko/hanko-elements";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const hankoApi = import.meta.env.VITE_HANKO_API_URL!;
const h = new Hanko(hankoApi);

type AuthState = {
  hanko: Hanko;
  setHanko(hanko: Hanko): void;
};

const AuthContext = createContext<AuthState>({
  hanko: h,
  setHanko: () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("Please use CommandPalleteContext in parent component");
  return context;
};

export const AuthProvider = (props: PropsWithChildren) => {
  const [hanko, setHanko] = useState<Hanko>(h);

  useEffect(() => {
    register(hankoApi).catch((error) => {
      // Handle Handle registeration error
      console.log("Hanko API registration Error", error);
    });
  }, []);

  //   const hanko = useMemo(() => new Hanko(hankoApi), []);

  return (
    <AuthContext.Provider value={{ hanko, setHanko }}>
      {props.children}
    </AuthContext.Provider>
  );
};

// export default useAuth;
