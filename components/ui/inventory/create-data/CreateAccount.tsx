'use client'
import { useState, useEffect, FormEvent } from 'react';
import toast from 'react-hot-toast';
import Status from '../../dropdowns/status';

interface FormProps {
  gettableName: string;
  onDataSubmitted: () => void; // Callback function to handle data submission
}

export default function Form({ gettableName, onDataSubmitted }: FormProps) {
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [getValue, setGetValue] = useState('');
  const [errorMessage, setErrorMessage] = useState("");
  const [status, setStatus] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    username: '',
    password: '',
    is_active_id: '',
    notes: ''
  });
  // const [create, setCreated] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
   
  };
  const statusChange = (value: string) => {
    setGetValue(value)
    if(value === '1') {
      setStatus('1')
    } else {
      setStatus('2')
    }
  }
  
  async function addMobileInventory(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const addToastLoading = toast.loading('Adding new data. Please wait...', {duration: 3500, position: "top-center"})
    try {
      const addAccounts = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        name: formData.name,
        department: formData.department,
        username: formData.username,
        password: formData.password,
        is_active_id: status,
        notes: formData.notes,
          // tableName: gettableName
        }),
      };
      const res = await fetch(`/api/${gettableName}/accounts`, addAccounts);
      const response = await res.json();
      if (response && response.response && response.response.message === "success") {
        setTimeout(() => {
          setFormData({
          name: '',
          department: '',
          username: '',
          password: '',
          is_active_id: '',
          notes: '',
          });
          onDataSubmitted();
          toast.success("Data has been successfully added", {id: addToastLoading});
        }, 3000)
        
      } else {
        toast.error('Unable to add new data', {id: addToastLoading})
      }
    } catch (error) {
      console.error('Error adding inventory:', error);
      toast.error('Unable to add new data')
    }
  }

  return (
    <form onSubmit={addMobileInventory}>
      <div className="p-4 rounded-md grid grid-cols-6 border-2 border-x-gray-400 shadow-2xl mx-2 gap-1 bg-gray-200">
       
        {/* Name */}
        <div className="mb-4 col-span-4">
          <label htmlFor="name" className="block mb-2 text-sm font-semibold">
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

        {/* Username */}
        <div className="mb-4 col-span-2">
          <label htmlFor="username" className="block mb-2 text-sm font-semibold">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="block w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-black shadow-md"
            placeholder="Enter Username"
          />
        </div>
        {/* Brand */}
        <div className="mb-4 col-span-2">
          <label htmlFor="password" className="block mb-2 text-sm font-semibold">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="block w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-black shadow-md"
            placeholder="Enter Password"
          />
        </div>
        {/* Status */}
        <div className="mb-4 col-span-2">
          <label htmlFor="" className="block mb-2 text-sm font-semibold">
            Status
          </label>
          <Status onStatusChange={statusChange} value={getValue}/>
           {/* {isDuplicate && (
            <span className='text-red-700 text-sm'>{errorMessage} Department</span>
          )} */}
        </div>

        {/* Email and Password */}
        <div className="mb-4 col-span-3">
          <label htmlFor="notes" className="block mb-2 text-sm font-semibold">
            Notes
          </label>
          <input
            type="text"
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="block w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-black shadow-md"
            placeholder="Add Notes"
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
