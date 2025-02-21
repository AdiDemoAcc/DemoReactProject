import React, { useEffect, useState } from 'react';
import DashboardService from '../service/DashboardService';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Bar } from "recharts";
import '../css/Dashboard.css'

const Dashboard = () => {
  const [data, setData] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    DashboardService.dashboardTxnService()
      .then(response => {
        // console.log("API Response:", response.data);
        if (response.data && response.data.respObject) {
          setData(response.data.respObject);
        }
      })
      .catch(error => console.error("Error fetching transaction summary:", error));
  }, []);

  if (!data) return <p>Loading...</p>;

  const pieData = [
    { name: "Total Credited", value: data?.totalCredit },
    { name: "Total Debited", value: data?.totalDebit }
  ];

  const aptmntData = Object.entries(data.aptmntPayments).map(([aptmntId, amount]) => ({
    name: `Apt ${aptmntId}`,
    value: amount
  }));

  const COLORS = ["#4CAF50", "#F44336"]; // Green & Red for clarity

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Monthly Transactions Overview</h1>
      <div className="dashboard-content">
        
        {/* Pie Chart */}
        <div className="chart-card">
          <h2>Transaction Summary</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="chart-card">
          <h2>Apartment-wise Maintenance Payments</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={aptmntData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d" barSize={20} shapeRendering={Cell}/>
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
