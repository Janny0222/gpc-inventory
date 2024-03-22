"use client"
import Search from "@/pages/ui/search";
import Layout from "../layout";
import { lusitana } from "@/styles/font";
import { CreateInventory } from "@/pages/ui/buttons";
import { use, useState } from "react";
import Dropdown from "@/pages/ui/inventory/dropdown";
import GPCMobileInventory from "@/pages/ui/tables/mobiletable";
import { tableName } from "@/pages/lib/company";
import Form from "@/pages/ui/inventory/gpc-mobile-create/create-form";
import Modal from "@/pages/components/modal";

export default function Page(){
const [isModalOpen, setIsModalOpen] = useState(false);
const [value, setValue] = useState<string>("")
const [tablename, setTableName] = useState<string>("")

    const handleDropdown = (value: string) => {
        setTableName(value)
        setValue(value)
    }
    console.log(value)
    const openModal = () => {
        setIsModalOpen(true);
    }
    const closeModal = () => {
        setIsModalOpen(false)
    }
    const handleFormSubmit = async () =>{
        closeModal();
    }
    let name = tableName.find(company => company.name === value)?.displayName || value
    let getName = tableName.find(company => company.name === tablename)?.name || tablename
    let getTable = tableName.find(company => company.name === tablename)?.table || tablename
    return (
        <Layout>
            <div className="w-full">
                <div className="flex items-center justify-between w-full">
                    <h1 className={`${lusitana.className} text-2xl`}> {name} Mobile</h1>
                </div>
                <div className="flex items-center justify-between gap-2 mt-4 md:mt-8">
                   {name !== '' && <> <Search placeholder="Search...." /><CreateInventory onClick={openModal} /> </>}
                </div>
                <div className="flex items-center mt-1">
                    <div className="flex items-center justify-between gap-2 mt-4 md:mt-8">
                        <label className="mr-2">Select Company:</label>
                        <Dropdown onCompanyChange={handleDropdown} />
                    </div>
                </div>
                {name !== '' && <GPCMobileInventory getTableName={getTable}/>}
                {isModalOpen && (
                        <Modal onClose={closeModal} companyName={name} onSubmit={handleFormSubmit} tablename={getTable}>
                            <Form gettableName={getTable} onDataSubmitted={handleFormSubmit}/>
                        </Modal>
                    )}
            </div>
        </Layout>
    )
}