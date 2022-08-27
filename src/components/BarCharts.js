import React from "react";

// Charts
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const BarCharts = ({ data }) => {
  // console.log("ANKUSH", data);
  // {
  //   data.map((individualData, index) => {
  //     console.log(individualData);
  //   });
  // }
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray="10 10" />
        <XAxis dataKey="AuthenticationMethod" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="count" fill="#3b82f6" barSize={75} />
      </BarChart>
    </ResponsiveContainer>

    // <div>
    //   <h2>Ankush</h2>
    // </div>
  );
};

export default BarCharts;
