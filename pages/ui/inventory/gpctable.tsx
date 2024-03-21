
'use client'
import { ChangeEvent, useEffect } from "react";
import { useState } from "react";
import { InventoryList } from "@/pages/lib/definition";
import { UpdateInventory } from "../buttons";
import { tableName } from "@/pages/lib/company";
import Form from "./gpc-create/create-form";
import EditModal from "@/pages/components/editmodal";
import { CreateInventory } from "../buttons";
import { useSearchParams } from "next/navigation";

interface GPCInventoryTableProps {
  gettableName: string;
  onDataSubmitted: () => void;
  query: string;
  
}

export default function GPCInventoryTable ({gettableName, onDataSubmitted, query}:GPCInventoryTableProps){
  const [inventories, setInventories] = useState<InventoryList[]>([]);
  const [filteredInventories, setFilteredInventories] = useState<InventoryList[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [specificData, setSpecificData] = useState<any>(null)
  const [editName, setEditName] = useState("")
  
  const getquery = new URLSearchParams(window.location.search)
  const queryvalue = getquery.get('query')
  console.log(queryvalue)

  
  // Fetching the data from database
  useEffect(() => {
    async function fetchInventoryData() {
      try {
        if(queryvalue) {
          const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_URL}/api/${gettableName}?&query=${queryvalue}`;
          const response = await fetch(apiUrlEndpoint);
          const data = await response.json();
          setInventories(data.results);
        } else {
          const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_URL}/api/${gettableName}`;
          const response = await fetch(apiUrlEndpoint);
          const data = await response.json();
          setInventories(data.results);
        }
        
        
      } catch (error) {
        console.error('Error fetching inventory data:', error);
      }
    }
    fetchInventoryData();
  }, [gettableName, onDataSubmitted, query]);
  // Getting the specific display name
  let name = tableName.find(company => company.name === gettableName)?.displayName || gettableName


  // modal for edit
  const openModal = async (id: number) =>{
    setSelectedId(id);
    setIsModalOpen(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/${gettableName}/${id}`)
        if(!res.ok){
          throw new Error('Failed to fetch inventory item');
        }
        const data = await res.json();
        setSpecificData(data.results[0]);
        setEditName(data.results[0].pc_name)
    } catch (error){
      console.error('Error fetching inventory item:', error)
    }
  
  }
  const closeModal = () => {
      setIsModalOpen(false)
      setSelectedId(null)
  }
  const handleFormSubmit = async () =>{
    closeModal();
    
    await getPageData();
  }
  const getPageData = async () => {
    try {
        const pageData = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }
        const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_URL}/api/${gettableName}`;
        const response = await fetch(apiUrlEndpoint, pageData);
        const res = await response.json();

        setInventories(res.results);
    } catch (error) {
        console.error('Error fetching inventory data:', error);
    }
  }
    return (  
    <div className="overflow-x-auto sm:p-2">
      <div className="inline-block min-w-full align-middle">
        <div className="p-2 rounded-lg bg-table md:pt-0">
        <table className="min-w-full text-gray-900 md:table">
            <thead className="text-sm font-normal text-left rounded-lg">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  PC Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Mac Address
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Computer Type
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Specs
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Supplier
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date Purchased
                </th>
                <th scope="col" className="py-3 pl-6 pr-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {inventories?.map((inventory) => (
                <tr key={inventory.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="py-3 pl-6 pr-3 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <p>{inventory.pc_name}</p>
                      
                    </div>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    {inventory.mac_address}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    {inventory.computer_type}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    {inventory.specs}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    {inventory.supplier}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    {inventory.date_purchased}
                  </td>
                  <td className="py-3 pl-6 pr-3 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <UpdateInventory id={inventory.id} onClick={openModal}/>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {isModalOpen && (
                        <EditModal onClose={closeModal} onSubmit={handleFormSubmit} id={selectedId} tablename={gettableName} initialValues={specificData}/>
                          
                    )}
        </div>
      </div>
    </div>     
    )
}

