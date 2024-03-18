
'use client'
import { useEffect } from "react";
import { useState } from "react";
import { InventoryList } from "@/pages/lib/definition";

interface GPCInventoryTableProps {
  gettableName: string;
  onDataSubmitted: () => void;
}

export default function GPCInventoryTable ({gettableName, onDataSubmitted}:GPCInventoryTableProps){
  const [inventories, setInventories] = useState<InventoryList[]>([]);

  useEffect(() => {
    async function fetchInventoryData() {
      try {
        const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_URL}/api/${gettableName}`;
        const response = await fetch(apiUrlEndpoint);
        const data = await response.json();
        setInventories(data.results);
      } catch (error) {
        console.error('Error fetching inventory data:', error);
      }
    }
    
    fetchInventoryData();
  }, [gettableName, onDataSubmitted]);
    return (  
    <div className="flow-root mt-6">
      <div className="inline-block min-w-full align-middle">
        <div className="p-2 rounded-lg bg-gray-50 md:pt-0">
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
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Action</span>
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
                    <div className="flex justify-end gap-3">
                      
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>     
    )
}

