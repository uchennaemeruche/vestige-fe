import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useCustomAuthError = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/auth");
  }, [navigate]);
};
