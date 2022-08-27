import React from "react";
import { Link } from "react-router-dom";
import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components/index";

const LandingPage = () => {
  return (
    <Wrapper>
      <main>
        <Logo />
        <div className="container page">
          {/* info */}
          <div className="info">
            <h1>
              Applify <span> User Features</span> App
            </h1>

            <p>
              lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum
              dolor sit amet lorem ipsum dolor sit ametlorem ipsum dolor sit
              ametlorem ipsum dolor sit ametlorem ipsum dolor sit amet
            </p>

            <Link to="/Registration" className="btn btn-hero">
              Login/Register
            </Link>
          </div>

          <img src={main} alt="mainPhoto" className="img main-img"></img>
        </div>
      </main>
    </Wrapper>
  );
};

export default LandingPage;
