import react from "react";

// Icons
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { AiOutlineMail } from "react-icons/ai";
import { FiPhoneCall } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";

// Components
import StatItem from "../components/StatItem";

// CSS
import Wrapper from "../assets/wrappers/StatsContainer";

const StatsContainer = () => {
  const datas = [
    {
      AuthenticationMethod: "Email",
      count: 5,
    },
    {
      AuthenticationMethod: "Phone Number",
      count: 10,
    },
    {
      AuthenticationMethod: "Facebook",
      count: 4,
    },
    {
      AuthenticationMethod: "Google",
      count: 3,
    },
  ];
  console.log(datas[1].count);
  const defaultState = [
    {
      title: "Registeration from Email",
      count: datas[0].count || 0,
      icon: <AiOutlineMail size={56} />,
      color: "#e9b949",
      bcg: "#fcefc7",
    },

    {
      title: "Registeration from Number ",
      count: datas[1].count || 0,
      icon: <FiPhoneCall />,
      color: "#383CC1",
      bcg: "#e0e8f9",
    },

    {
      title: "Registeration from Google ",
      count: datas[2].count || 0,
      icon: <FcGoogle size={50} />,
      color: "#35BDD0",
      bcg: "#e7f9fd",
    },
    {
      title: "Registeration from Facebook",
      count: datas[3].count || 0,
      icon: <AiFillFacebook size={50} />,
      color: "#3b82f6",
      bcg: "#e7f0fe",
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
