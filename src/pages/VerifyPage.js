import React, { useState } from "react";

// React-Router
import { Link, useNavigate } from "react-router-dom";

// Toast
import { toast } from "react-toastify";

// CSS
import Wrapper from "../assets/wrappers/RegisterPage";

// Components
import Verify from "../assets/images/verify.svg";
import { Logo, FormRow } from "../components";

// API
import { verifyOTP } from "../helper/ApiCall";

const VerifyPage = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    OTP: "",
    error: "",
    success: "false",
  });

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

    const { OTP } = values;

    if (!OTP) {
      console.log("Please Enter the OTP");
      return toast.error("Please Enter the OTP");
    }
    setValues({ ...values, error: false });

    verifyOTP({ OTP })
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
            OTP: "",
            success: true,
          });
          toast.success(data.data.message);
          console.log("Ankush");

          setTimeout(() => {
            navigate("/verifyLogin");
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
            <img className="img-fluid smallVerifyImage" src={Verify} alt="" />
          </h3>

          <FormRow
            type="text"
            name="OTP"
            values={values.OTP}
            handleChange={handleChange}
          />

          <button type="submit" className="btn btn-block" onClick={onSubmit}>
            Submit
          </button>

          <p>
            <span>
              <Link to="/home" className="member-btn centerinVerifyPage">
                Go Back to Home
              </Link>
            </span>
          </p>
        </form>
      </Wrapper>
    </div>
  );
};

export default VerifyPage;
