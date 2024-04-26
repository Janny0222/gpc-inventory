"use client"
import React, { useState, useEffect, use } from "react";
import  {branchName, branchTableMap, tableName} from "@/lib/company";
import { lusitana } from "@/styles/font";
import GPCInventoryTable from "@/components/ui/tables/gpctable";
import Dropdown from "@/components/ui/inventory/dropdown";
import Layout from "../dashboard/layout";
import { CreateInventory } from "@/components/ui/buttons";
import Modal from "@/components/modal";
import Form from "@/components/ui/inventory/gpc-create/create-form";
import { InventoryList } from "@/lib/definition";
import Search from "@/components/ui/search";
import Upload from "@/components/Upload";
import AreaChartView from "@/components/AreaChart";
import Card, { CardBody, CardHeader } from "@/components/CardLayout";
import GetBranch from "@/components/ui/inventory/select-company";
import { Toaster } from "react-hot-toast";


export default function SampleRender({searchParams,}:{searchParams?: {search?: string}}) {
    let search = searchParams?.search || ''
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inventories, setInventories] = useState<InventoryList[]>([]);
    const [company, setCompany] = useState<string>("");
    const [branch, setBranch] = useState<string>("");
    const [tblName, setTblName] = useState<string>("");
    const [branchTable, setBranchTable] = useState<string>("");
    const [dataUploaderHandler, setDataUploaderHandler] = useState<() => void>(() => () => {})

    let name = tableName.find(companyName => companyName.name === company)?.displayName || company
        
    let table = tableName.find(company => company.name === tblName)?.name || ''
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
        if(value === 'gpc_inventory'){
            setBranch('Balintawak')
        } else if (value === 'lsi_inventory') {
            setBranch('Valenzuela');
        }
    //    search === " "
        
        setCompany(value)
        setTblName(value)
    }
    const handleDataUploaded = async () =>{
        try {
            const apiUrlEndpoint = `/api/${tblName}`
            const response = await fetch(apiUrlEndpoint);
            const data = await response.json()
            setInventories(data.results)
        } catch (error){
            console.error('Error fetching data: ', error)
        }
    }
    
    console.log(branch)
    console.log(tblName)
    console.log(branchTable)
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
                const apiUrlEndpoint = `/api/${tblName}`
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
    }, [tblName])

    const handleBranchChange = (value: string) => {
        setBranch(value)

        const branchTableName = branchTableMap[value as keyof typeof branchTableMap] || company;
        setTblName(branchTableName)
        handleDataUploaded()
    }
    console.log("result for console: ", company, tblName);
     return (
        
        <Layout>
            <div className=" p-5 border border-collapse rounded shadow-2xl mx-5 relative mt-5">
                <div className="grid grid-rows-1 self-end w-full">
                    <h1 className={`${lusitana.className} text-2xl`}> {name} Inventory</h1>
                    
                    <div className="relative flex flex-col  w-28 top-2">
                    {(company === 'gpc_inventory' || company === 'lsi_inventory') && branchName.length > 1 && (
                        <>
                        <span>Select Branch: </span>
                        <div className="border w-full border-gray-400">
                             <GetBranch onCompanyChange={handleBranchChange} getCompany={company} />
                        </div>
                        </>
                    )}
                    </div>
                    
                </div>
                <div className="flex items-center justify-between gap-2 m-4 md:mt-8">
                    {tblName !== "" && <><Search placeholder="Search..." /> <CreateInventory onClick={openModal}/></> }
                </div>
                    {(tblName !== '' || company !=='') && (inventories?.length === 0 || inventories === undefined ) && <Upload tablename={tblName} onDataUploaded={dataUploaderHandler} />}
                <div className="flex items-center mt-1">
                    <div className="flex items-center justify-between gap-2 mt-2 md:mt-2">
                        <label className="mr-2">Select Company:</label>
                        <Dropdown onCompanyChange={handleCompanyChange}/>  
                    </div>
                </div>
                    
                    {company === 'gpc_inventory' && branch === 'Balintawak' && <GPCInventoryTable query={search} gettableName={company} onDataSubmitted={handleFormSubmit}/>}
                    {company === 'gpc_inventory' && branch === 'SQ'  && <GPCInventoryTable query={search} gettableName={tblName} onDataSubmitted={handleFormSubmit}/>}
                    
                    {company === 'lsi_inventory' && branch === 'Valenzuela' && <GPCInventoryTable query={search} gettableName={company} onDataSubmitted={handleFormSubmit}/>}
                    {company === 'lsi_inventory' && branch === 'Canlubang'  && <GPCInventoryTable query={search} gettableName={tblName} onDataSubmitted={handleFormSubmit}/>}
                    
                    {(company !== 'gpc_inventory' && company !== 'lsi_inventory' ) && company !== '' && <GPCInventoryTable query={search} gettableName={company} onDataSubmitted={handleFormSubmit}/>}
                    
                    
                    
                    {isModalOpen && (
                        <Modal onClose={closeModal} companyName={name} onSubmit={handleFormSubmit} tablename={tblName}>
                            <Form gettableName={tblName} onDataSubmitted={handleFormSubmit}/>
                        </Modal>
                    )}
                     
            </div>
            { company === '' && 
            <div className=" p-6 mt-2"> 
                <Card>
                    <Card.Header>{name} Inventory</Card.Header>
                    <Card.Body>
                        <div className="lg:h-[500px] sm:h-[200px] flex justify-center items-center">
                            <AreaChartView tableName={table} mobileTable={mobileTable} />
                        </div>
                    </Card.Body>
                </Card>
            </div>}
        </Layout>
        
     )
}
