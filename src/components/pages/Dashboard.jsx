import React, { useEffect, useState } from 'react';
import DashboardService from '../service/DashboardService';
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Bar
} from "recharts";
import '../css/Dashboard.css';

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      DashboardService.dashboardTxnService()
        .then(response => {
          console.log("API Response:", response.data);
          if (response.data && response.data.respObject) {
            setData(response.data.respObject);
          }
        })
        .catch(error => console.error("Error fetching transaction summary:", error));
    }
  }, []);

  if (!data) return <p>Loading...</p>;

  // Pie chart data for credit and debit
  const pieData = [
    { name: "Total Credited", value: data?.totalCredit },
    { name: "Total Debited", value: data?.totalDebit }
  ];

  const COLORS = ["#4CAF50", "#F44336"]; // Green and red

  // Group apartment payments by building
  const buildingWiseData = data?.bldngPayments
  ? Object.entries(data.bldngPayments).map(([buildingName, apartments]) => {
      const apartmentList = Object.entries(apartments).map(([aptId, amount]) => ({
        name: `Apt ${aptId}`,
        value: amount
      }));

      return {
        building: buildingName,
        apartments: apartmentList
      };
    })
  : [];

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Monthly Transactions Overview</h1>
      <div className="dashboard-content">

        {/* Pie Chart for credit/debit summary */}
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

        {/* Bar Charts: One per building */}
        {buildingWiseData.map((buildingData, index) => (
          <div className="chart-card" key={index}>
            <h2>{buildingData.building} - Apartment Payments</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={buildingData.apartments} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Dashboard;
