// src/types/customer.ts

export interface Customer {
    customerId: string;
    name: string;
    monthlyIncome: number;
    monthlyExpenses: number;
    creditScore: number;
    outstandingLoans: number;
    loanRepaymentHistory: number[];
    accountBalance: number;
    status: string;
    // riskScore is optional because it's commented out in your sample
    riskScore?: number;
    otherDetails?: string;
  }
  