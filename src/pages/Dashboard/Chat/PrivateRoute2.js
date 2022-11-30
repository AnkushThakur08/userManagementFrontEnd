import React, { useContext } from "react";
import { AuthContext } from "./ChatContext/auth";
import { useNavigate, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  return (
    <Route
      {...rest}
      render={(props) => (user ? <Component {...props} /> : navigate("/Chat2"))}
    />
  );
};

export default PrivateRoute;
