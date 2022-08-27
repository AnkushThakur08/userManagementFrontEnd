import React, { useState } from "react";

// Toast
import { toast } from "react-toastify";

// Components
import { FormRow } from "../../components";

// CSS
import Wrapper from "../../assets/wrappers/DashboardFormPage";

// API
import {
  updateUser,
  authenticate,
  isAuthenticated,
} from "../../helper/ApiCall";

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    gender: "",
    age: "",
    address: "",
    error: "",
    success: false,
  });

  const handleChange = (e) => {
    console.log(e.target);
    const name = e.target.name;
    const value = e.target.value;
    console.log(`${name}: ${value}`);
    setUserData({ ...userData, error: false, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { gender, age, address } = userData;

    if (!gender || !age || !address) {
      console.log("Please Fill out all the Fields");
      toast.error("Please Fill out all the Fields");
    }
    let user = isAuthenticated().data;
    let userId = user.user.id;

    updateUser(user.token, { userId, gender, age, address })
      .then((data) => {
        console.log(data);
        if (data.data.status == 400) {
          toast.error(data.data.message);
          setUserData({
            ...userData,
            error: data.data.message,
            success: false,
          });
        } else if (data.data.status == 200) {
          userData({
            ...userData,
            success: true,
          });
          toast.success(data.data.message);
        }
      })
      .catch((error) => {
        toast.error("Unable to Process your Request");
        console.log("Unable to Prcoess your Request");
      });
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3> Profile</h3>
        <div className="form-center">
          <FormRow
            type="text"
            name="gender"
            value={userData.gender}
            handleChange={handleChange}
          />

          <FormRow
            type="text"
            name="age"
            value={userData.age}
            handleChange={handleChange}
          />

          <FormRow
            type="text"
            name="address"
            value={userData.address}
            handleChange={handleChange}
          />

          <button type="submit" className="btn btn-block changes">
            Save Changes
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default ProfilePage;
