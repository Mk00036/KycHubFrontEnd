import DashBoardTable from "./DashBoardTable/DashBoardTable";
import useCustomers from "../../../customHooks/useCustomers";
import { Spin, Row, Col, Card } from "antd";
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
} from "recharts";
import PageLayout from "../../Layouts/Wrapper/PageLayout";

const OverView = () => {
  const { customers, loading, error } = useCustomers();

  // Pie chart data (risk score distribution)
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

  // Line chart data (income vs expenses)
  const lineChartData = customers.map((customer) => ({
    name: customer.name,
    income: customer.monthlyIncome,
    expenses: customer.monthlyExpenses,
  }));

  // Card style with border and hover shadow
  const cardStyle: React.CSSProperties = {
    border: "1px solid #d9d9d9",
    borderRadius: "8px",
    transition: "box-shadow 0.3s ease",
    cursor: "pointer",
  };

  return (
    <PageLayout>
      {/* Loading Spinner */}
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(240, 240, 240, 0.7)", // light gray with slight transparency
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
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
          {/* Statistic Cards */}
          <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
            <Col xs={24} sm={12} md={8}>
              <Card
                hoverable
                style={cardStyle}
                bodyStyle={{ textAlign: "center" }}
              >
                <h3>Total Customers</h3>
                <p style={{ fontSize: "24px", fontWeight: "bold" }}>
                  {customers.length}
                </p>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card
                hoverable
                style={cardStyle}
                bodyStyle={{ textAlign: "center" }}
              >
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
              <Card
                hoverable
                style={cardStyle}
                bodyStyle={{ textAlign: "center" }}
              >
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
              <Card hoverable title="Risk Score Distribution" style={cardStyle}>
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
                      {riskData.map((_entry, index) => (
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
              <Card hoverable title="Income vs Expenses" style={cardStyle}>
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
            <Card
              hoverable
              title="Customers Details"
              style={cardStyle}
              bodyStyle={{ padding: "10px" }}
            >
              <DashBoardTable customers={customers} />
            </Card>
          </div>
        </>
      )}
    </PageLayout>
  );
};

export default OverView;
