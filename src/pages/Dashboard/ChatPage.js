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
      .limit(100)
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  return (
    <Wrapper>
      <h3>Chat Section</h3>
      {console.log("Ankush")}

      {messages.map(({ id, text }) => (
        <div key={id}>
          <p>{text}</p>
        </div>
      ))}

      <SendMessage />
    </Wrapper>
  );
};

export default ChatPage;
