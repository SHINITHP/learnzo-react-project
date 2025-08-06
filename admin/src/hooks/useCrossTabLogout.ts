// hooks/useCrossTabLogout.ts
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

export const useCrossTabLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "logout_event") {
        dispatch(logout());
        navigate("/admin/sign-in");
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [dispatch, navigate]);
};
