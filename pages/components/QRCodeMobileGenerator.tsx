import React, { useEffect, useRef } from 'react';
import QRCode from 'react-qr-code';
import html2canvas from 'html2canvas';

interface Props {
    assigned_to: string;
    imei: string;
    model_specs: string;
}

const QRCodeMobileGenerator: React.FC<Props> = ({ assigned_to, imei, model_specs }) => {
    const qrCodeValue: string = `Assigned To: ${assigned_to}\n IMEI: ${imei}\n Model / Specs: ${model_specs}`;
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
        }, 2000); // Set a delay of 1 second

        return () => clearTimeout(timer);
    }, [assigned_to]); // Runs only once after component mounted

    return (
        <div ref={qrCodeRef} className='p-4 bg-white rounded-lg shadow-md'>
            <QRCode value={qrCodeValue} data-testid="qr-code-svg" />
        </div>
    );
};

export default QRCodeMobileGenerator;