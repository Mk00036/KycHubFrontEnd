// src/hooks/useCustomers.ts

import { useState, useEffect } from 'react';
import { fetchCustomers } from '../services/apiService';
import { Customer } from '../types/customer';

const useCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]); 
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCustomers = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchCustomers() as Customer[];
        setCustomers(data); // TypeScript now knows this is Customer[]
          } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getCustomers();
  }, []);

  return { customers, loading, error };
};

export default useCustomers;
