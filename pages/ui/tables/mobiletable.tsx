'use client'
import { MobileInventoryList } from "@/pages/lib/definition"
import { useEffect, useState } from "react"


interface MobileInventoryProps {
    getTableName: string,
}

export default function GPCMobileInventory ({getTableName}: MobileInventoryProps) {

    const [mobileInventory, setMobileInventory] = useState<MobileInventoryList[]>([])
    
    useEffect(() => {
        async function fetchMobileInventory () {
            try {
                const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_URL}/api/${getTableName}/cellphones`
                const response = await fetch(apiUrlEndpoint);
                const data = await response.json();
                setMobileInventory(data.results)
            } catch (error) {
                console.error('Error fetching data', error)
            }
        }
        fetchMobileInventory()
    }, [getTableName])
       return (  
        <div className="overflow-x-auto sm:p-2">
          <div className="inline-block min-w-full align-middle">
            <div className="p-2 rounded-lg bg-table md:pt-0">
              <table className="min-w-full text-gray-900 md:table">
                <thead className="text-sm font-normal text-left rounded-lg">
                  <tr>
                    <th scope="col" className="px-4 py-1font-medium sm:pl-6">
                      Assigned To
                    </th>
                    <th scope="col" className="px-3 py-1font-medium">
                      Department
                    </th>
                    <th scope="col" className="px-3 py-1font-medium">
                      Brand
                    </th>
                    <th scope="col" className="px-3 py-1font-medium">
                      Model / Specs
                    </th>
                    <th scope="col" className="px-3 py-1font-medium">
                      IMEI
                    </th>
                    <th scope="col" className="px-3 py-1font-medium">
                      Serial Number
                    </th>
                    <th scope="col" className="px-3 py-1font-medium">
                      Inclusion
                    </th>
                    <th scope="col" className="px-3 py-1font-medium">
                      Date Issued
                    </th>
                    <th scope="col" className="py-3 pl-6 pr-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {mobileInventory?.map((inventory) => (
                    <tr key={inventory.id}
                      className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                    >
                      <td className="py-3 pl-6 pr-3 whitespace-nowrap">
                          <p>{inventory.assigned_to}</p>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        {inventory.department}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        {inventory.brand}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        {inventory.model_specs}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        {inventory.imei}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        {inventory.serial_number}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        {inventory.inclusion}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        {inventory.date_issued}
                      </td>
                      <td className="py-3 pl-6 pr-3 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          {/* <UpdateInventory id={inventory.id} onClick={openModal}/> */}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* {isModalOpen && (
                            <EditModal onClose={closeModal} onSubmit={handleFormSubmit} id={selectedId} tablename={gettableName} initialValues={specificData}/>
                              
                        )} */}
            </div>
          </div>
        </div>     
        )
}