import React, { useState, useEffect } from "react";

// CSS
import Wrapper from "../../../assets/wrappers/DashboardFormPage";

// React Router
import { Link, useNavigate } from "react-router-dom";

// React-Toastify
import { toast } from "react-toastify";

// Firebase
import { auth, db } from "../../../Config/firebase2";
import { signOut } from "firebase/auth";
import { updateDoc, doc, orderBy } from "firebase/firestore";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import User from "./User";
import MessageForm from "./MessageForm";
import Message from "./Message";

const OnetoOneChat = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState("");
  const [text, setText] = useState("");
  // const [img, setImg] = useState("");
  const [msgs, setMsgs] = useState([]);

  const handleSignout = async () => {
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      isOnline: false,
    });
    await signOut(auth);
    localStorage.removeItem("user");
    toast.success("User Logout Successfully");
    navigate("/chat2");
  };

  const user1 = auth.currentUser.uid;

  useEffect(() => {
    const usersRef = collection(db, "users");

    console.log(auth.currentUser.uid);
    // create query object
    // const q = query(usersRef, where("uid", "not-in", [user1]));
    const q = query(usersRef, where("uid", "not-in", [user1]));
    // execute query
    const unsub = onSnapshot(q, (querySnapshot) => {
      let users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setUsers(users);
    });
    return () => unsub();
  }, []);
  console.log(users);

  const selectUser = async (user) => {
    setChat(user);
    console.log(user);

    const user2 = user.uid;

    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    const msgsRef = collection(db, "messages", id, "chat");
    const q = query(msgsRef, orderBy("createdAt", "asc"));

    onSnapshot(q, (querySnapshot) => {
      let msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push(doc.data());
      });
      setMsgs(msgs);
    });
  };

  console.log(msgs);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user2 = chat.uid;

    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    await addDoc(collection(db, "messages", id, "chat"), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
    });
    setText("");
  };

  return (
    <Wrapper>
      <h3>Chat Section</h3>
      <button
        type="submit"
        className="btn changes logout"
        onClick={handleSignout}
      >
        Chat Logout
      </button>

      <div className="home_container">
        <div className="users_container">
          {users.map((user) => (
            <User key={user.uid} user={user} selectUser={selectUser} />
          ))}
        </div>
        <div className="messages_container">
          {chat ? (
            <>
              <div className="messages_user">
                <h3>{chat.name}</h3>
              </div>

              <div className="messages">
                {msgs.length
                  ? msgs.map((msg, i) => (
                      <Message key={i} msg={msg} user1={user1} />
                    ))
                  : null}
              </div>

              <MessageForm
                handleSubmit={handleSubmit}
                text={text}
                setText={setText}
              />
            </>
          ) : (
            <h3 className="no_conv">Select a user to start a conversation</h3>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default OnetoOneChat;
