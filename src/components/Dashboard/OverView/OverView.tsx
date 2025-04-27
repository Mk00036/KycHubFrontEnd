import React from 'react';
import DashBoardTable from './DashBoardTable/DashBoardTable';
import useCustomers from '../../../customHooks/useCustomers';

const OverView = () => {
   const {customers, loading, error} = useCustomers();
    
  return (
    <div style={{ padding: '20px' }}>
        {loading && <p>Loading customers...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <DashBoardTable customers ={customers}  />
    </div>
  );
}

export default OverView;
