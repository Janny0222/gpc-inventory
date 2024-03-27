'use client'
import { useState, useEffect, FormEvent } from 'react';


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
    serial_number: '',
    inclusion: '',
    date_issued: ''
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
        serial_number: formData.serial_number,
        inclusion: formData.inclusion,
        date_issued: formData.date_issued,
          // tableName: gettableName
        }),
      };
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/${gettableName}/cellphones`, postInventory);
      const response = await res.json();
      if (response && response.response && response.response.message === "success") {
        setFormData({
        assigned_to: '',
        department: '',
        brand: '',
        model_specs: '',
        imei: '',
        serial_number: '',
        inclusion: '',
        date_issued: ''
        });
        console.log("successfully trigger");
        onDataSubmitted();
      }
    } catch (error) {
      console.error('Error adding inventory:', error);
    }
  }

  return (
    <form onSubmit={addMobileInventory}>
      <div className="p-4 rounded-md bg-gray-50 md:p-6">
        <div className="mb-4">
          <label htmlFor="assigned_to" className="block mb-2 text-sm font-medium">
            Assigned To
          </label>
          <input
            type="text"
            id="assigned_to"
            name="assigned_to"
            value={formData.assigned_to}
            onChange={handleChange}
            className="block w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500"
            placeholder="Enter PC Name"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="department" className="block mb-2 text-sm font-medium">
            Department
          </label>
          <input
            type="text"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="block w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500"
            placeholder="Enter Mac Address"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="brand" className="block mb-2 text-sm font-medium">
            Brand
          </label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="block w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500"
            placeholder="Enter Computer Type"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="model_specs" className="block mb-2 text-sm font-medium">
            Model / Specs
          </label>
          <textarea
            id="model_specs"
            name="model_specs"
            value={formData.model_specs}
            onChange={handleChange}
            className="block w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500"
            placeholder="Enter Specs"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="imei" className="block mb-2 text-sm font-medium">
            IMEI
          </label>
          <input
            type="text"
            id="imei"
            name="imei"
            value={formData.imei}
            onChange={handleChange}
            className="block w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500"
            placeholder="Enter Supplier"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="serial_number" className="block mb-2 text-sm font-medium">
            Serial Number
          </label>
          <input
            type="text"
            id="serial_number"
            name="serial_number"
            value={formData.serial_number}
            onChange={handleChange}
            className="block w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500"
            placeholder="Enter Supplier"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="inclusion" className="block mb-2 text-sm font-medium">
            Inclusion
          </label>
          <input
            type="text"
            id="inclusion"
            name="inclusion"
            value={formData.inclusion}
            onChange={handleChange}
            className="block w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500"
            placeholder="Enter Supplier"
          />
        </div>
        <div className="mb-4">
        <label htmlFor="date_issued" className="block mb-2 text-sm font-medium">
          Date Issued
        </label>
        <input
          type="date"
          id="date_issued"
          name="date_issued"
          value={formData.date_issued}
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
