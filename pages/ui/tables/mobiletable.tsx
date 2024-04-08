'use client'
import EditMobileModal from "@/pages/components/EditMobileModal";
import { MobileInventoryList } from "@/pages/lib/definition"
import { useEffect, useState } from "react"
import { QRGenerator, UpdateMobileInventory } from "../buttons";
import CustomPagination from "@/pages/components/Pagination";
import BarcodeModal from "@/pages/components/QRCodeModal";


interface MobileInventoryProps {
    getTableName: string,
    onDataSubmitted: () => void;
}

export default function GPCMobileInventory ({getTableName, onDataSubmitted}: MobileInventoryProps) {

const [mobileInventory, setMobileInventory] = useState<MobileInventoryList[]>([])
const [selectedId, setSelectedId] = useState<number | null>(null)
const [isModalOpen, setIsModalOpen] = useState(false);
const [isQRModalOpen, setIsQRModalOpen] = useState(false);
const [totalPages, setTotalPages] = useState(1);
const [currentPage, setCurrentPage] = useState(1);


const getQuery = new URLSearchParams(window.location.search)
const queryValue = getQuery.get('query')
    
async function fetchMobile () {
  try {
    if(queryValue) {
      const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_URL}/api/${getTableName}/cellphones/?query=${queryValue}`
      const response = await fetch(apiUrlEndpoint);
      const data = await response.json();
      setMobileInventory(data.results)
      setTotalPages(data.totalPages);
    } else {
      const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_URL}/api/${getTableName}/cellphones/?page=${currentPage}`;
      const response = await fetch(apiUrlEndpoint);
      const data = await response.json()
      setMobileInventory(data.results);
      setCurrentPage(1);
      setTotalPages(data.totalPages)
    }
  } catch (error) {
      console.error('Error fetching data', error)
  }
}
useEffect(() => {
  async function fetchMobileInventory () {
    try {
      if(queryValue) {
        const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_URL}/api/${getTableName}/cellphones/?query=${queryValue}`
        const response = await fetch(apiUrlEndpoint);
        const data = await response.json();
        setMobileInventory(data.results)
        setTotalPages(data.totalPages);
      } else {
        const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_URL}/api/${getTableName}/cellphones`;
        const response = await fetch(apiUrlEndpoint);
        const data = await response.json()
        setMobileInventory(data.results);
        setCurrentPage(1);
        setTotalPages(data.totalPages)
      }
    } catch (error) {
        console.error('Error fetching data', error)
    }
  }
        fetchMobileInventory()
}, [getTableName, onDataSubmitted, queryValue])

const handleFormSubmit = async () => {
  closeModal();
  fetchMobile();
}


const handlePageClick = async (selected: { selected: number }) => {
  try {
    const newPage = selected.selected + 1
    
    if (newPage > currentPage) {
    const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_URL}/api/${getTableName}/cellphones?page=${newPage}`;
    const response = await fetch(apiUrlEndpoint);
    const data = await response.json()
    setMobileInventory(data.results)
    setTotalPages(data.totalPages)
    } else if (newPage < currentPage) {
    const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_URL}/api/${getTableName}/cellphones?page=${newPage}`;
    const response = await fetch(apiUrlEndpoint);
    const data = await response.json()
    setMobileInventory(data.results)
    setTotalPages(data.totalPages)
    }
    setCurrentPage(newPage)
    console.log("result total page",totalPages);
    console.log("result select",currentPage);
  } catch ( error) {
    console.error('Error fetching inventory data:', error)
  }
  
};
const qrModal = async (id: number) => {
  setSelectedId(id)
  setIsQRModalOpen(true)

  console.log("Generate QR Code Button, Getting id: ",selectedId)
  try {
    const res = await fetch (`${process.env.NEXT_PUBLIC_URL}/api/${getTableName}/cellphones/${id}`)
    if(!res.ok){
      throw new Error (`Failed to fetch seleted Data`)
    }
    const data = await res.json()
    
  } catch (error){
    
  }
}
const openModal = async (id: number) => {
  setSelectedId(id)
  setIsModalOpen(true)
  console.log(selectedId)
  try {
    const res = await fetch (`${process.env.NEXT_PUBLIC_URL}/api/${getTableName}/cellphones/${id}`)
    if(!res.ok){
      throw new Error (`Failed to fetch seleted Data`)
    }
    const data = await res.json()
    
  } catch (error){
    
  }
}
const closeQrModal = () => {
  setIsQRModalOpen(false);
  setSelectedId(null)
}
const closeModal = () => {
  setIsModalOpen(false);
  setSelectedId(null)
}
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
                        {inventory.model_specs?.split(",").map((item, index) => (
                          <div key={index}>
                            {item.trim()}
                          </div>
                        ))}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                      {inventory.imei?.split("IMEI").map((imei, index) => (
                          index > 0 && (
                              <div key={index}>
                                  IMEI{imei.trim()}
                              </div>
                          )
                      ))}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        {inventory.serial_number}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                      {inventory.inclusion?.split(",").map((item, index) => (
                          <div key={index}>
                              {item.trim()}
                          </div>
                      ))}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        {inventory.date_issued}
                      </td>
                      <td className="py-3 pl-6 pr-3 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <UpdateMobileInventory id={inventory.id} onClick={openModal}/>
                          {/* <QRGenertor id={inventory.id} onClick={qrModal} /> */}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
                    {/* {isQRModalOpen && (
                      <BarcodeModal tablename={getTableName} id={selectedId} onClose={closeQrModal} />
                    )} */}
                    {isModalOpen && (
                            <EditMobileModal onClose={closeModal} onSubmit={handleFormSubmit} id={selectedId} tablename={getTableName}/>
                              
                    )}
            </div>
            {mobileInventory?.length !== 0 && mobileInventory !== undefined && !queryValue &&
            <CustomPagination
              pageCount={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageClick}
            />}
          </div>
        </div>     
        )
}