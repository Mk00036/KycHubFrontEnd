import React from "react";
import DashBoardTable from "./DashBoardTable/DashBoardTable";
import useCustomers from "../../../customHooks/useCustomers";
import { Spin, Row, Col, Card } from "antd"; // Ant Design components
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"; // Recharts components

const OverView = () => {
  const { customers, loading, error } = useCustomers();

  // Prepare risk score data for Pie Chart
  const riskData = [
    {
      name: "Low Risk",
      value: customers.filter((customer) => (customer?.riskScore ?? 0) <= 10)
        .length,
    },
    {
      name: "Medium Risk",
      value: customers.filter(
        (customer) =>
          (customer?.riskScore ?? 0) > 10 && (customer?.riskScore ?? 0) <= 20
      ).length,
    },
    {
      name: "High Risk",
      value: customers.filter(
        (customer) =>
          (customer?.riskScore ?? 0) > 20 && (customer?.riskScore ?? 0) <= 30
      ).length,
    },
    {
      name: "Very High Risk",
      value: customers.filter((customer) => (customer?.riskScore ?? 0) > 30)
        .length,
    },
  ];

  const renderCustomLabel = ({
    name,
    percent,
  }: {
    name: string;
    percent: number;
  }) => {
    return `${name} (${(percent * 100).toFixed(0)}%)`;
  };

  // Prepare income vs expenses data for Line Chart
  const lineChartData = customers.map((customer) => ({
    name: customer.name,
    income: customer.monthlyIncome,
    expenses: customer.monthlyExpenses,
  }));

  return (
    <div style={{ padding: "20px" }}>
      {/* Loading Spinner */}
      {loading && (
        <div style={{ textAlign: "center", padding: "50px" }}>
          <Spin size="large" tip="Loading customers..." />
        </div>
      )}
      {/* Error Handling */}
      {error && (
        <div style={{ color: "red", textAlign: "center", padding: "20px" }}>
          <p>Error: {error}</p>
        </div>
      )}

      {/* Main Content */}
      {!loading && !error && (
        <>
          <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
            <Col xs={24} sm={12} md={8}>
              <Card>
                <h3>Total Customers</h3>
                <p style={{ fontSize: "24px", fontWeight: "bold" }}>
                  {customers.length}
                </p>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card>
                <h3>Average Income</h3>
                <p style={{ fontSize: "24px", fontWeight: "bold" }}>
                  $
                  {(
                    customers.reduce(
                      (acc, curr) => acc + (curr.monthlyIncome || 0),
                      0
                    ) / customers.length
                  ).toFixed(2)}
                </p>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card>
                <h3>Average Expenses</h3>
                <p style={{ fontSize: "24px", fontWeight: "bold" }}>
                  $
                  {(
                    customers.reduce(
                      (acc, curr) => acc + (curr.monthlyExpenses || 0),
                      0
                    ) / customers.length
                  ).toFixed(2)}
                </p>
              </Card>
            </Col>
          </Row>
          {/* Charts Section */}
          <Row gutter={[16, 16]}>
            {/* Pie Chart */}
            <Col xs={24} sm={24} md={12} lg={12}>
              <Card title="Risk Score Distribution">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={riskData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={80}
                      label={renderCustomLabel}
                      labelLine={false}
                    >
                      {riskData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"][index]
                          }
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </Col>

            {/* Line Chart */}
            <Col xs={24} sm={24} md={12} lg={12}>
              <Card title="Income vs Expenses">
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={lineChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="income"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                    <Line type="monotone" dataKey="expenses" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </Col>
          </Row>

          {/* Table Section */}
          <div style={{ marginTop: "24px" }}>
            <DashBoardTable customers={customers} />
          </div>
        </>
      )}
    </div>
  );
};

export default OverView;
