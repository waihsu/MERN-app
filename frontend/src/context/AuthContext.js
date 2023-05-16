import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [userData, setUserData] = useState({ email: null, token: null });
  console.log("AuthContext State:", userData);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    // console.log(user);

    if (user) {
      setUserData({ ...userData, email: user.email, token: user.token });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};
