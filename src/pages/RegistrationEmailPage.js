import React, { useState, useEffect } from "react";

// React-Router
import { Link, useNavigate } from "react-router-dom";

// Toast
import { toast } from "react-toastify";

// Components
import { Logo, FormRow } from "../components";

// Icons
import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";

// CSS
import Wrapper from "../assets/wrappers/RegisterPage";

// API
import { API } from "../backend";
import { signup } from "../helper/ApiCall";
import { registrationByGoogle } from "../helper/ApiCall";

const initialState = {
  name: "",
  email: "",
  password: "",
  success: false,
  error: "",
  didRedirect: false,
};

const RegistrationEmailPage = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState(initialState);

  const { name, email, password, didRedirect } = values;

  console.log(`${API}`);

  const handleChange = (e) => {
    console.log(e.target);
    const name = e.target.name;
    const value = e.target.value;
    console.log(`${name}: ${value}`);

    setValues({ ...values, error: false, [name]: value });
  };

  // When user Enter Email & Password
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);

    if (!email || !password || !name) {
      console.log("Please Fill out all the Fields");
      return toast.error("Please Fill out all the Fields");
    }
    setValues({ ...values, error: false });

    signup({ name, email, password })
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
            didRedirect: true,
          });
          toast.success(data.data.message);

          setTimeout(() => {
            navigate("/Login");
          }, 3000);

          console.log("Ankush");
        }
      })
      .catch((error) => {
        toast.error("Error in registration");
        console.log("Error in registration");
      });
  };

  // When User Registered with Google
  const RegistrationByGoogle = (e) => {
    e.preventDefault();
    console.log(e.target);

    setValues({ ...values, error: false });

    registrationByGoogle()
      .then((data) => {
        // toast.error(data.data.message);
        console.log(data);
        // console.log(data.data.message);
        if (data.data.status == 400) {
          toast.error(data.data.message);
          setValues({ ...values, error: data.data.message, success: false });
        } else if (data.data.status == 200) {
          setValues({
            error: "",
            success: true,
          });
          toast.success(data.data.message);
          console.log("Ankush");
        }
      })
      .catch((error) => {
        toast.error("Error in registration");
        console.log("Error in registration");
      });
  };

  return (
    <div>
      <Wrapper className="full-page">
        {/* {performRedirect()} */}
        <form className="form" onSubmit={onSubmit}>
          <Logo />
          <h3>Register With Email</h3>
          {/* Name Field */}
          <FormRow
            type="text"
            name="name"
            values={values.name}
            handleChange={handleChange}
          />
          {/* Email Field */}
          <FormRow
            type="email"
            name="email"
            values={values.email}
            handleChange={handleChange}
          />
          {/* Password Field */}
          <FormRow
            type="password"
            name="password"
            values={values.password}
            handleChange={handleChange}
          />
          <button type="submit" className="btn btn-block" onClick={onSubmit}>
            SignUp
          </button>
          <p>
            {values.isMember ? "Not a Member Yet?" : "Already a Member? "}

            <Link to="/Login" className="member-btn">
              Login
            </Link>

            <span>
              <Link to="/Phone" className="member-btn">
                Register with Phone Number
              </Link>
            </span>
          </p>

          <div className="socialButtonWrapper">
            <button
              type="submit"
              className="socialButton"
              onClick={RegistrationByGoogle}
            >
              <FcGoogle size={48} />
            </button>

            <button type="submit" className="socialButton" onClick={onSubmit}>
              <AiFillFacebook size={48} color="#3b82f6" />
            </button>
          </div>
        </form>
      </Wrapper>
    </div>
  );
};

export default RegistrationEmailPage;
