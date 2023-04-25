import React, { useState, useEffect } from "react";

// React-Router
import { Link, useNavigate } from "react-router-dom";

// Toast
import { toast } from "react-toastify";

// Components
import { Logo, FormRow } from "../../../components";

// CSS
import Wrapper from "../../../assets/wrappers/RegisterPage";

// Firebase
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../Config/firebase2";
import { setDoc, doc, Timestamp } from "firebase/firestore";

const initialState = {
  name: "",
  email: "",
  password: "",
  success: false,
  error: "",
  loading: false,
};

const FirebaseRegister = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState(initialState);

  const { name, email, password, success, loading, error } = values;

  const handleChange = (e) => {
    console.log(e.target);
    const name = e.target.name;
    const value = e.target.value;
    console.log(`${name}: ${value}`);

    setValues({ ...values, error: false, [name]: value });
  };

  // When user Enter Email & Password
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target);

    if (!email || !password || !name) {
      console.log("Please Fill out all the Fields");
      return toast.error("Please Fill out all the Fields");
    }
    setValues({ ...values, error: false });

    try {
      // Creating User
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(result.user);

      if (result.user) {
        console.log("HERE!!!")
        toast.success("User Registered Successfully");
      } else {
        console.log("HsdfsdERE!!!")

        toast.error("User Registered Failed");
      }
      navigate("/firebaseLogin");

      // Setting user in Firebase Store/Chatting DB
      await setDoc(doc(db, "users", result.user.uid), {
        uid: result.user.uid,
        name,
        email,
        createdAt: Timestamp.fromDate(new Date()),
        
        isOnline: true,
      });

      

      // resetting the state
      setValues({
        name: "",
        email: "",
        password: "",
        error: "",
        loading: "",
      });
    } catch (error) {
      setValues({ ...values, error: error.message, loading: false });
    }
  };

  return (
    <div>
      <Wrapper className="full-page">
        <form className="form" onSubmit={onSubmit}>
          <Logo />
          <h3>Chat Registration </h3>
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

            <Link to="/firebaseLogin" className="member-btn">
              Login
            </Link>
          </p>
        </form>
      </Wrapper>
    </div>
  );
};

export default FirebaseRegister;
