import React, { useState, useEffect } from "react";

// Firebase
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import { db } from "../../Config/firebaseConfig";

// Components
import { SendMessage } from "../../components";

import Wrapper from "../../assets/wrappers/DashboardFormPage";

const ChatPage = (/* { user = null, db = null } */) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    db.collection("messages")
      .orderBy("createdAt")
      .limit(50)
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  return (
    <Wrapper>
      <h3>Chat Section</h3>
      {console.log("Ankush")}

      {console.log(messages)}
      {messages.map(({ id, text, senderId, senderName }) => (
        <div style={{ display: "flex" }}>
          <div
            key={id}
            style={{
              backgroundColor: "#3b82f6",
              margin: "10px",

              padding: "5px",
              paddingRight: "22px",
              borderRadius: "5px",
              marginLeft: "0px",
            }}
          >
            <h6 style={{ margin: 0 }}>{senderName}</h6>
            <p style={{ margin: 0 }}>{text}</p>
          </div>
        </div>
      ))}

      <SendMessage />
    </Wrapper>
  );
};

export default ChatPage;
