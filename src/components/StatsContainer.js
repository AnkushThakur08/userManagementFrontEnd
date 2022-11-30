import React, { useState, useEffect } from "react";

// Icons
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { AiOutlineMail } from "react-icons/ai";
import { FiPhoneCall } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";

// Toast
import { toast } from "react-toastify";

// Components
import StatItem from "../components/StatItem";

// CSS
import Wrapper from "../assets/wrappers/StatsContainer";

// API
import { getAllUser } from "../helper/ApiCall";

const StatsContainer = () => {
  const [values, setValues] = useState({
    error: "",
    success: "false",
    datas: [],
  });

  const preload = () => {
    getAllUser().then((data) => {
      console.log(data);
      console.log(data.data);
      if (data.data.status == 400) {
        toast.error("ERROR");
        setValues({ ...values, success: false });
      } else {
        console.log(data.data);
        setValues({ ...values, datas: data.data });
      }
    });
  };

  console.log(values.datas);
  console.log(values.datas.countByPhoneNumber);

  useEffect(() => {
    preload();
  }, []);

  console.log(values.datas.countByPhoneNumber);

  const data = [
    {
      AuthenticationMethod: "PhoneNumber",
      count: values.datas.countByPhoneNumber,
      // count: 10,
    },
    {
      AuthenticationMethod: "Email",
      count: values.datas.countuserByEmail,
    },

    {
      AuthenticationMethod: "Facebook",
      count: values.datas.getUserByFacebookId,
    },
    {
      AuthenticationMethod: "Google",
      count: values.datas.getUserBygoogleId,
    },
  ];

  {
    data.map((individualData, index) => {
      console.log(individualData);
    });
  }

  const defaultState = [
    {
      title: "Registeration from Number ",
      count: data[0].count || 0,
      icon: <FiPhoneCall />,
      color: "#383CC1",
      bcg: "#e0e8f9",
    },
    {
      title: "Registeration from Email",
      count: data[1].count,
      icon: <AiOutlineMail size={56} />,
      color: "#e9b949",
      bcg: "#fcefc7",
    },

    {
      title: "Registeration from Facebook",
      count: data[2].count || 0,
      icon: <AiFillFacebook size={50} />,
      color: "#3b82f6",
      bcg: "#e7f0fe",
    },
    {
      title: "Registeration from Google ",
      count: data[3].count || 0,
      icon: <FcGoogle size={50} />,
      color: "#35BDD0",
      bcg: "#e7f9fd",
    },
  ];
  return (
    <Wrapper>
      {defaultState.map((item, index) => {
        return <StatItem key={index} {...item} />;
      })}
    </Wrapper>
  );
};

export default StatsContainer;
