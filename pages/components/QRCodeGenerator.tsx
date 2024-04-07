import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode.react';

interface Props {
    pc_name: string;
    mac_address: string;
    specs: string;
}

const QRCodeGenerator: React.FC<Props> = ({ pc_name, mac_address, specs }) => {
    const qrCodeValue: string = `${pc_name}\n${mac_address}\n${specs}`;
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');

            // Clear the canvas
            context?.clearRect(0, 0, canvas.width, canvas.height);

            // Render QR code as SVG
            const svgElement = document.querySelector('svg[data-testid="qr-code-svg"]');
            if (svgElement) {
                const svgString = new XMLSerializer().serializeToString(svgElement);
                const image = new Image();

                // Draw QR code SVG onto canvas
                image.onload = () => {
                    canvas.width = image.width;
                    canvas.height = image.height;
                    context?.drawImage(image, 0, 0);
                };

                image.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString);
            }
        }
    }, []);

    const handleSaveAsImage = () => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const imageUrl = canvas.toDataURL('image/png');

            const link = document.createElement('a');
            link.href = imageUrl;
            link.download = `${pc_name}-qr_code.png`;
            link.click();
        }
    };

    return (
        <div className='bg-white p-4 rounded-lg shadow-md'>
            <QRCode value={qrCodeValue} data-testid="qr-code-svg" />
            <button onClick={handleSaveAsImage}>Save as Image</button>
            <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
    );
};

export default QRCodeGenerator;
