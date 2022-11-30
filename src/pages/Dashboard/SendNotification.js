import React, { useState, useEffect } from "react";

// Toast
import { toast } from "react-toastify";

// Components
import { FormRow } from "../../components";
import friend from "../../assets/images/friend.svg";

// CSS
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import Wrapper1 from "../../assets/wrappers/showFriend";

// API
import { API } from "../../backend";
import {
  countAllUser,
  SendInviteFriendMail,
  isAuthenticated,
} from "../../helper/ApiCall";

//TODO: One Signal
import OneSignal from "react-onesignal";

const { data } = isAuthenticated();
// console.log(data.user.name);
// console.log(data.user.email);

const initialState = {
  email: "",
  name: "",
  // senderName: `${data.user.name}`,
  // senderid: `${data.user.email}`,
  success: false,
  error: "",
};
const SendNotificationPage = () => {
  // TODO: OneSignal
  useEffect(() => {
    OneSignal.init({ appId: "1e4998de-a9b4-4284-8997-69c036c5c775" });
  }, []);

  const onHandleTag = (tag) => {
    console.log("Tagging");
    OneSignal.sendTag("User", tag).then(() => {});
  };

  // const [user, setUser] = useState([]);
  const [values, setValues] = useState(initialState);

  console.log(values.senderName);
  console.log(values.senderid);
  console.log(values);

  const { email, name, senderName, senderid } = values;

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

    if (!email || !name) {
      console.log("Please Fill out all the Fields");
      toast.error("Please Fill out all the Fields");
    }

    SendInviteFriendMail({ name, email })
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
            // navigate("/resetPassword");
          }, 3000);

          console.log("Ankush");
        }
      })
      .catch((error) => {
        toast.error("Unable to Send the Mail");
        console.log("Unable to Send the Mail");
      });
  };

  // const preload = () => {
  //   countAllUser().then((data) => {
  //     console.log(data);
  //     if (data.data.status == 400) {
  //       toast.error(data.data.message);
  //       setUser(data.data.message);
  //     } else {
  //       console.log(data.data.user.rows);
  //       console.log(data.data.user.rows[0].authenticationMethod);
  //       setUser(data.data.user.rows);
  //     }
  //   });
  // };

  // useEffect(() => {
  //   preload();
  // }, []);

  return (
    // <Wrapper className="full-page">
    //   <div>
    //     <img className="notification" src={friend} alt="Not Found" />
    //     <h1>Your Friends Will be Avaibable Shortly</h1>
    //     <p className="para">Friends are coming</p>
    //     <Link to="/"> Back to Home</Link>
    //   </div>
    // </Wrapper>

    // WITH API
    <Wrapper>
      <div>
        <h1>Friend Page</h1>
        {/* {user.map((cate, index) => ( */}
        {/* <div key={index}> */}
        <Wrapper1>
          <form className="form">
            <div className="form-center">
              <FormRow
                type="text"
                name="name"
                // value={cate.name}
                value={values.name}
                handleChange={handleChange}
              />

              <FormRow
                type="text"
                name="email"
                // value={cate.email}
                value={values.email}
                handleChange={handleChange}
              />

              <br />

              <div>
                <button
                  type="submit"
                  className="btn btn-block "
                  onClick={onSubmit}
                >
                  Invite Friend
                </button>
              </div>

              <div>
                <button
                  type="submit"
                  className="btn btn-block "
                  onClick={onHandleTag("React")}
                >
                  React
                </button>
              </div>

              <div>
                <button
                  type="submit"
                  className="btn btn-block "
                  onClick={onHandleTag("JavaScript")}
                >
                  JavaScript
                </button>
              </div>
            </div>
          </form>
        </Wrapper1>
        <br /> <br />
      </div>
    </Wrapper>
  );
};

export default SendNotificationPage;
