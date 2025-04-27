// src/services/apiService.ts

import axios from 'axios';

const GET_CUSTOMER_API_URL = 'http://localhost:5000/api/customers';

// Create a function to fetch customer data from the API
export const fetchCustomers = async () => {
  try {
    const response = await axios.get(GET_CUSTOMER_API_URL);
    return response.data; // Return the data from the response
  } catch (error) {
    throw new Error('Failed to fetch customers');
  }
};
