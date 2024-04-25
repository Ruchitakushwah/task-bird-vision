import React from "react";
import { useSelector } from "react-redux";
import { Container } from "@mui/material";
import LoginForm from "./components/UserLoginForm";
import PeopleList from "./components/ListPeoples";
const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Container>
      {!isAuthenticated && <LoginForm />}
      {isAuthenticated && <PeopleList />}
    </Container>
  );
};

export default App;
