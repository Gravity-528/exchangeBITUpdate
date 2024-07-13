// // import React,{useState,useEffect} from 'react'
// // import axios from "axios"

// // const QrCodeSee = () => {
// //   const [used,getused]=useState('');  
// //   const handleChange=async()=>{
// //      const response=await axios.get('/api/v1/users/your',{
// //         withCredentials:true
// //      })
// //      getused(response.data.qrcode);
// //   }
// //   return (
// //     <div>Your QrCode</div>
// //   )
// // }

// // export default QrCodeSee
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import styled from 'styled-components';

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 20px;
//   text-align: center;

//   @media (max-width: 768px) {
//     padding: 10px;
//   }

//   @media (max-width: 480px) {
//     padding: 5px;
//   }
// `;

// const QrImage = styled.img`
//   width: 250px;
//   height: 250px;
//   border: 2px solid #ccc;
//   margin-top: 20px;

//   @media (max-width: 768px) {
//     width: 200px;
//     height: 200px;
//   }

//   @media (max-width: 480px) {
//     width: 150px;
//     height: 150px;
//   }
// `;

// const QrCodeSee = () => {
//   const [qrCode, setQrCode] = useState('');

//   useEffect(() => {
//     const fetchQrCode = async () => {
//       try {
//         const response = await axios.get('/api/v1/users/your', {
//           withCredentials: true,
//         });
//         console.log("qrop",response.data.data.qrcode);
//         setQrCode(response.data.data.qrcode);
//       } catch (error) {
//         console.error('Error fetching QR code:', error);
//       }
//     };

//     fetchQrCode();
//   }, []);

//   return (
//     <Container>
//       <h2>Your QR Code</h2>
//       {qrCode ? <QrImage src={qrCode} alt="User QR Code" /> : <p>Loading...</p>}
//     </Container>
//   );
// };

// export default QrCodeSee;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  text-align: center;

  @media (max-width: 768px) {
    padding: 10px;
  }

  @media (max-width: 480px) {
    padding: 5px;
  }
`;

const QrImage = styled.img`
  width: 250px;
  height: 250px;
  border: 2px solid #ccc;
  margin-top: 20px;

  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
  }

  @media (max-width: 480px) {
    width: 150px;
    height: 150px;
  }
`;

const QrCodeSee = () => {
  const [qrCode, setQrCode] = useState('');

  useEffect(() => {
    const fetchQrCode = async () => {
      try {
        const response = await axios.get('/api/v1/users/your', {
          withCredentials: true,
        });
        setQrCode(response.data.data.qrcode);
      } catch (error) {
        console.error('Error fetching QR code:', error);
      }
    };

    fetchQrCode();
  }, []);

  return (
    <Container>
      <h2>Your QR Code</h2>
      {qrCode ? <QrImage src={qrCode} alt="User QR Code" /> : <p>Loading...</p>}
    </Container>
  );
};

export default QrCodeSee;

