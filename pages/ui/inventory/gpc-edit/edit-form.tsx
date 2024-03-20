'use client'
import { CreateList } from '@/pages/lib/definition';
import { useFormState } from 'react-dom';
import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/router';
import errorMap from 'zod/locales/en.js';

interface FormProps {
  gettableName: string;
  id: number;
  onDataSubmitted: () => void; // Callback function to handle data submissio
}

export default function Form({ gettableName, onDataSubmitted, id}: FormProps) {
  console.log(gettableName);
  const [formData, setFormData] = useState({
    pcname: '',
    macaddress: '',
    computerType: '',
    specs: '',
    supplier: '',
    date: ''
  });
  const [uid, setId] = useState('');
  const [pcName, setPCName] = useState('');
  const [macaddress, setMacAddress] = useState('');
  const [computerType, setComputerType] = useState('');
  const [specs, setSpecs] = useState('');
  const [supplier, setSupplier] = useState('');
  const [datePurchased, setDatePurchased] = useState('')
  
  useEffect(() => {
    async function fetchInventoryItem() {
      try {
        const res = await fetch(`http://localhost:3000/api/${gettableName}/${id}`);
        const data = await res.json();
        console.log("result of fetch", data)
        setPCName(data.pc_name);
      } catch(error) {
        console.error('Error fetching inventory item:', error)
      }
    }
    fetchInventoryItem()
  }, [gettableName, id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  async function addInventory(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const postInventory = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pc_name: formData.pcname,
          mac_address: formData.macaddress,
          computer_type: formData.computerType,
          specs: formData.specs,
          supplier: formData.supplier,
          date_purchased: formData.date,
          tableName: gettableName
        }),
      };
      const res = await fetch(`http://localhost:3000/api/${gettableName}`, postInventory);
      const response = await res.json();
      if (response.response.message === "success") {
        setFormData({
          pcname: '',
          macaddress: '',
          computerType: '',
          specs: '',
          supplier: '',
          date: ''
        });
        onDataSubmitted();
      }
    } catch (error) {
      console.error('Error adding inventory:', error);
    }
  }
  return (
    <form onSubmit={addInventory}>
      <div className="p-4 rounded-md bg-gray-50 md:p-6">
        <div className="mb-4">
          <label htmlFor="pcname" className="block mb-2 text-sm font-medium">
            PC Name
          </label>
          <input
            type="text"
            id="pcname"
            name="pcname"
            value="pcName"
            // onChange={handleChange}
            className="block w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500"
            placeholder="Enter PC Name"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="macaddress" className="block mb-2 text-sm font-medium">
            Mac Address
          </label>
          <input
            type="text"
            id="macaddress"
            name="macaddress"
            value={formData.macaddress}
            onChange={handleChange}
            className="block w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500"
            placeholder="Enter Mac Address"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="computerType" className="block mb-2 text-sm font-medium">
            Computer Type
          </label>
          <input
            type="text"
            id="computerType"
            name="computerType"
            value={formData.computerType}
            onChange={handleChange}
            className="block w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500"
            placeholder="Enter Computer Type"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="specs" className="block mb-2 text-sm font-medium">
            Specs
          </label>
          <textarea
            id="specs"
            name="specs"
            value={formData.specs}
            onChange={handleChange}
            className="block w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500"
            placeholder="Enter Specs"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="computerType" className="block mb-2 text-sm font-medium">
            Supplier
          </label>
          <input
            type="text"
            id="supplier"
            name="supplier"
            value={formData.supplier}
            onChange={handleChange}
            className="block w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500"
            placeholder="Enter Supplier"
          />
        </div>
        <div className="mb-4">
        <label htmlFor="date" className="block mb-2 text-sm font-medium">
          Date Purchased
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="block w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500"
        />
      </div>
      </div>
      <div className="flex justify-end gap-4 mt-6">
        <button
          type="submit"
          
          className="flex items-center justify-center h-10 px-4 text-sm font-medium text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
          Save
        </button>
      </div>
    </form>
  );
}
