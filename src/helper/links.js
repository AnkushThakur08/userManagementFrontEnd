import React from "react";

import { IoBarChartSharp } from "react-icons/io5";
import { ImProfile } from "react-icons/im";
import { FaUserFriends } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { BsChatLeftTextFill } from "react-icons/bs";
import { FcInvite } from "react-icons/fc";
import { MdNotificationAdd } from "react-icons/md";
import { FiLogIn } from "react-icons/fi";
import { RiChatPrivateFill } from "react-icons/ri";

const ankush = "1";

const links = [
  {
    id: 1,
    text: "Stats",
    path: "/",
    icon: <IoBarChartSharp />,
  },
  {
    id: 2,
    text: "Friends",
    path: "Friend",
    icon: <FaUserFriends />,
  },
  {
    id: 3,
    text: "Friend Invites",
    path: "Invites",
    icon: <FcInvite />,
  },
  // {
  //   id: 4,
  //   text: "Send Notification",
  //   path: "sendNotification",
  //   icon: <MdNotificationAdd />,
  // },
  {
    id: 5,
    text: "Notification Center",
    path: "Notification",
    icon: <IoMdNotifications />,
  },
  {
    id: 6,
    text: "Profile",
    path: "Profile",
    icon: <ImProfile color="#627D98" />,
  },

  // {
  //   id: 7,
  //   text: "Chat",
  //   path: "Chat",
  //   icon: <BsChatLeftTextFill />,
  // },

  {
    id: 8,
    text: "Chat Login",
    path: "Chat2",
    icon: <FiLogIn />,
  },
  {
    id: 9,
    text: "Private Chat",
    path: "OnetoOneChat",
    icon: <RiChatPrivateFill />,
  },
];

export default links;
