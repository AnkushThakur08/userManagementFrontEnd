import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Protected = (props) => {
  const navigate = useNavigate();
  const Cmp = props.Cmp;
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("OnetoOneChat");
    } else {
      navigate("chat2");
    }
  }, []);
  return (
    <div>
      <Cmp />
    </div>
  );
};

export default Protected;
