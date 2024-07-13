// import React from 'react'
// import axios from 'axios'
// import { useState } from 'react'

// const attend = () => {
//     const [arr,fetcharr]=useState([]);
//     const handleFetch=async()=>{
//         const atted =await axios.get(`/api/v1/attendence/attend`,{
//             withCredentials:true
//         })
        
//         fetcharr(attend.data.data);
//     }
//   return (
//     <div>attend</div>
//   )
// }

// export default attend
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const AttendWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 20px;

  .date-item {
    background-color: #e0e0e0; 
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    flex: 1 1 100px; 
    text-align: center;
  }
`;

const Attend = () => {
  const [arr, fetchArr] = useState([]);

  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = async() => {
    try {
      const attend = await axios.get('/api/v1/attendence/attendIt', {
        withCredentials: true,
      });
      
      fetchArr(attend.data.data);
      console.log(attend.data.data);
    } catch (error) {
      console.log(error);
      console.error('Error fetching attendance data: some error is here', error);
    }
  };

  return (
    <AttendWrapper>
      {arr.length>0 ? arr.map((date, index) => (
        <div key={index} className="date-item">
          {date}
        </div>
      )):<div>have your dinner in the mess</div>}
    </AttendWrapper>
  );
};

export default Attend;
