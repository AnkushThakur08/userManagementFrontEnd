import React from "react";
import { Link } from "react-router-dom";
import notFoundImage from "../assets/images/not-found.svg";
import Wrapper from "../assets/wrappers/ErrorPage";

const ErrorPage = () => {
  return (
    <Wrapper className="full-page">
      <div>
        <img src={notFoundImage} alt="Not Found" />
        <h2>Ohh!!! Page Not Found</h2>
        <p>We can't seem to find the page you're looking for</p>
        <Link to="/"> Back to Home</Link>
      </div>
    </Wrapper>
  );
};

export default ErrorPage;
