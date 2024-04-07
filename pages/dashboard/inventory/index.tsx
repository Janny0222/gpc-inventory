"use client"
import React, { useState, useEffect } from "react";
import { tableName } from "@/pages/lib/company";
import { lusitana } from "@/styles/font";
import GPCInventoryTable from "@/pages/ui/tables/gpctable";
import Dropdown from "@/pages/ui/inventory/dropdown";
import Layout from "../layout";
import { CreateInventory } from "@/pages/ui/buttons";
import Modal from "@/pages/components/modal";
import Form from "@/pages/ui/inventory/gpc-create/create-form";
import { InventoryList } from "@/pages/lib/definition";
import Search from "@/pages/ui/search";
import Upload from "@/pages/components/Upload";


export default function SampleRender({searchParams,}:{searchParams?: {search?: string}}) {
    const search = searchParams?.search || ''
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inventories, setInventories] = useState<InventoryList[]>([]);
    const [sample, setSample] = useState<string>("");
    const [tblName, setTblName] = useState<string>("");
    const [dataUploaderHandler, setDataUploaderHandler] = useState<() => void>(() => () => {})

    let name = tableName.find(company => company.name === sample)?.displayName || sample
        
    let table = tableName.find(company => company.name === tblName)?.name || tblName
    // const inventories = await fetchGPCInventoryList()
    // console.log(inventories)

    // modal for edit
    const openModal = () =>{
        setIsModalOpen(true);
    }

    // close modal
    const closeModal = () => {
        setIsModalOpen(false)
    }

    // Handle selecting company
    const handleCompanyChange = (value: string) => {
        setSample(value)
        setTblName(value)
    }

    // modal for add
    const handleFormSubmit = async () =>{
        closeModal();
        // await getPageData();
        dataUploaderHandler()
    }
    useEffect(() => {
        if(tblName){
        const handleDataUploaded = async () =>{
            try {
                const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_URL}/api/${table}`
                const response = await fetch(apiUrlEndpoint);
                const data = await response.json()
                setInventories(data.results)
            } catch (error){
                console.error('Error fetching data: ', error)
            }
        }
        setDataUploaderHandler(() => handleDataUploaded)
        handleDataUploaded()
        }
    }, [tblName, table])
        

     return (
        
        <Layout>
            <div className="w-full">
                <div className="flex items-center justify-between w-full">
                    <h1 className={`${lusitana.className} text-2xl`}> {name} Inventory</h1>
                    
                </div>
                <div className="flex items-center justify-between gap-2 mt-4 md:mt-8">
                    {table !== "" && <><Search placeholder="Search..." /> <CreateInventory onClick={openModal}/></> }
                </div>
                    {name !== '' && (inventories?.length === 0 || inventories === undefined ) && <Upload tablename={table} onDataUploaded={dataUploaderHandler} />}
                <div className="flex items-center mt-1">
                    <div className="flex items-center justify-between gap-2 mt-4 md:mt-8">
                        <label className="mr-2">Select Company:</label>
                        <Dropdown onCompanyChange={handleCompanyChange}/>  
                    </div>
                </div>
                
                    { sample === table && sample !== ""  && <GPCInventoryTable query={search} gettableName={sample} onDataSubmitted={handleFormSubmit}/>}
                    
                    {isModalOpen && (
                        <Modal onClose={closeModal} companyName={name} onSubmit={handleFormSubmit} tablename={sample}>
                            <Form gettableName={sample} onDataSubmitted={handleFormSubmit}/>
                        </Modal>
                    )}
            </div>
            
        </Layout>
     )
}
