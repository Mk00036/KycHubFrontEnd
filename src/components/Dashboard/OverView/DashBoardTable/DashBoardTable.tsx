import React, { useState } from "react";
import type { TableColumnsType, TableProps } from "antd";
import { Button, Space, Table } from "antd";
import { Customer } from "../../../../types/customer";

type OnChange = NonNullable<TableProps<DataType>["onChange"]>;
type Filters = Parameters<OnChange>[1];
type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

interface DataType {
  key: string;
  customerId: string;
  name: string;
  monthlyIncome: number;
  monthlyExpenses: number;
  creditScore: number;
  outstandingLoans: number;
  accountBalance: number;
  status: string;
}

interface DashBoardTableProps {
  customers: Customer[];
}

const DashBoardTable: React.FC<DashBoardTableProps> = ({ customers }) => {
  const [filteredInfo, setFilteredInfo] = useState<Filters>({});
  const [sortedInfo, setSortedInfo] = useState<Sorts>({});

  const handleChange: OnChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter as Sorts);
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };

  const setIncomeSort = () => {
    setSortedInfo({
      order: "descend",
      columnKey: "monthlyIncome",
    });
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "Customer ID",
      dataIndex: "customerId",
      key: "customerId",
      ellipsis: true,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
    },
    {
      title: "Monthly Income",
      dataIndex: "monthlyIncome",
      key: "monthlyIncome",
      sorter: (a, b) => a.monthlyIncome - b.monthlyIncome,
      sortOrder:
        sortedInfo.columnKey === "monthlyIncome" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Monthly Expenses",
      dataIndex: "monthlyExpenses",
      key: "monthlyExpenses",
      sorter: (a, b) => a.monthlyExpenses - b.monthlyExpenses,
      sortOrder:
        sortedInfo.columnKey === "monthlyExpenses" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Credit Score",
      dataIndex: "creditScore",
      key: "creditScore",
      sorter: (a, b) => a.creditScore - b.creditScore,
      sortOrder:
        sortedInfo.columnKey === "creditScore" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Outstanding Loans",
      dataIndex: "outstandingLoans",
      key: "outstandingLoans",
      sorter: (a, b) => a.outstandingLoans - b.outstandingLoans,
      sortOrder:
        sortedInfo.columnKey === "outstandingLoans" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Account Balance",
      dataIndex: "accountBalance",
      key: "accountBalance",
      sorter: (a, b) => a.accountBalance - b.accountBalance,
      sortOrder:
        sortedInfo.columnKey === "accountBalance" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Review", value: "Review" },
        { text: "Approved", value: "Approved" },
      ],
      filteredValue: filteredInfo.status || null,
      onFilter: (value, record) => record.status.includes(value as string),
      ellipsis: true,
    },
  ];

  // Convert customers to DataType for table
  const data: DataType[] = customers.map((customer) => ({
    key: customer.customerId,
    customerId: customer.customerId,
    name: customer.name,
    monthlyIncome: customer.monthlyIncome,
    monthlyExpenses: customer.monthlyExpenses,
    creditScore: customer.creditScore,
    outstandingLoans: customer.outstandingLoans,
    accountBalance: customer.accountBalance,
    status: customer.status,
  }));

  return (
    <>
    <div style={{display:"flex", flexDirection:"column", gap:"10px"}}>
      <Space style={{paddingInline:"20px"}}>
        <Button onClick={setIncomeSort}>Sort by Income</Button>
        <Button onClick={clearFilters}>Clear Filters</Button>
        <Button onClick={clearAll}>Clear All</Button>
      </Space>

      <div style={{
        width: "100%",
        overflowX: "auto",
        paddingInline: "20px",
      }}>
        <Table<DataType>
          columns={columns}
          dataSource={data}
          onChange={handleChange}
          scroll={{ x: "max-content" }}
          style={{ border: "1px solid lightgray", borderRadius: "4px"}}
          pagination={{ pageSize: 5 }}
        />
      </div>
    </div>
    </>
  );
};

export default DashBoardTable;
