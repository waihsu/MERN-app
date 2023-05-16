import { Button, Typography, Box, TextField } from "@mui/material";

import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });

  const { login, error } = useLogin();

  const signin = async () => {
    await login(user);

    // const resp = await fetch("http://localhost:4000/api/user/login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(user),
    // });
    // const token = await resp.json();
    // // console.log(token);
    // if (resp.ok) {
    //   const accessToken = token.token;
    //   //   console.log(accessToken);
    //   localStorage.setItem("accessToken", accessToken);
    // }
  };

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
        Login
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
        <Button variant="contained" onClick={signin}>
          Log in
        </Button>
        <Box>
          {error && (
            <Typography sx={{ textAlign: "center", color: "red" }} variant="h6">
              {error}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
