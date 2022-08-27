import React, { useState } from "react";

// React-Router
import { Link, useNavigate } from "react-router-dom";

// Toast
import { toast } from "react-toastify";

// Components
import { Logo, FormRow } from "../components";
import ForgetPassword from "../assets/images/forgetPassword.svg";

// CSS
import Wrapper from "../assets/wrappers/RegisterPage";

// API
import { API } from "../backend";
import { loginOTP } from "../helper/ApiCall";

const initialState = {
  phoneNumber: "",
  success: false,
  error: "",
};

const ForgetPhonePasswordPage = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState(initialState);

  const { phoneNumber } = values;

  console.log(`${API}`);

  const handleChange = (e) => {
    console.log(e.target);
    const name = e.target.name;
    const value = e.target.value;
    console.log(`${name}: ${value}`);

    setValues({ ...values, error: false, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
  };

  // When user Enter Email & Password
  const SendOTP = (e) => {
    console.log("SUCCESS");
    e.preventDefault();
    console.log(e.target);

    const { phoneNumber } = values;
    console.log(phoneNumber);

    if (!phoneNumber) {
      console.log("Please Enter the Phone Number");
      return toast.error("Please Enter the Phone Number");
    }
    setValues({ ...values, error: false });

    loginOTP({ phoneNumber })
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
            phoneNumber: "",
            success: true,
            error: "false",
          });
          toast.success(data.data.message);

          console.log("Ankush");

          setTimeout(() => {
            navigate("/resetPhone");
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
            <h3>Forget Password</h3>
            <img
              className="img-fluid smallforgetPassword"
              src={ForgetPassword}
              alt=""
            />
          </h3>

          {/* Phone Number Field */}
          <FormRow
            type="text"
            name="phoneNumber"
            values={values.phoneNumber}
            handleChange={handleChange}
          />

          <button type="submit" className="btn btn-block" onClick={SendOTP}>
            Send OTP
          </button>
        </form>
      </Wrapper>
    </div>
  );
};

export default ForgetPhonePasswordPage;
