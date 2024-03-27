"use client"
import Search from "@/pages/ui/search";
import Layout from "../layout";
import { lusitana } from "@/styles/font";
import { CreateInventory } from "@/pages/ui/buttons";
import { ChangeEvent, use, useEffect, useState } from "react";
import Dropdown from "@/pages/ui/inventory/dropdown";
import GPCMobileInventory from "@/pages/ui/tables/mobiletable";
import { tableName } from "@/pages/lib/company";
import Form from "@/pages/ui/inventory/gpc-mobile-create/create-form";
import Modal from "@/pages/components/modal";
import { MobileInventoryList } from "@/pages/lib/definition";
import Upload from "@/pages/components/Upload";

export default function Page(){
const [isModalOpen, setIsModalOpen] = useState(false);
const [value, setValue] = useState<string>("")
const [tablename, setTableName] = useState<string>("")
const [mobileInventory, setMobileInventory] = useState<MobileInventoryList[]>([])

    let name = tableName.find(company => company.name === value)?.displayName || value
    let getName = tableName.find(company => company.name === tablename)?.name || tablename
    let getTable = tableName.find(company => company.name === tablename)?.table || tablename
    const handleDropdown = (value: string) => {
        setTableName(value)
        setValue(value)
    }
    
    const openModal = () => {
        setIsModalOpen(true);
    }
    const closeModal = () => {
        setIsModalOpen(false)
    }
    const handleFormSubmit = async () =>{
        closeModal();
    }
    const handleDataUpload = async () => {
        try {
            const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_URL}/api/${getTable}/cellphones`
            const response = await fetch(apiUrlEndpoint);
            const data = await response.json();
            setMobileInventory(data.results)
        } catch (error) {
            console.error('Error fetching data', error)
        }
    }
    useEffect(()=> {
        const handleDataUploaded = async () => {
            try {
                const apiUrlEndpoint = `${process.env.NEXT_PUBLIC_URL}/api/${getTable}/cellphones`
                const response = await fetch(apiUrlEndpoint);
                const data = await response.json();
                setMobileInventory(data.results)
            } catch (error) {
                console.error('Error fetching data', error)
            }
        }
        handleDataUploaded()
    }, [tablename, getTable])
    
    
    
    return (
        <Layout>
            <div className="w-full">
                <div className="flex items-center justify-between w-full">
                    <h1 className={`${lusitana.className} text-2xl`}> {name} Mobile</h1>
                </div>
                <div className="flex items-center justify-between gap-2 mt-4 md:mt-8">
                    
                   {name !== '' && <> <Search placeholder="Search...." /><CreateInventory onClick={openModal} /> </>}
                </div>
                    {name !== '' && (mobileInventory?.length === 0 || mobileInventory === undefined) && <Upload tablename={getTable} onDataUploaded={handleDataUpload}/>}
                <div className="flex flex-row items-center mt-1">
                    <div className="flex items-center justify-between gap-2 mt-2 md:mt-4">
                        <label className="mr-2">Select Company:</label>
                        <Dropdown onCompanyChange={handleDropdown} />
                    </div>
                </div>
                {name !== '' && <GPCMobileInventory gettableName={getTable} onDataSubmitted={handleFormSubmit}/>}
                {isModalOpen && (
                        <Modal onClose={closeModal} companyName={name} onSubmit={handleFormSubmit} tablename={getTable}>
                            <Form gettableName={getTable} onDataSubmitted={handleFormSubmit}/>
                        </Modal>
                    )}
            </div>
        </Layout>
    )
}