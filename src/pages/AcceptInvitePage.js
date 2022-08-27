import React, { useState } from "react";

// React-Router
import { useNavigate } from "react-router-dom";

// Toast
import { toast } from "react-toastify";

// Components
import { Logo, FormRow } from "../components";
import invite from "../assets/images/invite.svg";

// CSS
import Wrapper from "../assets/wrappers/RegisterPage";

// API
import { API } from "../backend";
import { AcceptInvite, RejectInvite } from "../helper/ApiCall";

const initialState = {
  email: "",
  senderEmail: "",
  success: false,
  error: "",
};

const AcceptInvitePage = () => {
  //   Navigate
  const navigate = useNavigate();

  const [values, setValues] = useState(initialState);

  const { email, senderEmail } = values;

  console.log(`${API}`);

  const handleChange = (e) => {
    console.log(e.target);
    const name = e.target.name;
    const value = e.target.value;
    console.log(`${name}: ${value}`);

    setValues({ ...values, error: false, [name]: value });
  };

  // When user Enter Email & Password
  const Accept = () => {
    if (!email || !senderEmail) {
      console.log("Please Enter All the Fields");
      return toast.error("Please Enter All the Fields");
    }
    setValues({ ...values, error: false });

    AcceptInvite({ email, senderEmail })
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
        toast.error("Unable to Process your Request");
        console.log("Unable to Prcoess your Request");
      });
  };

  const Reject = () => {
    console.log("REJECT");
    if (!email || !senderEmail) {
      console.log("Please Enter All the Fields");
      return toast.error("Please Enter All the Fields");
    }
    setValues({ ...values, error: false });

    RejectInvite({ email, senderEmail })
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
        toast.error("Unable to Process your Request");
        console.log("Unable to Prcoess your Request");
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
  };

  return (
    <div>
      <Wrapper className="full-page">
        <form className="form" onSubmit={onSubmit}>
          <Logo />
          <h3>
            <h3>Accept Invitation</h3>
            <img className="img-fluid smallVerifyImage" src={invite} alt="" />
          </h3>

          {/* Email Field */}
          <FormRow
            type="email"
            name="email"
            values={values.email}
            handleChange={handleChange}
          />

          {/* Password Field */}
          <FormRow
            type="text"
            name="senderEmail"
            values={values.senderEmail}
            handleChange={handleChange}
          />

          <button type="submit" className="btn btn-block" onClick={Accept}>
            Accept Invitation
          </button>

          <h4 className="Oroption">OR</h4>

          <button type="submit" className="btn btn-block" onClick={Reject}>
            Reject Invitation
          </button>
        </form>
      </Wrapper>
    </div>
  );
};

export default AcceptInvitePage;
