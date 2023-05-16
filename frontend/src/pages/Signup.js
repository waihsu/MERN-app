import { Button, Typography, Box, TextField } from "@mui/material";

import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(null);

  const { signup, success, error } = useSignup();

  const handleClick = async () => {
    await signup(user);
  };

  // const signup = async (evt) => {
  //   evt.preventDefault();
  //   const resp = await fetch("http://localhost:4000/api/user/signup", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(user),
  //   });
  //   const token = await resp.json();
  //   // console.log(token.error);

  //   if (!resp.ok) {
  //     setError(token.error);
  //     console.log(error);
  //   }

  //   if (resp.ok) {
  //     const accessToken = token;
  //     console.log(accessToken);
  //     localStorage.setItem("accessToken", accessToken);
  //   }
  // };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: 400,
        mx: "auto",
        mt: 6,
      }}>
      <Typography variant="h3" sx={{ textAlign: "center" }}>
        Sign up
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", mt: 4, gap: 2 }}>
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          value={user.email}
          onChange={(evt) => {
            setUser({ ...user, email: evt.target.value });
          }}
        />
        <TextField
          id="outlined-basic"
          label="Password"
          type="password"
          variant="outlined"
          value={user.password}
          onChange={(evt) => {
            setUser({ ...user, password: evt.target.value });
          }}
        />
        <Button variant="contained" onClick={handleClick}>
          Sign up
        </Button>
        <Box>
          {error && (
            <Typography sx={{ textAlign: "center", color: "red" }} variant="h6">
              {error}
            </Typography>
          )}
        </Box>
        <Box>
          {success && (
            <Typography
              sx={{ textAlign: "center", color: "green" }}
              variant="h6">
              {success}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Signup;
