import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { setUserData } = useAuthContext();

  const logout = () => {
    //remove user from storage
    localStorage.removeItem("user");

    setUserData({ user: null });
  };
  return { logout };
};
