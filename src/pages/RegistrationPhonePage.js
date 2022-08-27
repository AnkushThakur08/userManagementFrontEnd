import React, { useState, useEffect } from "react";

// React-Router
import { Link, useNavigate } from "react-router-dom";

// Toast
import { toast } from "react-toastify";

// Components
import { Logo, FormRow } from "../components";

// CSS
import Wrapper from "../assets/wrappers/RegisterPage";

// API
import { signup } from "../helper/ApiCall";
import { registrationOTP } from "../helper/ApiCall";
import { API } from "../backend";

const initialState = {
  name: "",
  phoneNumber: "",
  password: "",
  isMember: false /* User is not Registered  */,
  success: false,
  error: "",
};

const RegistrationPhonePage = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState(initialState);

  console.log(`${API}`);

  const handleChange = (e) => {
    console.log(e.target);
    const name = e.target.name;
    const value = e.target.value;
    console.log(`${name}: ${value}`);

    setValues({ ...values, [name]: value });
  };

  // When User entered PhoneNumber & Passoword
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);

    const { name, phoneNumber, password, isMember } = values;
    console.log(phoneNumber);
    console.log(name);
    console.log(password);

    if (!phoneNumber || !password || !name) {
      console.log("Please Fill out all the Fields");
      return toast.error("Please Fill out all the Fields");
    }
    setValues({ ...values, error: false });

    signup({ name, phoneNumber, password })
      .then((data) => {
        // toast.error(data.data.message);
        console.log(data);
        // console.log(data.data.message);
        if (data.data.status == 400) {
          toast.error(data.data.message);
          setValues({ ...values, error: data.data.message, success: false });
        } else if (data.data.status == 200) {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
            isMember: false,
          });
          toast.success(data.data.message);

          setTimeout(() => {
            navigate("/LoginNumber");
          }, 3000);

          console.log("Ankush");
        }
      })
      .catch((error) => {
        toast.error("Error in registration");
        console.log("Error in registration");
      });
  };

  // When user Requests for OTP
  const SendOTP = (e) => {
    console.log("SUCCESS");
    e.preventDefault();
    console.log(e.target);

    const { name, phoneNumber } = values;
    console.log(phoneNumber);
    console.log(name);

    if (!phoneNumber || !name) {
      console.log("Please Enter Name And Phone Number");
      return toast.error("Please Enter Name And Phone Number");
    }
    setValues({ ...values, error: false });

    registrationOTP({ name, phoneNumber })
      .then((data) => {
        // toast.error(data.data.message);
        console.log(data);
        // console.log(data.data.message);
        if (data.data.status == 400) {
          toast.error(data.data.message);
          setValues({ ...values, error: data.data.message, success: false });
        } else if (data.data.status == 200) {
          setValues({
            ...values,
            name: "",
            phoneNumber: "",
            success: true,
          });
          toast.success(data.data.message);
          console.log("Ankush");

          setTimeout(() => {
            navigate("/verify");
          }, 3000);
        }
      })
      .catch((error) => {
        toast.error("Error in Sending the OTP");
        console.log("Error in Sending the OTP");
      });
  };

  return (
    <div>
      <Wrapper className="full-page">
        <form className="form" onSubmit={onSubmit}>
          <Logo />
          <h3>
            {values.isMember
              ? "Login with Phone Number"
              : "Register with Phone Number"}
          </h3>

          {/* Name Field */}
          {!values.isMember && (
            <FormRow
              type="text"
              name="name"
              values={values.name}
              handleChange={handleChange}
            />
          )}

          {/* Phone Number Field */}
          <FormRow
            type="text"
            name="phoneNumber"
            values={values.phoneNumber}
            handleChange={handleChange}
          />

          {/* Password Field */}
          <FormRow
            type="password"
            name="password"
            values={values.password}
            handleChange={handleChange}
          />

          <button type="submit" className="btn btn-block" onSubmit={onSubmit}>
            SignUp
          </button>

          <p>
            {values.isMember ? "Not a Member Yet?" : "Already a Member? "}

            {/* <button type="button" onClick={toggleMember} className="member-btn">
              {values.isMember ? "Register" : "Login"}
            </button> */}

            <Link to="/LoginNumber" className="member-btn">
              Login
            </Link>

            <span>
              <Link to="/Registration" className="member-btn">
                Register with Email
              </Link>
            </span>
          </p>

          <h3>OR</h3>

          <Link
            to="/verify"
            className="btn btn-hero btn-block"
            onClick={SendOTP}
          >
            Request For OTP
          </Link>
        </form>
      </Wrapper>
    </div>
  );
};

export default RegistrationPhonePage;
