import React from "react";

// React Router
import { Link } from "react-router-dom";

// Components
import notFoundImage from "../../assets/images/notification.svg";

// CSS
import Wrapper from "../../assets/wrappers/ErrorPage";

const NotificationPage = () => {
  return (
    <Wrapper className="full-page">
      <div>
        <img className="notification" src={notFoundImage} alt="Not Found" />
        <h1>No Notification Found</h1>
        <p className="para">Presently There is no Notification</p>
        <Link to="/"> Back to Home</Link>
      </div>
    </Wrapper>
  );
};

export default NotificationPage;
