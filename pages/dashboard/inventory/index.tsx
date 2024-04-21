"use client"
import React, { useState, useEffect } from "react";
import  {tableName} from "@/lib/company";
import { lusitana } from "@/styles/font";
import GPCInventoryTable from "@/components/ui/tables/gpctable";
import Dropdown from "@/components/ui/inventory/dropdown";
import Layout from "../layout";
import { CreateInventory } from "@/components/ui/buttons";
import Modal from "@/components/modal";
import Form from "@/components/ui/inventory/gpc-create/create-form";
import { InventoryList } from "@/lib/definition";
import Search from "@/components/ui/search";
import Upload from "@/components/Upload";
import AreaChartView from "@/components/AreaChart";
import Card, { CardBody, CardHeader } from "@/components/CardLayout";



export default function SampleRender({searchParams,}:{searchParams?: {search?: string}}) {
    const search = searchParams?.search || ''
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inventories, setInventories] = useState<InventoryList[]>([]);
    const [sample, setSample] = useState<string>("");
    const [tblName, setTblName] = useState<string>("");
    const [dataUploaderHandler, setDataUploaderHandler] = useState<() => void>(() => () => {})

    let name = tableName.find(company => company.name === sample)?.displayName || sample
        
    let table = tableName.find(company => company.name === tblName)?.name || tblName
    let mobileTable = tableName.find(company => company.name === tblName)?.table || tblName
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
            <div className="w-full border  rounded my-2">
                <div className="flex items-center justify-between w-full">
                    <h1 className={`${lusitana.className} text-2xl`}> {name} Inventory</h1>
                    
                </div>
                <div className="flex items-center justify-between gap-2 m-4 md:mt-8">
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
            { sample === '' && 
            <div className="grid grid-cols-subgrid"> 
                <Card>
                    <Card.Header>{name} Inventory</Card.Header>
                    <Card.Body>
                        <div className="lg:h-[500px] sm:h-[200px]">
                            <AreaChartView tableName={table} mobileTable={mobileTable} />
                        </div>
                    </Card.Body>
                </Card>
            </div>}
        </Layout>
        
     )
}
