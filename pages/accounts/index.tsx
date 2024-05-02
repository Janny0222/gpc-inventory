"use client"
import Layout from "../layout";
import { lato } from "@/styles/font";
import { tableName } from "@/lib/company";
import { useEffect, useState } from "react";
import Dropdown from "@/components/ui/dropdowns/dropdown";
import Search from "@/components/ui/search";
import { CreateInventory } from "@/components/ui/buttons";
import { ServerAccountsInventory } from "@/lib/definition";
import Upload from "@/components/Upload";
import AccountInventoryTable from "@/components/ui/tables/accounttable";
import Modal from "@/components/modal";
import Form from "@/components/ui/inventory/create-data/CreateAccount";

export default function Page() {
    const [value, setValue] = useState<string>("")
    const [tablename, setTablename] = useState<string>("")
    const [tableAccounts, setTableAccounts] = useState<ServerAccountsInventory[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [dataUploaderHandler, setDataUploaderHandler]  = useState<() => void>(() => () => {})

    const name = tableName.find(display => display.name === value)?.displayName || value
    const gettable = tableName.find(table => table.name === tablename)?.accounts || tablename

    const handleDropdown = (value: string) => {
        setValue(value)
        setTablename(value)
    }
    const openModal = () => {
        setIsModalOpen(true)
    }
    const closeModal = () => {
        setIsModalOpen(false)
    }
    const handleFormSubmit = () => {
        dataUploaderHandler()
        closeModal()
    }

    useEffect(() => {
        if(tablename) {
            const handleDataUploaded = async () => {
                try {
                    const url = `/api/${gettable}/accounts`;
                    const response = await fetch(url);
                    const data = await response.json();
                    setTableAccounts(data.results);
                } catch (error) {
                    console.error('Unable to fetch data: ', error);
                }
            }
            setDataUploaderHandler(() => handleDataUploaded)
            handleDataUploaded();
        }
    }, [gettable, tablename])

    return (
        <Layout>
            <div className=" p-5 border border-collapse rounded shadow-2xl mx-5 relative mt-5">
                <div className="flex items-center justify-between w-full">
                    <h1 className={`${lato.className} text-2xl`}> {name} Server Accounts</h1>
                </div>
                <div className="flex items-center justify-between gap-2 mt-4 md:mt-8">
                    
                   {name !== '' && <> <Search placeholder="Search...." /><CreateInventory onClick={openModal}/> </>}
                </div>
                    {gettable !== '' && (tableAccounts?.length === 0 || tableAccounts === null) && <Upload tablename={gettable} onDataUploaded={dataUploaderHandler}/>}
                <div className="flex flex-row items-center mt-1">
                    <div className="flex items-center justify-between gap-2 mt-2 md:mt-4">
                        <label className="mr-2 relative">Select Company:</label>
                        <Dropdown onCompanyChange={handleDropdown} />
                    </div>
                </div>
                {name !== '' && <AccountInventoryTable getTableName={gettable} onDataSubmitted={handleFormSubmit}/>}
                {isModalOpen && (
                        <Modal onClose={closeModal} companyName={name} onSubmit={handleFormSubmit} tablename={gettable}>
                            <Form gettableName={gettable} onDataSubmitted={handleFormSubmit}/>
                        </Modal>
                    )}
            </div>
        </Layout>
    )
}