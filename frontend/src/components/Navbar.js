import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const contextData = useContext(AuthContext);
  const { email } = contextData;
  const { logout } = useLogout();
  const handleClick = () => {
    logout();
  };
  // console.log(user);

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Workout Buddy</h1>
        </Link>
        {email && (
          <Box sx={{ display: "flex" }}>
            <Typography>{email}</Typography>
            <Button variant="contained" onClick={handleClick}>
              Log out
            </Button>
          </Box>
        )}
        {!email && (
          <div style={{ display: "flex", gap: 2 }}>
            <Link to="/signup">
              <Button variant="contained">Sign up</Button>
            </Link>
            <Link to="/login">
              <Button variant="contained">Log in</Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
