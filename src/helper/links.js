import React from "react";

import { IoBarChartSharp } from "react-icons/io5";
import { ImProfile } from "react-icons/im";
import { FaUserFriends } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { BsChatLeftTextFill } from "react-icons/bs";

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
    text: "Notification",
    path: "Notification",
    icon: <IoMdNotifications />,
  },
  {
    id: 4,
    text: "Profile",
    path: "Profile",
    icon: <ImProfile color="#627D98" />,
  },
  {
    id: 5,
    text: "Chat",
    path: "Chat",
    icon: <BsChatLeftTextFill />,
  },
];

export default links;
