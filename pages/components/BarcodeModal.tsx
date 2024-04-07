import React, { FormEvent, useState, useEffect } from 'react';
import QRCodeGenerator from './QRCodeGenerator';

interface ModalProps {
    onClose: () => void;
    id: number | null;
    tablename: string;
    company: string
  }

const BarcodeModal: React.FC<ModalProps> = ({id, tablename, onClose, company}) => {
    const [formData, setFormData] = useState({
        pc_name: '',
        mac_address: '',
        computer_type: '',
        specs: '',
        supplier: '',
        date_purchased: ''
      });
useEffect(() => {
        async function fetchInventoryItem() {
          try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/${tablename}/${id}`);
            if(!res.ok){
              throw new Error('Failed to fetch inventory item')
            }
            const data = await res.json();
           
            setFormData(data.results[0])
          } catch(error) {
            console.error('Error fetching inventory item:', error)
          }
        }
        fetchInventoryItem()
      }, [tablename, id])
return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="relative w-full max-w-lg mx-auto my-6">
        <div className="relative flex flex-col w-full bg-white rounded-lg shadow-lg outline-none focus:outline-none">
          <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
            
            <h3 className="text-3xl font-semibold">QR</h3>
            <button
              className="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none focus:outline-none"
              onClick={onClose}
            >
            <span className="block w-6 h-6 text-2xl text-black outline-none focus:outline-none">×</span>
            </button>
            
          </div>
        <div className="flex flex-row p-4 ">
            <div className='p2'>
                <QRCodeGenerator pc_name={formData.pc_name} mac_address={formData.mac_address} specs={formData.specs}/>
            </div>
            <div className='ml-8 flex flex-col text-sm'>
                <span><strong>Company: </strong> {company}</span>
                <span><strong>PC Name: </strong> {formData.pc_name}</span>
                <span><strong>MacAddress: </strong> {formData.mac_address}</span>
                <span><strong>PC Specs: </strong> {formData.specs?.split(",").map((specs, index) => (
                      index > 0 && (
                        <div key={index}>
                          {specs.trim()}
                        </div>
                      )
                    ))}</span>
                 
            </div>
          </div>
        </div>
      </div>
    </div>
)
};

export default BarcodeModal;
