import React, { useState } from "react";

// React-Router

import { useNavigate, Link } from "react-router-dom";

// Toast
import { toast } from "react-toastify";

// Components
import { Logo, FormRow } from "../../components";
import ForgetPassword from "../../assets/images/forget2.svg";

// CSS
import Wrapper from "../../assets/wrappers/RegisterPage";

// API
import { API } from "../../backend";
import { SaveNewPhonePassword } from "../../helper/ApiCall";

const initialState = {
  phoneNumber: "",
  OTP: "",
  password: "",
  success: false,
  error: "",
};

const CreateNewPhonePasswordPage = () => {
  //   Navigate
  const navigate = useNavigate();

  const [values, setValues] = useState(initialState);

  const { phoneNumber, OTP, password } = values;

  console.log(`${API}`);

  const handleChange = (e) => {
    console.log(e.target);
    const name = e.target.name;
    const value = e.target.value;
    console.log(`${name}: ${value}`);

    setValues({ ...values, error: false, [name]: value });
  };

  const onSubmit = (e) => {
    console.log("SUCCESS");
    e.preventDefault();
    console.log(e.target);

    const { phoneNumber, OTP, password } = values;

    if (!OTP || !phoneNumber || !password) {
      console.log("Please fill out all the fields");
      return toast.error("Please fill out all the fields");
    }
    setValues({ ...values, error: false });

    SaveNewPhonePassword({ phoneNumber, OTP, password })
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
            success: true,
          });
          console.log("THIS IS DATA", data);
          toast.success(data.data.message);
          console.log("Ankush");

          setTimeout(() => {
            navigate("/LoginNumber");
          }, 3000);
        }
      })
      .catch((error) => {
        toast.error("Unable to Verify the OTP");
        console.log("Unable to Verify the OTP");
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
              className="img-fluid smallVerifyImage"
              src={ForgetPassword}
              alt=""
            />
          </h3>

          {/* Phone Number */}
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

          {/* OTP */}
          <FormRow
            type="text"
            name="OTP"
            values={values.OTP}
            handleChange={handleChange}
          />
          <button type="submit" className="btn btn-block" onClick={onSubmit}>
            Reset Password
          </button>
        </form>
      </Wrapper>
    </div>
  );
};

export default CreateNewPhonePasswordPage;
