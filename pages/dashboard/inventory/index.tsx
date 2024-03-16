"use client"
import { useState } from "react";
import { tableName } from "@/pages/lib/company";
import { lusitana } from "@/pages/ui/font";
import GPCInventoryTable from "@/pages/ui/inventory/gpctable";
import Dropdown from "@/pages/ui/inventory/dropdown";
import Layout from "../layout";

interface DropdownProps {
    onCompanyChange: (value: string) => void;
}

export default function SampleRender() {
    const [sample, setSample] = useState<string>("");
    const [tblName, setTblName] = useState<string>("");
    // const inventories = await fetchGPCInventoryList()
    // console.log(inventories)
    const handleCompanyChange = (value: string) => {
        setSample(value)
    }
    // const table = (value: string) => {
        let name = tableName.find(company => company.name === sample)?.displayName || sample
        
    // }

     return (
        <Layout>
        <div className="w-full">
         <h1 className={`${lusitana.className} text-2xl`}> {name} Inventory</h1>
         <div className="flex items-center mt-4">
                 <label className="mr-2">Select Company:</label>
                 <Dropdown onCompanyChange={handleCompanyChange}/>
             </div>
                 {/* Use curly braces to embed JavaScript expressions */}
                 { sample === "gpc_inventory" && <GPCInventoryTable />}
                 {/* { sample === "lsi_inventory" && <LSIInventoryTable/>} */}
        </div>
        </Layout>
     )
}
