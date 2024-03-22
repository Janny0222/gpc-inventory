import React, { FormEvent, useState, useEffect } from 'react';

interface ModalProps {
  onClose: () => void;
  onSubmit: () => void;
  id: number | null;
  tablename: string;
  initialValues: Record<string, string>;
}



const EditMobileModal: React.FC<ModalProps> = ({onClose, onSubmit, initialValues, tablename, id}) => {
  const [formData, setFormData] = useState({
    pc_name: '',
    mac_address: '',
    computer_type: '',
    specs: '',
    supplier: '',
    date_purchased: ''
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
  useEffect(() => {
    fetchInventoryItem()
  }, [tablename, id])

  // this function to be called upon clicking the save button in edit modal and automaticall save in the database and show in the table
  
  async function updateInventory(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const putInventory = {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pc_name: formData.pc_name,
          mac_address: formData.mac_address,
          computer_type: formData.computer_type,
          specs: formData.specs,
          supplier: formData.supplier,
          date_purchased: formData.date_purchased,
          // tableName: gettableName
        }),
      };
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/${tablename}/${id}`, putInventory);
      if(!res.ok){
        throw new Error('Failed to update inventory')
      }
      const response = await res.json();
      if (response.response.message === "success") {
        setFormData({
          pc_name: '',
          mac_address: '',
          computer_type: '',
          specs: '',
          supplier: '',
          date_purchased: ''
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
                <label htmlFor="pc_name" className="block mb-2 text-sm font-medium">
                  PC Name
                </label>
                <input
                  type="text"
                  id="pc_name"
                  name="pc_name"
                  value={formData.pc_name}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500"
                  placeholder="Enter PC Name"
                />
              </div>
      
              <div className="mb-4">
                <label htmlFor="mac_address" className="block mb-2 text-sm font-medium">
                  Mac Address
                </label>
                <input
                  type="text"
                  id="mac_address"
                  name="mac_address"
                  value={formData.mac_address}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500"
                  placeholder="Enter Mac Address"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="computer_type" className="block mb-2 text-sm font-medium">
                  Computer Type
                </label>
                <input
                  type="text"
                  id="computer_type"
                  name="computer_type"
                  value={formData.computer_type}
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
                <label htmlFor="supplier" className="block mb-2 text-sm font-medium">
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
              <label htmlFor="date_purchased" className="block mb-2 text-sm font-medium">
                Date Purchased
              </label>
              <input
                type="date"
                id="date_purchased"
                name="date_purchased"
                value={formData.date_purchased}
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
