import React, { useState } from "react";

import {
  Card,
  Table,
  Tag,
  Progress,
  Drawer,
  Spin,
  Alert,
  Row,
  Col,
  Input,
  Select,
  Statistic,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import useCustomers from "../../../customHooks/useCustomers";
import { Customer } from "../../../types/customer";

const { Option } = Select;
const { Search } = Input;

const RiskAssessment = () => {
  const { customers, loading, error } = useCustomers();
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const openDrawer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setSelectedCustomer(null);
    setDrawerOpen(false);
  };

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch = customer.name
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const columns: ColumnsType<Customer> = [
    {
      title: "Customer ID",
      dataIndex: "customerId",
      key: "customerId",
      sorter: (a, b) => a.customerId.localeCompare(b.customerId),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text, record) => (
        <a onClick={() => openDrawer(record)}>{text}</a>
      ),
    },
    {
      title: "Credit Score",
      dataIndex: "creditScore",
      key: "creditScore",
      sorter: (a, b) => a.creditScore - b.creditScore,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: (status) => (
        <Tag color={status === "Approved" ? "green" : "orange"}>{status}</Tag>
      ),
    },
    {
      title: "Risk Score",
      dataIndex: "riskScore",
      key: "riskScore",
      sorter: (a, b) => (a.riskScore ?? 0) - (b.riskScore ?? 0),
      render: (riskScore = 0) => (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Progress
            percent={riskScore}
            size="small"
            status="active"
            style={{ width: 100 }}
          />
          <span>{riskScore}%</span>
        </div>
      ),
    },
  ];



  if (error) {
    return (
      <div className="p-6">
        <Alert
          message="Error loading customer data"
          description={error || "Please try again later."}
          type="error"
          showIcon
        />
      </div>
    );
  }

  const totalCustomers = customers.length;
  const approvedCustomers = customers.filter(
    (c) => c.status === "Approved"
  ).length;
  const reviewCustomers = customers.filter((c) => c.status === "Review").length;
  const avgRiskScore =
    totalCustomers > 0
      ? Math.round(
          customers.reduce((sum, c) => sum + (c.riskScore || 0), 0) /
            totalCustomers
        )
      : 0;

     

  return (
    <>
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
      
      {!loading && !error && (
    <div className="p-6 grid grid-cols-1 gap-4">
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic title="Total Customers" value={totalCustomers} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Approved"
              value={approvedCustomers}
              valueStyle={{ color: "green" }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Under Review"
              value={reviewCustomers}
              valueStyle={{ color: "orange" }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Avg Risk Score" value={avgRiskScore} suffix="%" />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={12}>
          <Search
            placeholder="Search by customer name"
            onChange={(e) => setSearchText(e.target.value)}
            enterButton
          />
        </Col>
        <Col span={6}>
          <Select
            defaultValue="All"
            style={{ width: "100%" }}
            onChange={(value: string) => setStatusFilter(value)}
          >
            <Option value="All">All Status</Option>
            <Option value="Approved">Approved</Option>
            <Option value="Review">Review</Option>
            <Option value="Pending">Pending</Option>
          </Select>
        </Col>
      </Row>

      <Card title="Customer Risk Assessment">
        <Table
          dataSource={filteredCustomers}
          columns={columns.map((col) => {
            if (col.key === "riskScore") {
              return {
                ...col,
                render: (riskScore = 0) => {
                  let color = "#52c41a"; // default green

                  if (riskScore >= 60) {
                    color = "#f5222d"; // red
                  } else if (riskScore >= 50) {
                    color = "#faad14"; // orange
                  }

                  return (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <Progress
                        percent={riskScore}
                        size="small"
                        strokeColor={color}
                        style={{ width: 100 }}
                        status="active"
                      />
                    </div>
                  );
                },
              };
            }
            return col;
          })}
          rowKey="customerId"
          pagination={{ pageSize: 5 }}
        />
      </Card>

      <Drawer
        title="Customer Details"
        placement="right"
        onClose={closeDrawer}
        open={drawerOpen}
        width={400}
      >
        {selectedCustomer && (
          <div className="flex flex-col gap-4">
            <p>
              <strong>Name:</strong> {selectedCustomer.name}
            </p>
            <p>
              <strong>Customer ID:</strong> {selectedCustomer.customerId}
            </p>
            <p>
              <strong>Monthly Income:</strong> ₹
              {selectedCustomer.monthlyIncome.toLocaleString()}
            </p>
            <p>
              <strong>Monthly Expenses:</strong> ₹
              {selectedCustomer.monthlyExpenses.toLocaleString()}
            </p>
            <p>
              <strong>Account Balance:</strong> ₹
              {selectedCustomer.accountBalance.toLocaleString()}
            </p>
            <p>
              <strong>Outstanding Loans:</strong> ₹
              {selectedCustomer.outstandingLoans.toLocaleString()}
            </p>
            <p>
              <strong>Credit Score:</strong> {selectedCustomer.creditScore}
            </p>
            <p>
              <strong>Status:</strong>
              <Tag
                color={
                  selectedCustomer.status === "Approved" ? "green" : "orange"
                }
              >
                {selectedCustomer.status}
              </Tag>
            </p>
            <p>
              <strong>Risk Score:</strong>
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Progress
                percent={selectedCustomer.riskScore ?? 0}
                size="small"
                status="active"
                style={{ width: 100 }}
              />
              <span>{selectedCustomer.riskScore ?? 0}%</span>
            </div>
            <p>
              <strong>Loan Repayment History:</strong>
            </p>
            <div className="flex gap-2 flex-wrap">
              {(selectedCustomer.loanRepaymentHistory as (0 | 1)[]).map(
                (item, index) => (
                  <Tag color={item === 1 ? "green" : "red"} key={index}>
                    {item === 1 ? "Paid" : "Missed"}
                  </Tag>
                )
              )}
            </div>
          </div>
        )}
      </Drawer>
    </div>
       )}
    </>
  );
};

export default RiskAssessment;
