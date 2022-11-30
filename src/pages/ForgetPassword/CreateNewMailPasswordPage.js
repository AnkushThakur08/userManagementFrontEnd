import React, { useState } from "react";

// React-Router

import { useNavigate, useParams } from "react-router-dom";

// Toast
import { toast } from "react-toastify";

// Components
import { Logo, FormRow } from "../../components";
import ForgetPassword from "../../assets/images/forget2.svg";

// CSS
import Wrapper from "../../assets/wrappers/RegisterPage";

// API
import { API } from "../../backend";
import { SaveNewPassword } from "../../helper/ApiCall";

const initialState = {
  email: "",
  password: "",
  success: false,
  error: "",
};

const CreateNewMailPasswordPage = () => {
  // Params
  const params = useParams();
  const id = params.id;

  //   Navigate
  const navigate = useNavigate();

  const [values, setValues] = useState(initialState);

  const { /* email, */ password } = values;

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

    if (/* !email || */ !password) {
      console.log("Please Enter your Password");
      return toast.error("Please Enter your Password");
    }
    setValues({ ...values, error: false });

    SaveNewPassword({ /* email, */ id, password })
      .then((data) => {
        console.log(data);
        if (data.data.status == 400) {
          toast.error(data.data.message);
          setValues({ ...values, error: data.data.message, success: false });
        } else if (data.data.status == 200) {
          setValues({
            ...values,
            success: true,
          });
          toast.success(data.data.message);

          setTimeout(() => {
            navigate("/Login");
          }, 3000);

          console.log("Ankush");
        }
      })
      .catch((error) => {
        toast.error("Unable to update the password");
        console.log("Unable to update the password");
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

          {/* Email Field */}
          {/* <FormRow
            type="email"
            name="email"
            values={values.email}
            handleChange={handleChange}
          /> */}

          {/* Password Field */}
          <FormRow
            type="password"
            name="password"
            values={values.password}
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

export default CreateNewMailPasswordPage;
