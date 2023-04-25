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
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../Config/firebase2";
import { updateDoc, doc } from "firebase/firestore";

const initialState = {
  email: "",
  password: "",
  success: false,
  error: "",
};

const FirebaseLogin = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState(initialState);

  const { email, password, error, success } = values;

  const handleChange = (e) => {
    console.log(e.target);
    const name = e.target.name;
    const value = e.target.value;
    console.log(`${name}: ${value}`);

    setValues({ ...values, error: false, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target);

    if (!email || !password) {
      console.log("Please Fill out all the Fields");
      return toast.error("Please Fill out all the Fields");
    }
    setValues({ ...values, error: false });

    try {
      // Logging the user
      const result = await signInWithEmailAndPassword(auth, email, password);

      localStorage.setItem("user", JSON.stringify(result.user));

        // Setting user in Firebase Store/Chatting DB
        await updateDoc(doc(db, "users", result.user.uid), {
          isOnline: true,
        }).then((res) => {
          console.log("INSIDE", res)

        }).catch((err) => {
          console.log("ERROR", err)
        })


        // const userDocRef = doc(db, "users", result.user.uid);
        // const isOnlineField = { isOnline: true };
        // await updateDoc(userDocRef, isOnlineField);


      if (result) {
        toast.success("User LoggedIn Successfully");
      } else {
        toast.error("User unable to LoggedIn ");
      }

     

      // console.log("check@@@@", check)

    

      navigate("/OnetoOneChat");


      // resetting the state
      setValues({
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
          <h3>Chat Login</h3>

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
            {/* {values.isMember ? "Not a Member Yet?" : "Already a Member? "} */}
            Not a Member Yet?{" "}
            <Link to="/FirebaseRegister" className="member-btn">
              Register
            </Link>
          </p>
        </form>
      </Wrapper>
    </div>
  );
};

export default FirebaseLogin;
