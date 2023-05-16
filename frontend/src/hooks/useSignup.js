import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);

  const signup = async (user) => {
    setError(null);

    const resp = await fetch("http://localhost:4000/api/user/signup", {
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
      setError(userData.error);
    }

    if (resp.ok) {
      // const accessToken = data.token;
      //   console.log(accessToken);

      setSuccess("Created Account Successful");
    }
  };

  return { signup, success, error };
};
