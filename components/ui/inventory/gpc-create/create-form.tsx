'use client'

import { useState, useEffect, FormEvent } from 'react';
import { date } from 'zod';


interface FormProps {
  gettableName: string;
  onDataSubmitted: () => void; // Callback function to handle data submission
}

export default function Form({ gettableName, onDataSubmitted }: FormProps) {
  console.log("This is from create-form", gettableName)
  const [formData, setFormData] = useState({
    pcname: '',
    name: '',
    ip_address: '',
    mac_address: '',
    computer_type: '',
    monitor: '',
    department: '',
    specs: '',
    anydesk: '',
    supplier: '',
    comment: '',
    date_purchased: ''
  });
  // const [create, setCreated] = useState(false);
  
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
          name: formData.name,
          mac_address: formData.mac_address,
          ip_address: formData.ip_address,
          computer_type: formData.computer_type,
          monitor: formData.monitor,
          specs: formData.specs,
          department: formData.department,
          anydesk: formData.anydesk,
          supplier: formData.supplier,
          comment: formData.comment,
          date_purchased: formData.date_purchased
          
          // tableName: gettableName
        }),
      };
      const res = await fetch(`http://localhost:3000/api/${gettableName}`, postInventory);
      const response = await res.json();
      if (response && response.response && response.response.message === "success") {
        setFormData({
          pcname: '',
          name: '',
          ip_address: '',
          mac_address: '',
          computer_type: '',
          monitor: '',
          department: '',
          specs: '',
          anydesk: '',
          supplier: '',
          comment: '',
          date_purchased: ''
        });
        onDataSubmitted();
        console.log("successfully trigger");
      }
    } catch (error) {
      console.error('Error adding inventory:', error);
    }
  }

  return (
    <form onSubmit={addInventory}>
      <div className="p-4 rounded-md grid grid-cols-6 gap-2 shadow-lg border bg-gray-100 md:p-6">

        {/* Name */}
        <div className="mb-4 col-span-4">
          <label htmlFor="name" className="block mb-2 text-sm font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="block w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-black shadow-md"
            placeholder="Enter Name"
            required
          />
        </div>

        {/* Department */}
        <div className="mb-4 col-span-2">
          <label htmlFor="department" className="block mb-2 text-sm font-medium">
            Department
          </label>
          <input
            type="text"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="block w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-black shadow-md"
            placeholder="Enter department"
          />
        </div>

        {/* PC Name */}
        <div className="mb-4 col-span-2">
          <label htmlFor="pcname" className="block mb-2 text-sm font-medium">
            PC Name
          </label>
          <input
            type="text"
            id="pcname"
            name="pcname"
            value={formData.pcname}
            onChange={handleChange}
            className="block w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-black shadow-md"
            placeholder="Enter PC Name"
          />
        </div>

        {/* IP Address*/}
        <div className="mb-4 col-span-2">
          <label htmlFor="ip_address" className="block mb-2 text-sm font-medium">
            IP Address
          </label>
          <input
            type="text"
            id="ip_address"
            name="ip_address"
            value={formData.ip_address}
            onChange={handleChange}
            className="block w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-black shadow-md"
            placeholder="Enter IP Address"
          />
        </div>
        {/* Mac Address */}
        <div className="mb-4 col-span-2">
          <label htmlFor="mac_address" className="block mb-2 text-sm font-medium">
            Mac Address
          </label>
          <input
            type="text"
            id="mac_address"
            name="mac_address"
            value={formData.mac_address}
            onChange={handleChange}
            className="block w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-black shadow-md"
            placeholder="Enter Mac Address"
          />
        </div>
        {/* Monitor */}
        <div className="mb-4 col-span-2">
          <label htmlFor="monitor" className="block mb-2 text-sm font-medium">
            Monitor
          </label>
          <input
            type="text"
            id="monitor"
            name="monitor"
            value={formData.monitor}
            onChange={handleChange}
            className="block w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-black shadow-md"
            placeholder="Enter Monitor"
          />
        </div>
        {/* Anydesk */}
        <div className="mb-4 col-span-2">
          <label htmlFor="anydesk" className="block mb-2 text-sm font-medium">
            Anydesk
          </label>
          <input
            type="text"
            id="anydesk"
            name="anydesk"
            value={formData.anydesk}
            onChange={handleChange}
            className="block w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-black shadow-md"
            placeholder="Enter Anydesk"
          />
        </div>
        {/* Supplier */}
        <div className="mb-4 col-span-2">
          <label htmlFor="supplier" className="block mb-2 text-sm font-medium">
            Supplier
          </label>
          <input
            type="text"
            id="supplier"
            name="supplier"
            value={formData.supplier}
            onChange={handleChange}
            className="block w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-black shadow-md"
            placeholder="Enter Supplier"
          />
        </div>
        {/* Computer Type */}
        <div className="mb-4 col-span-3">
          <label htmlFor="computer_type" className="block mb-2 text-sm font-medium">
            Computer Type
          </label>
          <input
            type="text"
            id="computer_type"
            name="computer_type"
            value={formData.computer_type}
            onChange={handleChange}
            className="block w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-black shadow-md"
            placeholder="Enter Computer Type"
          />
        </div>
        {/* Specs */}
        <div className="mb-4 col-span-3">
          <label htmlFor="specs" className="block mb-2 text-sm font-medium">
            Specs
          </label>
          <textarea
            id="specs"
            name="specs"
            value={formData.specs}
            onChange={handleChange}
            className="block w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-black shadow-md"
            placeholder="Enter Specs"
          />
        </div>
        {/* Comments */}
        <div className="mb-4 col-span-6">
          <label htmlFor="comments" className="block mb-2 text-sm font-medium">
            Comments
          </label>
          <textarea
            id="comments"
            name="comments"
            value={formData.comment}
            onChange={handleChange}
            className="block w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-black shadow-md"
            placeholder="Enter Specs"
          />
        </div>
        {/* Date Purchased */}
        <div className="mb-4 col-span-6">
        <label htmlFor="date_purchased" className="block mb-2 text-sm font-medium">
          Date Purchased
        </label>
        <input
          type="date"
          id="date_purchased"
          name="date_purchased"
          value={formData.date_purchased}
          onChange={handleChange}
          className="block w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-black shadow-md"
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
