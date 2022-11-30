import React from "react";

// CSS
import "./user.css";
// import Wrapper from "../../../assets/wrappers/DashboardFormPage";

const User = ({ user, selectUser }) => {
  return (
    // <Wrapper>
    <div className="user_wrapper" onClick={() => selectUser(user)}>
      <div className="user_info">
        <div className="user_deatil">
          <h4>{user.name}</h4>
        </div>
        <div
          className={`user_status ${user.isOnline ? "online" : "offline"}`}
        ></div>
      </div>
    </div>
    // </Wrapper>
  );
};

export default User;
