import React, { useEffect, useRef } from 'react';
import QRCode from 'react-qr-code';
import html2canvas from 'html2canvas';

interface Props {
    assigned_to: string;
    department: string;
    imei: string;
    serial_number: string;
}

const QRCodeMobileGenerator: React.FC<Props> = ({ assigned_to, department, imei, serial_number }) => {
    const qrCodeValue: string = `Department: ${department}\n${imei}\nSerial Number: ${serial_number}`;
    const qrCodeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (qrCodeRef.current) {
                html2canvas(qrCodeRef.current)
                    .then((canvas) => {
                        const dataUrl = canvas.toDataURL('image/png');
                        const link = document.createElement('a');
                        link.href = dataUrl;
                        link.download = `${assigned_to}-qr_code.png`;
                        link.click();
                    })
                    .catch((error) => {
                        console.error('Error generating QR code image:', error);
                    });
            }
        }, 500); 

        return () => clearTimeout(timer);
    }, [assigned_to]); 

    return (
        <div ref={qrCodeRef} className='p-1 bg-white rounded-lg shadow-md'>
            <QRCode value={qrCodeValue} size={99.9} data-testid="qr-code-svg" />
        </div>
    );
};

export default QRCodeMobileGenerator;