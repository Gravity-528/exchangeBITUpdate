// import React, { useEffect } from 'react';
// import { Html5Qrcode } from 'html5-qrcode';

// const QRCodeScanner = () => {
//     useEffect(() => {
//         const html5QrCode = new Html5Qrcode("reader");

//         const config = {
//             fps: 10,
//             qrbox: { width: 250, height: 250 },
//         };

//         html5QrCode.start(
//             { facingMode: "environment" }, // Use rear camera
//             config,
//             (decodedText) => {
//                 console.log(`Code matched: ${decodedText}`);
//                 // Handle the scanned QR code
//             },
//             (errorMessage) => {
//                 console.log(`Error scanning: ${errorMessage}`);
//             }
//         ).catch(err => {
//             console.error(`Error starting the QR code scanner: ${err}`);
//         });

//         return () => {
//             html5QrCode.stop().catch(err => {
//                 console.error(`Error stopping the QR code scanner: ${err}`);
//             });
//         };
//     }, []);

//     return (
//         <div>
//             <h2>QR Code Scanner</h2>
//             <div id="reader" style={{ width: '100%', height: '100vh', border: '1px solid #ccc' }}></div>
//         </div>
//     );
// };

// export default QRCodeScanner;

import React, { useEffect } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ReaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px;

    #reader {
        width: 80%; /* Default width */
        max-width: 300px; /* Maximum width */
        height: auto; /* Maintain aspect ratio */
        border: 1px solid #ccc;
    }

    @media (max-width: 768px) {
        #reader {
            width: 90%; /* More width on smaller screens */
        }
    }

    @media (max-width: 480px) {
        #reader {
            width: 100%; /* Full width on very small screens */
            max-width: 250px; /* Smaller max-width */
        }
    }
`;

const QRCodeScanner = () => {
    useEffect(() => {
        const html5QrCode = new Html5Qrcode("reader");

        const config = {
            fps: 6,
            qrbox: { width: 250, height: 250 },
        };

        html5QrCode.start(
            { facingMode: "environment" }, // Use rear camera
            config,
            async(decodedText) => {
                alert(`QR Code matched: ${decodedText}`);
                console.log(`Code matched: ${decodedText}`);
                
                try {  
                    const response = await axios.post('/api/v1/attendence/readqr', { response: decodedText }, {
                        withCredentials: true,
                    });
                    console.log('Data sent to backend:', response.data);
                } catch (error) {
                    alert("scanning failed or wrong qr code");
                    console.error('Error sending data to backend:', error);
                }

                navigate('/');
            },
            (errorMessage) => {
                console.log(`Error scanning: ${errorMessage}`);
            }
        ).catch(err => {
            console.error(`Error starting the QR code scanner: ${err}`);
        });

        return () => {
            html5QrCode.stop().catch(err => {
                console.error(`Error stopping the QR code scanner: ${err}`);
            });
        };
    }, []);

    return (
        <ReaderContainer>
            <h2>QR Code Scanner</h2>
            <div id="reader"></div>
        </ReaderContainer>
    );
};

export default QRCodeScanner;
