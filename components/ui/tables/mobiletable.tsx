'use client'
import EditMobileModal from "@/components/EditMobileModal";
import { MobileInventoryList } from "@/lib/definition"
import { useEffect, useState } from "react"
import { QRGeneratorButton, UpdateMobileInventory } from "../../../components/ui/buttons";
import CustomPagination from "@/components/Pagination";
import BarcodeModal from "@/components/QRCodeModal";
import BarcodeMobileModal from "@/components/QRCodeMobileModal";
import {tableName} from "@/lib/company";
import MobileEditModal from "@/components/ModalEditInventory";

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
const [modalData, setModalData] = useState<any>(null)

const getQuery = new URLSearchParams(window.location.search)
const queryValue = getQuery.get('query')
let company = tableName.find(company => company.name === getTableName)?.company || getTableName
async function fetchMobile () {
  try {
    if(queryValue) {
      const apiUrlEndpoint = `/api/${getTableName}/cellphones/?query=${queryValue}`
      const response = await fetch(apiUrlEndpoint);
      const data = await response.json();
      setMobileInventory(data.results)
      setTotalPages(data.totalPages);
    } else {
      const apiUrlEndpoint = `/api/${getTableName}/cellphones/?page=${currentPage}`;
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
        const apiUrlEndpoint = `/api/${getTableName}/cellphones/?query=${queryValue}`
        const response = await fetch(apiUrlEndpoint);
        const data = await response.json();
        setMobileInventory(data.results)
        setTotalPages(data.totalPages);
      } else {
        const apiUrlEndpoint = `/api/${getTableName}/cellphones`;
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
    const apiUrlEndpoint = `/api/${getTableName}/cellphones?page=${newPage}`;
    const response = await fetch(apiUrlEndpoint);
    const data = await response.json()
    setMobileInventory(data.results)
    setTotalPages(data.totalPages)
    } else if (newPage < currentPage) {
    const apiUrlEndpoint = `/api/${getTableName}/cellphones?page=${newPage}`;
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

const handleSave = async () => {
  try {
      // Call any necessary functions or perform any actions here
      console.log("Saving data...");
      // Once everything is saved, close the QR modal
      closeQrModal();
  } catch (error) {
      console.error('Error saving data:', error);
  }
}
const qrModal = async (id: number) => {
  setSelectedId(id)
  setIsQRModalOpen(true)

  console.log("Generate QR Code Button, Getting id: ",selectedId)
  try {
    const res = await fetch (`/api/${getTableName}/cellphones/${id}`)
    if(!res.ok){
      throw new Error (`Failed to fetch seleted Data`)
    }
    const data = await res.json()
    
  } catch (error){
  
  }
}

const viewDetails = async (id: number) => {
  console.log(id)
}

const openModal = async (id: number) => {
  setSelectedId(id)
  setIsModalOpen(true)
  console.log(selectedId)
  try {
    const res = await fetch (`/api/${getTableName}/cellphones/${id}`)
    if(!res.ok){
      throw new Error (`Failed to fetch seleted Data`)
    }
    const data = await res.json()
    setModalData(data.results[0])
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
            <div className="p-2 rounded-lg bg-black md:pt-0">
              <table className="min-w-full md:table">
                <thead className="text-sm text-left text-white rounded-lg">
                  <tr>
                    <th scope="col" className="px-4 py-1 font-extrabold">
                      Assigned To
                    </th>
                    <th scope="col" className="px-3 py-1 font-extrabold">
                      Department
                    </th>
                    <th scope="col" className="px-3 py-1 font-extrabold">
                      Brand
                    </th>
                    <th scope="col" className="px-3 py-1 font-extrabold">
                      Model / Specs
                    </th>
                    <th scope="col" className="px-3 py-1 font-extrabold">
                      IMEI
                    </th>
                    <th scope="col" className="px-3 py-1 font-extrabold">
                      Serial Number
                    </th>
                    <th scope="col" className="px-3 py-1 font-extrabold">
                      Inclusion
                    </th>
                    <th scope="col" className="px-3 py-1 font-extrabold">
                      Date Issued
                    </th>
                    <th scope="col" className="py-3 pl-6 pr-3">
                      Action
                    </th>
                  </tr>
                </thead>
                
                <tbody className="bg-white cursor-pointer">
                  
                  {mobileInventory?.map((inventory) => (
                    <tr key={inventory.id}
                      className="w-full shadow-md shadow-gray-700 rounded border-green-500 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                    >
                      <td className="py-3 pl-6 pr-3 whitespace-nowrap" onClick={() => viewDetails(inventory.id)}>
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
                          {/* <MobileEditModal /> */}
                          <QRGeneratorButton 
                        id={inventory.id} 
                        onClick={qrModal}
                        onSave={handleSave}
                      />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
                    {isQRModalOpen && (
                      <BarcodeMobileModal modalData={modalData} company={company} tablename={getTableName} id={selectedId} onClose={closeQrModal} />
                    )}
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