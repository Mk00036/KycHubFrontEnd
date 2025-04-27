import React, { useState } from "react";
import { Card, Col, Input, Row, Select, Table, Tag, Progress } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Customer } from "../../../types/customer";

const { Option } = Select;
const { Search } = Input;

interface RiskAssessmentTableProps {
  customers: Customer[];
  openDrawer: (customer: Customer) => void;
}

const CustomerTable: React.FC<RiskAssessmentTableProps> = ({ customers, openDrawer }) => {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch = customer.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = statusFilter === "All" || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusTagColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "green";
      case "Pending":
        return "orange";
      case "Rejected":
        return "red";
      case "Review":
        return "blue";
      default:
        return "default";
    }
  };

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
        <Tag color={getStatusTagColor(status)}>{status}</Tag>
      ),
    },
    {
      title: "Risk Score",
      dataIndex: "riskScore",
      key: "riskScore",
      sorter: (a, b) => (a.riskScore ?? 0) - (b.riskScore ?? 0),
      render: (riskScore = 0) => {
        let color = "#52c41a"; 

        if (riskScore >= 65) {
          color = "#f5222d"; 
        } else if (riskScore >= 50) {
          color = "#faad14"; 
        }

        return (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Progress 
              percent={riskScore} 
              size="small" 
              status="active" 
              strokeColor={color} 
              style={{ width: 100 }} 
            />
          </div>
        );
      },
    },
  ];

  return (
    <>
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
            <Option value="Pending">Pending</Option>
            <Option value="Rejected">Rejected</Option>
            <Option value="Review">Review</Option>
          </Select>
        </Col>
      </Row>

      <Card title="Customer Risk Assessment">
        <Table
          dataSource={filteredCustomers}
          columns={columns}
          rowKey="customerId"
          pagination={{ pageSize: 5 }}
        />
      </Card>
    </>
  );
};

export default CustomerTable;
