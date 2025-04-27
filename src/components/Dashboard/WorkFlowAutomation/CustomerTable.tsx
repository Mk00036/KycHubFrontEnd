import React, { useState, useEffect } from "react";
import {
  Card,
  Col,
  Input,
  Row,
  Select,
  Table,
  Tag,
  Progress,
  Button,
  Modal,
  Form,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import axios from "axios";

const { Option } = Select;
const { Search } = Input;

interface Customer {
  customerId: string;
  name: string;
  creditScore: number;
  riskScore: number;
  status: "Approved" | "Pending" | "Rejected" | "Review";
  monthlyIncome?: number;
  monthlyExpenses?: number;
  outstandingLoans?: number;
  accountBalance?: number;
}

const CustomerTable: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const [form] = Form.useForm();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      // Replace this URL with your API endpoint
      const response = await axios.get<Customer[]>("http://localhost:5000/api/customers");
      setCustomers(response.data);
    } catch (error) {
      console.error("Failed to fetch customers", error);
      toast.error("Failed to fetch customers!");
    }
  };

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

  const handleEdit = (customer: Customer) => {
    setSelectedCustomer(customer);
    form.setFieldsValue(customer);
    setIsModalOpen(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();

      if (!selectedCustomer) return;

      const updatedCustomer = {
        ...selectedCustomer,
        ...values,
      };

      // PUT API call
      await axios.put(`http://localhost:5000/api/customers/${selectedCustomer.customerId}`, updatedCustomer);

      toast.success("Customer updated successfully!");
      setIsModalOpen(false);
      fetchCustomers();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update customer!");
    }
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    
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
          <Progress
            percent={riskScore}
            size="small"
            status="active"
            strokeColor={color}
            style={{ width: 100 }}
          />
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button type="link" onClick={() => handleEdit(record)}>
          Edit
        </Button>
      ),
    },
  ];

  return (
    <>
      <ToastContainer /> {/* Toast Container */}

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

      {/* Edit Modal */}
      <Modal
        title="Edit Customer"
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Save"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please enter name" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="monthlyIncome" label="Monthly Income" rules={[{ required: true, message: "Please enter monthly income" }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="monthlyExpenses" label="Monthly Expenses" rules={[{ required: true, message: "Please enter monthly expenses" }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="creditScore" label="Credit Score" rules={[{ required: true, message: "Please enter credit score" }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="outstandingLoans" label="Outstanding Loans" rules={[{ required: true, message: "Please enter outstanding loans" }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="accountBalance" label="Account Balance" rules={[{ required: true, message: "Please enter account balance" }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="status" label="Status" rules={[{ required: true, message: "Please select status" }]}>
            <Select>
              <Option value="Approved">Approved</Option>
              <Option value="Pending">Pending</Option>
              <Option value="Rejected">Rejected</Option>
              <Option value="Review">Review</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CustomerTable;
