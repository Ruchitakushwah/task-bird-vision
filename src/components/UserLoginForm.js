import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import { login } from "../reducer/authSlice";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const validUsername = process.env.REACT_APP_USERNAME;
    const validPassword = process.env.REACT_APP_PASSWORD;

    if (username === validUsername && password === validPassword) {
      dispatch(login());
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "200px",
      }}
    >
      <Card
        variant="outlined"
        sx={{ width: 500, boxShadow: 3, margin: "auto" }}
      >
        <CardContent>
          <Typography variant="h5" component="h2" sx={{ textAlign: "center" }}>
            Login
          </Typography>
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button
            onClick={handleLogin}
            variant="contained"
            color="primary"
            fullWidth
          >
            Login
          </Button>
          {error && (
            <Typography variant="body2" color="error" sx={{ marginTop: 1 }}>
              {error}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginForm;
