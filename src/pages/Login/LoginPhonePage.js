import React, { useState, useEffect } from "react";

// React-Router
import { Link, useNavigate } from "react-router-dom";

// Toast
import { toast } from "react-toastify";

// Components
import { Logo, FormRow } from "../../components";

// CSS
import Wrapper from "../../assets/wrappers/RegisterPage";

// API
import { API } from "../../backend";
import { signIn, authenticate } from "../../helper/ApiCall";
import { loginOTP } from "../../helper/ApiCall";

const initialState = {
  phoneNumber: "",
  password: "",
  success: false,
  error: "",
};

const LoginPhonePage = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);

  console.log(`${API}`);

  const handleChange = (e) => {
    console.log(e.target);
    const name = e.target.name;
    const value = e.target.value;
    console.log(`${name}: ${value}`);

    setValues({ ...values, error: false, [name]: value });
  };

  // When user Enter Phone Number and Password
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);

    const { phoneNumber, password } = values;

    if (!phoneNumber || !password) {
      console.log("Please Fill out all the Fields");
      return toast.error("Please Fill out all the Fields");
    }
    setValues({ ...values, error: false });
    console.log(values);

    signIn({ phoneNumber, password })
      .then((data) => {
        console.log(data);
        if (data.data.status == 400) {
          toast.error(data.data.message);
          setValues({ ...values, error: data.data.message, success: false });
        } else if (data.data.status == 200) {
          // REAL
          authenticate(data, () => {
            setValues({
              ...values,
              success: true,
              isMember: false,
            });
            console.log("THIS IS DATA", data);
            toast.success(data.data.message);
            console.log("Ankush");

            setTimeout(() => {
              navigate("/");
            }, 3000);
          });
        }
      })
      .catch((error) => {
        toast.error("Login Request Failed");
        console.log("Login Request Failed");
      });
  };

  // When user Requests for OTP
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
            navigate("/verifyLogin");
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
          <h3> Login With Phone Number</h3>

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

          <span>
            <Link to="/forgetPhone" className="member-btn forgetPassword">
              Forget Password?
            </Link>
          </span>

          <button type="submit" className="btn btn-block" onClick={onSubmit}>
            Login
          </button>
          <p>
            Not a Member Yet? {""}
            <Link to="/Phone" className="member-btn">
              Register
            </Link>
            <span>
              <Link to="/Login" className="member-btn">
                Login with Email
              </Link>
            </span>
          </p>

          <h3>OR</h3>

          <Link
            to="/verifyLogin"
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

export default LoginPhonePage;
