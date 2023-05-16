import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const contextData = useContext(AuthContext);
  const { setUserData } = contextData;
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(null);
  const nevigate = useNavigate();

  const login = async (user) => {
    setLoading(true);
    setError(null);

    const resp = await fetch("http://localhost:4000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    // JsonWeb Token
    const userData = await resp.json();
    // console.log(data.error);

    if (!resp.ok) {
      setLoading(false);
      setError(userData.error);
    }

    if (resp.ok) {
      // const accessToken = data.token;
      //   console.log(accessToken);
      localStorage.setItem("user", JSON.stringify(userData));

      //update the auth context
      const email = userData.email;
      setUserData({ ...userData, user: email });
      nevigate("/");

      setLoading(false);
    }
  };

  return { login, loading, error };
};
