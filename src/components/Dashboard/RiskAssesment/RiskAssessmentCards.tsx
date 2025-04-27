import React from "react";
import { Card, Col, Row, Statistic } from "antd";
import { Customer } from "../../../types/customer";

interface RiskAssessmentCardsProps {
  customers: Customer[];
}

const RiskAssessmentCards: React.FC<RiskAssessmentCardsProps> = ({ customers }) => {
  const totalCustomers = customers.length;
  const approvedCustomers = customers.filter(c => c.status === "Approved").length;
  const reviewCustomers = customers.filter(c => c.status === "Review").length;
  const avgRiskScore = totalCustomers > 0
    ? Math.round(customers.reduce((sum, c) => sum + (c.riskScore || 0), 0) / totalCustomers)
    : 0;

  return (
    <Row gutter={16} style={{ marginBottom: 24 }}>
      <Col span={6}>
        <Card>
          <Statistic title="Total Customers" value={totalCustomers} />
        </Card>
      </Col>
      <Col span={6}>
        <Card>
          <Statistic title="Approved" value={approvedCustomers} valueStyle={{ color: "green" }} />
        </Card>
      </Col>
      <Col span={6}>
        <Card>
          <Statistic title="Under Review" value={reviewCustomers} valueStyle={{ color: "orange" }} />
        </Card>
      </Col>
      <Col span={6}>
        <Card>
          <Statistic title="Avg Risk Score" value={avgRiskScore} suffix="%" />
        </Card>
      </Col>
    </Row>
  );
};

export default RiskAssessmentCards;
