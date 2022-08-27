import React, { useState, useEffect } from "react";

// Charts
import { BarCharts } from "../components";
import { AreaCharts } from "../components";

// Toast
import { toast } from "react-toastify";

// CSS
import Wrapper from "../assets/wrappers/ChartsContainer";

// API
import { API } from "../backend";
import { countAllUser } from "../helper/ApiCall";

const ChartContainer = () => {
  const [values, setValues] = useState({
    error: "",
    success: "false",
    data: [],
  });

  // Destructure
  // const { data, error, success } = values;
  const preload = () => {
    countAllUser().then((data) => {
      if (data.data.status == 400) {
        toast.error(data.data.message);
        setValues({ ...values, error: data.data.message, success: false });
      } else {
        console.log(data.data.user.rows);
        console.log(data.data.user.rows[0].authenticationMethod);
        setValues({ ...values, data: data.data.user.rows });
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const data = [
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

  const [barChart, setBarChart] = useState(true);
  return (
    <Wrapper>
      <h2>User Details Chart</h2>
      <button type="button" onClick={() => setBarChart(!barChart)}>
        {barChart ? "Area Chart" : "Bar Chart"}
      </button>

      {data.map((individualData, index) => {
        console.log(individualData);
      })}

      {barChart ? <BarCharts data={data} /> : <AreaCharts data={data} />}
    </Wrapper>
  );
};

export default ChartContainer;
