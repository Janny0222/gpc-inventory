
'use client'
import { ChangeEvent, useEffect, useState } from "react";
import { InventoryList } from "@/lib/definition";
import { QRGeneratorButton, UpdateInventory } from "../../../components/ui/buttons";
import  {tableName}  from "@/lib/company";
import EditModal from "@/components/EditInventoryModal";
import CustomPagination from "@/components/Pagination";
import html2canvas from "html2canvas";
import BarcodeModal from "@/components/QRCodeModal";

interface GPCInventoryTableProps {
  gettableName: string;
  onDataSubmitted: () => void;
  query: string;

}

export default function GPCInventoryTable ({ gettableName, onDataSubmitted, query}:GPCInventoryTableProps){
  const [inventories, setInventories] = useState<InventoryList[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [modalData, setModalData] = useState<any>(null)
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  
  const getquery = new URLSearchParams(window.location.search)
  const queryvalue = getquery.get('query')
 
  // Fetching the data from database
  
  useEffect(() => {
    async function fetchInventoryData() {
      try {
        if(queryvalue) {
          const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_URL}/api/${gettableName}?query=${queryvalue}`;
          const response = await fetch(apiUrlEndpoint);
          const data = await response.json();
          setTotalPages(data.totalPages)
          setInventories(data.results);
          
        } else {
          const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_URL}/api/${gettableName}`;
          const response = await fetch(apiUrlEndpoint);
          const data = await response.json();
          setInventories(data.results);
          setTotalPages(data.totalPages)
          setCurrentPage(1)
        }
      } catch (error) {
        console.error('Error fetching inventory data:', error);
      }
    }
    
    fetchInventoryData();
  }, [gettableName, onDataSubmitted, queryvalue, totalPages]);

  const handlePageClick = async (selected: { selected: number }) => {
    try {
      const newPage = selected.selected + 1
      
      if (newPage > currentPage) {
      const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_URL}/api/${gettableName}?page=${newPage}`;
      const response = await fetch(apiUrlEndpoint);
      const data = await response.json()
      setInventories(data.results)
      setTotalPages(data.totalPages)
      } else if (newPage < currentPage) {
      const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_URL}/api/${gettableName}?page=${newPage}`;
      const response = await fetch(apiUrlEndpoint);
      const data = await response.json()
      setInventories(data.results)
      setTotalPages(data.totalPages)
      }
      setCurrentPage(newPage)
      console.log("result total page",totalPages);
      console.log("result select",currentPage);
    } catch ( error) {
      console.error('Error fetching inventory data:', error)
    }
    
  };

  
  // Getting the specific display name
  let company = tableName.find(company => company.name === gettableName)?.company || gettableName
  // modal for edit
  const openModal = async (id: number) =>{
    setSelectedId(id);
    setIsModalOpen(true);
    console.log(selectedId)
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/${gettableName}/${id}`)
        if(!res.ok){
          throw new Error('Failed to fetch inventory item');
        }
        const data = await res.json();
        
        setModalData(data.results[0])
      } catch (error){
        console.error('Error fetching inventory item:', error)
      }
  
  }
  const saveBarcodeModalAsImage = async () => {
    if (selectedId && isQRModalOpen) {
        // Wait for the modal to be fully rendered
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Capture the content of the BarcodeModal as an image
        const content = document.getElementById('barcode-modal-content');
        if (content) {
            const canvas = await html2canvas(content);

            // Convert canvas to data URL
            const imageUrl = canvas.toDataURL('image/png');

            // Create a link element to trigger download
            const link = document.createElement('a');
            link.href = imageUrl;
            link.download = `barcode_modal_${selectedId}.png`;
            link.click();
        }
    }
};
  const closeModal = () => {
      setIsModalOpen(false)
      setSelectedId(null)
  }

  const qrModal = async (id: number) => {
    setSelectedId(id);
    setIsQRModalOpen(true);
  
    console.log("Generate QR Code Button, Getting id: ", selectedId);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/${gettableName}/${id}`);
      if (!res.ok) {
        throw new Error('Failed to fetch inventory item');
      }
      const data = await res.json();
      // Make sure to pass necessary arguments if needed
    } catch (error) {
      console.error('Error fetching inventory item:', error);
    }
  };

  const closeQrModal = () => {
    setIsQRModalOpen(false);
    setSelectedId(null)
  }
  
  const handleFormSubmit = async () =>{
    closeModal();
    getPageData()
  }
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
        
        console.log(currentPage)
    } catch (error) {
        console.error('Error fetching inventory data:', error);
    }
  }
    return (  
    <div className="overflow-x-auto sm:p-2">
      <div className="inline-block min-w-full align-middle">
        <div className="p-2 rounded bg-black md:pt-0">
          <table className="min-w-full   md:table">
            <thead className="text-sm text-left text-white  rounded-lg">
              <tr>
                <th scope="col" className="px-4 py-1  font-extrabold">
                  PC Name
                </th>
                <th scope="col" className="px-3 py-1 font-extrabold">
                  Mac Address
                </th>
                <th scope="col" className="px-3 py-1 font-extrabold">
                  Computer Type
                </th>
                <th scope="col" className="px-3 py-1 font-extrabold">
                  Specs
                </th>
                <th scope="col" className="px-3 py-1 font-extrabold">
                  Supplier
                </th>
                <th scope="col" className="px-3 py-1 font-extrabold">
                  Date Purchased
                </th>
                <th scope="col" className="py-3 pl-6 pr-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white ">
              {inventories?.map((inventory) => (
                <tr key={inventory.id}
                  className="w-full shadow-md shadow-green-700 rounded border-green-500 text-sm  [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className=" pl-6 pr-3 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <p>{inventory.pc_name}</p>
                      
                    </div>
                  </td>
                  <td className="px-3  whitespace-nowrap">
                    {inventory.mac_address}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    {inventory.computer_type}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    {inventory.specs?.split(",").map((specs, index) => (
                      index > 0 && (
                        <div key={index}>
                          {specs.trim()}
                        </div>
                      )
                    ))}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    {inventory.supplier}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    {inventory.date_purchased}
                  </td>
                  <td className="py-3 pl-6 pr-3 whitespace-nowrap">
                    <div className="flex items-center gap-3 edit-button">
                      <UpdateInventory id={inventory.id} onClick={openModal}/>
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
                      <BarcodeModal modalData={modalData} tablename={gettableName} id={selectedId} onClose={closeQrModal} company={company}/>
                    )}
          {isModalOpen && (
                        <EditModal onClose={closeModal} onSubmit={handleFormSubmit} id={selectedId} tablename={gettableName}/>
                    )}
        </div>{!queryvalue &&
        <CustomPagination
          pageCount={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageClick}
        />   }
      </div>
    </div>     
    )
}


