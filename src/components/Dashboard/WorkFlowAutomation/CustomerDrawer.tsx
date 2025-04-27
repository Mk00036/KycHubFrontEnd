// import { Drawer, Form, Select, Button, message } from "antd";
// import { useEffect, useState } from "react";
// import { Customer } from "../../../types/customer";

// type CustomerDrawerProps = {
//   customer: Customer | null;
//   onClose: () => void;
//   onStatusUpdate: (updatedCustomer: Customer) => void;
// };

// const { Option } = Select;

// const CustomerDrawer = ({ customer, onClose, onStatusUpdate }: CustomerDrawerProps) => {
//   const [form] = Form.useForm();
//   const [loading, setLoading] = useState(false);

//   const handleUpdate = async () => {
//     try {
//       const values = await form.validateFields();
//       setLoading(true);

//       // Dummy API call simulation
//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       const updatedCustomer = { ...customer!, status: values.status };
//       onStatusUpdate(updatedCustomer);
//       message.success("Status updated successfully!");
//       onClose();
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   const handleClose = () => {
//     alert("Are you sure you want to close the drawer?");}

//     useEffect(() => {
//         handleClose();
//     },[])
//   return (
//     <Drawer
//       title="Update Customer Status"
//       placement="right"
//       onClose={onClose}
//       open={!!customer}
//       width={400}
//     >
//       {customer && (
//         <Form form={form} initialValues={{ status: customer.status }} layout="vertical">
//           <Form.Item name="status" label="Status" rules={[{ required: true, message: "Please select a status" }]}>
//             <Select placeholder="Select status">
//               <Option value="Review">Review</Option>
//               <Option value="Approved">Approved</Option>
//               <Option value="Rejected">Rejected</Option>
//             </Select>
//           </Form.Item>

//           <Form.Item>
//             <Button type="primary" onClick={handleUpdate} loading={loading} block>
//               Update Status
//             </Button>
//           </Form.Item>
//         </Form>
//       )}
//     </Drawer>
//   );
// };

// export default CustomerDrawer;
