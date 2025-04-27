import CustomerTable from "./CustomerTable";
import useCustomers from "../../../customHooks/useCustomers";
import { Spin } from "antd";
import PageLayout from "../../Layouts/Wrapper/PageLayout";
import { Customer } from "../../../types/customer";
import { useState } from "react";

const WorkFlowAutomation = () => {
  const { customers, loading, error } = useCustomers();
   const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
   const openDrawer = (customer: Customer) => {
     setSelectedCustomer(customer);
     setDrawerOpen(true);
   };

  return (
    <PageLayout>
   
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(240, 240, 240, 0.7)", 
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
             <CustomerTable customers={customers} openDrawer={openDrawer} />
        </>
      )}
    </PageLayout>
  );
};

export default WorkFlowAutomation;
