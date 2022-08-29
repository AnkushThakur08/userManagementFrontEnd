import React, { useState } from "react";

// Firebase
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Firebase DB
import { db } from "../Config/firebaseConfig";

// CSS
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { isAuthenticated } from "../helper/ApiCall";

const SendMessage = () => {
  const [msg, setMsg] = useState("");
  const [toogleMsg, setToogleMsg] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    let user = isAuthenticated().data;
    let senderId = user.user.id;
    let senderName = user.user.name;

    await db.collection("messages").add({
      senderId: senderId,
      senderName: senderName,
      text: msg,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setMsg("");
  };
  return (
    // <Wrapper>
    <form onSubmit={sendMessage}>
      <input
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        placeholder="Message..."
        className="form-input"
      />
      <br />
      <br />
      <button
        type="submit"
        onClick={() => setToogleMsg(!toogleMsg)}
        className="btn btn-hero"
      >
        Send
      </button>
      {console.log(toogleMsg)}
    </form>
    // </Wrapper>
  );
};

export default SendMessage;
