import CustomerTable from "./CustomerTable";
import useCustomers from "../../../customHooks/useCustomers";
import { Spin } from "antd";
import PageLayout from "../../Layouts/Wrapper/PageLayout";

const WorkFlowAutomation = () => {
  const { customers, loading, error } = useCustomers();

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
        <CustomerTable  />
      )}
    </PageLayout>
  );
};

export default WorkFlowAutomation;
