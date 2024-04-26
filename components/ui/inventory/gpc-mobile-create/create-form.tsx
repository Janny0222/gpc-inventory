'use client'
import { useState, useEffect, FormEvent } from 'react';
import toast from 'react-hot-toast';

interface FormProps {
  gettableName: string;
  onDataSubmitted: () => void; // Callback function to handle data submission
}

export default function Form({ gettableName, onDataSubmitted }: FormProps) {
  
  const [formData, setFormData] = useState({
    assigned_to: '',
    department: '',
    brand: '',
    model_specs: '',
    imei: '',
    number: '',
    email_password: '',
    serial_number: '',
    inclusion: '',
    date_issued: '',
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
  
  async function addMobileInventory(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const addToastLoading = toast.loading('Adding new data. Please wait...', {duration: 3500, position: "top-center"})
    try {
      const postInventory = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        assigned_to: formData.assigned_to,
        department: formData.department,
        brand: formData.brand,
        model_specs: formData.model_specs,
        imei: formData.imei,
        number: formData.number,
        email_password: formData.email_password,
        serial_number: formData.serial_number,
        inclusion: formData.inclusion,
        date_issued: formData.date_issued,
        date_purchased: formData.date_purchased
          // tableName: gettableName
        }),
      };
      const res = await fetch(`/api/${gettableName}/cellphones`, postInventory);
      const response = await res.json();
      if (response && response.response && response.response.message === "success") {
        
        setFormData({
        assigned_to: '',
        department: '',
        brand: '',
        model_specs: '',
        imei: '',
        number: '',
        email_password: '',
        serial_number: '',
        inclusion: '',
        date_issued: '',
        date_purchased: ''
        });
        setTimeout(() => {
          onDataSubmitted();
          toast.success("Data has been successfully added", {id: addToastLoading});
        }, 3000)
        
      }
    } catch (error) {
      console.error('Error adding inventory:', error);
      toast.error('Unable to add new data')
    }
  }

  return (
    <form onSubmit={addMobileInventory}>
      <div className="p-4 rounded-md grid grid-cols-6 border-2 border-x-gray-400 shadow-2xl mx-2 gap-1 bg-gray-200">
       
        {/* Assigned To */}
        <div className="mb-4 col-span-4">
          <label htmlFor="assigned_to" className="block mb-2 text-sm font-semibold">
            Assigned To
          </label>
          <input
            type="text"
            id="assigned_to"
            name="assigned_to"
            value={formData.assigned_to}
            onChange={handleChange}
            className="block w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-black shadow-md"
            placeholder="Enter Assigned To"
          />
        </div>
        {/* Department */}
        <div className="mb-4 col-span-2">
          <label htmlFor="department" className="block mb-2 text-sm font-semibold">
            Department
          </label>
          <input
            type="text"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="block w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-black shadow-md"
            placeholder="Enter Department"
          />
        </div>

        {/* Contact Number */}
        <div className="mb-4 col-span-2">
          <label htmlFor="number" className="block mb-2 text-sm font-semibold">
            Number
          </label>
          <input
            type="text"
            id="number"
            name="number"
            value={formData.number}
            onChange={handleChange}
            className="block w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-black shadow-md"
            placeholder="Enter Number"
          />
        </div>
        {/* Brand */}
        <div className="mb-4 col-span-2">
          <label htmlFor="brand" className="block mb-2 text-sm font-semibold">
            Brand
          </label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="block w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-black shadow-md"
            placeholder="Enter Brand"
          />
        </div>
        {/* Serial Number */}
        <div className="mb-4 col-span-2">
          <label htmlFor="serial_number" className="block mb-2 text-sm font-semibold">
            Serial Number
          </label>
          <input
            type="text"
            id="serial_number"
            name="serial_number"
            value={formData.serial_number}
            onChange={handleChange}
            className="block w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-black shadow-md"
            placeholder="Enter Serial Number"
          />
        </div>

        {/* Email and Password */}
        <div className="mb-4 col-span-3">
          <label htmlFor="email_password" className="block mb-2 text-sm font-semibold">
            Email and Password
          </label>
          <input
            type="text"
            id="email_password"
            name="email_password"
            value={formData.email_password}
            onChange={handleChange}
            className="block w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-black shadow-md"
            placeholder="Enter Serial Number"
          />
        </div>
        {/* IMEI */}
        <div className="mb-4 col-span-3">
          <label htmlFor="imei" className="block mb-2 text-sm font-semibold">
            IMEI
          </label>
          <textarea
            id="imei"
            name="imei"
            value={formData.imei}
            onChange={handleChange}
            className="block w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-black shadow-md"
            placeholder="Enter IMEI"
          />
        </div>
        
        {/* Inclusion */}
        <div className="mb-4 col-span-3">
          <label htmlFor="inclusion" className="block mb-2 text-sm font-semibold">
            Inclusion
          </label>
          <textarea
            id="inclusion"
            name="inclusion"
            value={formData.inclusion}
            onChange={handleChange}
            className="block w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-black shadow-md"
            placeholder="Enter Inclusion"
          />
        </div>

        {/* Model Specs */}
        <div className="mb-4 col-span-3">
          <label htmlFor="model_specs" className="block mb-2 text-sm font-semibold">
            Model / Specs
          </label>
          <textarea
            id="model_specs"
            name="model_specs"
            value={formData.model_specs}
            onChange={handleChange}
            className="block w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-black shadow-md"
            placeholder="Enter Specs"
          />
        </div>
        {/* Date Issued */}
        <div className="mb-4 col-span-3">
          <label htmlFor="date_issued" className="block mb-2 text-sm font-semibold">
            Date Issued
          </label>
          <input
            type="date"
            id="date_issued"
            name="date_issued"
            value={formData.date_issued}
            onChange={handleChange}
            className="block w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-black shadow-md"
          />
        </div>
        {/* Date Purchased */}
        <div className="mb-4 col-span-3">
          <label htmlFor="date_purchased" className="block mb-2 text-sm font-semibold">
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
      <div className="flex justify-end py-2 mt-2">
          <button
            type="submit"
            className="flex items-center justify-center h-10 px-4 text-sm font-medium text-white transition-colors border-4 hover:border-black bg-black rounded-lg hover:text-green-800 hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 "
            >
            Save
          </button>
        </div>
    </form>
  );
}
