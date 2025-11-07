// src/services/apiService.ts
import axios from 'axios';

// Use import.meta.env to access Vite's environment variables
const GET_CUSTOMER_API_URL = import.meta.env.VITE_API_URL || "https://kychubassesment-backend-api.onrender.com/api/customers";

export const fetchCustomers = async () => {
  try {
   
    if (!GET_CUSTOMER_API_URL) {
      console.clear();
      console.log(GET_CUSTOMER_API_URL);
      throw new Error('API URL is not defined');
    }
    
    console.log(GET_CUSTOMER_API_URL, "API URL");

    const response = await axios.get(GET_CUSTOMER_API_URL);
    console.log(response);
    return response.data; 
  } catch (error) {
    console.error(error, "Error while fetching customers");
    throw new Error('Failed to fetch customers');
  }
};
