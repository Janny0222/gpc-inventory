import React, { FormEvent, useState, useEffect } from 'react';

interface ModalProps {
  onClose: () => void;
  onSubmit: () => void;
  id: number | null;
  tablename: string;
  
}



const EditMobileModal: React.FC<ModalProps> = ({onClose, onSubmit, tablename, id}) => {
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
  // handle for changing the value in inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  // handle for getting the specific data in database using the unique id
  
  useEffect(() => {
    async function fetchInventoryItem() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/${tablename}/${id}`);
        if(!res.ok){
          throw new Error('Failed to fetch inventory item')
        }
        const data = await res.json();
        console.log(data.results)
        setFormData(data.results[0])
      } catch(error) {
        console.error('Error fetching inventory item:', error)
      }
    }
    fetchInventoryItem()
  }, [tablename, id])

  // this function to be called upon clicking the save button in edit modal and automaticall save in the database and show in the table
  
  async function updateInventory(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const formattedDate = formData.date_issued ? new Date(formData.date_issued).toLocaleDateString('en-US', {month: '2-digit', day: '2-digit', year: 'numeric'}): ''
      const putInventory = {
        method: "PUT",
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/${tablename}/cellphones/${id}`, putInventory);
      if(!res.ok){
        throw new Error('Failed to update inventory')
      }
      const response = await res.json();
      if (response.response.message === "success") {
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
        onSubmit();
        
      }
    } catch (error) {
      console.error('Error adding inventory:', error);
    }
  }

  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="relative w-full max-w-lg mx-auto my-6">
        <div className="relative flex flex-col w-full bg-white rounded-lg shadow-lg outline-none focus:outline-none">
          <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
            
            <h3 className="text-3xl font-semibold">Edit</h3>
            <button
              className="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none focus:outline-none"
              onClick={onClose}
            >
              <span className="block w-6 h-6 text-2xl text-black outline-none focus:outline-none">×</span>
            </button>
            
          </div>
          <div className="flex-auto p-6">
          <form onSubmit={updateInventory}>
          
            <div className="p-4 rounded-md bg-gray-50 md:p-6">
              <div className="mb-4">
                <label htmlFor="assigned_to" className="block mb-2 text-sm font-medium">
                  Assiged To
                </label>
                <input
                  type="text"
                  id="assigned_to"
                  name="assigned_to"
                  value={formData.assigned_to}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500"
                  placeholder="Enter Assigned To"
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
                  placeholder="Enter Department"
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
                  placeholder="Enter Brand"
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
                  placeholder="Enter Model / Specs"
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
                  placeholder="Enter IMEI"
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
                  placeholder="Enter Serial Number"
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
                  placeholder="Enter Inclusion"
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditMobileModal;
