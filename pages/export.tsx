"use client"
import { ExportInventory } from "@/components/ui/buttons";
import Layout from "./layout";
import { lato } from "@/styles/font";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Page() {
    const [getTable, setGetTable] = useState("")

    const handleradioChange = (tableName: string) => {
        setGetTable(tableName)
    }
    const handleExport = async () => {
        const exportLoading = toast.loading(`Exporting data`, {duration: 3000})
        if(getTable) {
            try {
                
                const response = await fetch(`/api/${getTable}/export`)
                console.log("Result for Response: ", response)
                
                if (response.ok) {

                    const blob = await response.blob();
                    setTimeout(() => {
                    // Create a temporary object URL for the blob
                    const url = window.URL.createObjectURL(blob);
            
                    // Create a temporary anchor element to trigger download
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${name} Mobile Inventory.xlsx`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
            
                    // Revoke the object URL to release browser resources
                    window.URL.revokeObjectURL(url);
            
                    // Remove loading toast and show success message
                    toast.success('File exported successfully!', { id: exportLoading });
                    }, 2500)
                } else {
                    throw new Error('Failed to export data');
                }
                
            } catch (error) {
                console.error("Error exporting Data: ", error)
            }
        } else {
            setTimeout(() => {
                toast.error("No table selected for export", {id: exportLoading})
                console.error("No table selected for export")
            }, 2500)
            
        }
    }
    return (
        <Layout>
            <div className=" p-3 border rounded shadow-2xl shadow-black mx-2 relative mt-6 sm:mt-1 bg-white">
                <div className="p-5 shadow-black shadow-md">
                    <h1 className={`${lato.className} text-2xl`}> Export Data</h1>
                    <div className="border border-black mt-5"></div>
                    <div className="grid grid-cols-8 sm:p-10">
                        <div className="p-5 mt-2 col-span-4">
                            <h3 className="text-2xl">GPC</h3>
                            <div className="border rounded border-black p-5 grid sm:grid-cols-4 gap-2">
                                <div className="col-span-2 flex flex-row justify-evenly items-center">
                                    <input 
                                        type="radio" 
                                        className="" 
                                        name="gpc"
                                        checked={getTable === "gpc_inventory"}
                                        onChange={() => handleradioChange("gpc_inventory")}
                                        id="gpcCpuLaptop" 
                                    />
                                    <label htmlFor="gpcCpuLaptop"> CPU / Laptop</label>
                                    
                                </div>
                                <div className="col-span-2 flex flex-col justify-start items-start">
                                    <label htmlFor="gpcMobile"> Cellphone</label>
                                    <input 
                                        type="radio" 
                                        className="" 
                                        name="gpc"
                                        checked={getTable === "gpc_mobile_inventory"}
                                        onChange={() => handleradioChange("gpc_mobile_inventory")}
                                        id="gpcMobile" 
                                    />
                                </div>
                                <div className="col-span-2 flex flex-col justify-start items-start">
                                    <label htmlFor="gpcPrinter"> Printer</label>
                                    <input 
                                        type="radio" 
                                        className="" 
                                        name="gpc"
                                        checked={getTable === "gpc_printer"}
                                        onChange={() => handleradioChange("gpc_printer")}
                                        id="gpcPrinter" 
                                    />
                                </div>
                                <div className="col-span-2 flex flex-col justify-start items-start">
                                    <label htmlFor="gpcAccounts"> Server Accounts</label>
                                    <input 
                                        type="radio" 
                                        className="" 
                                        name="gpc"
                                        checked={getTable === "gpc_accounts"}
                                        onChange={() => handleradioChange("gpc_accounts")}
                                        id="gpcAccounts" 
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="p-5 mt-2 col-span-4">
                            <h3 className="text-2xl">GKC</h3>
                            <div className="border border-black p-5  grid sm:grid-cols-4 gap-2">
                                <div className="col-span-2 flex flex-col justify-start items-start">
                                    <label htmlFor="gkcCpuLaptop"> CPU / Laptop</label>
                                    <input 
                                        type="radio" 
                                        className="" 
                                        name="gkc"
                                        checked={getTable === "gkc_inventory"}
                                        onChange={() => handleradioChange("gkc_inventory")}
                                        id="gkcCpuLaptop" 
                                    />
                                </div>
                                <div className="col-span-2 flex flex-col justify-start items-start">
                                    <label htmlFor="gkcMobile"> Cellphone</label>
                                    <input 
                                        type="radio" 
                                        className="" 
                                        name="gkc"
                                        checked={getTable === "gkc_mobile_inventory"}
                                        onChange={() => handleradioChange("gkc_mobile_inventory")}
                                        id="gkcMobile" 
                                    />
                                </div>
                                <div className="col-span-2 flex flex-col justify-start items-start">
                                    <label htmlFor="gkcPrinter"> Printer</label>
                                    <input 
                                        type="radio" 
                                        className="" 
                                        name="gkc"
                                        checked={getTable === "gkc_printer"}
                                        onChange={() => handleradioChange("gkc_printer")}
                                        id="gkcPrinter" 
                                    />
                                </div>
                                <div className="col-span-2 flex flex-col justify-start items-start">
                                    <label htmlFor="gkcAccounts"> Server Accounts</label>
                                    <input 
                                        type="radio" 
                                        className="" 
                                        name="gkc"
                                        checked={getTable === "gkc_accounts"}
                                        onChange={() => handleradioChange("gkc_accounts")}
                                        id="gkcAccounts" 
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="p-5 mt-2 col-span-4">
                            <h3 className="text-2xl">LSI</h3>
                            <div className="border border-black p-5  grid sm:grid-cols-4 gap-2">
                                <div className="col-span-2 flex flex-col justify-start items-start">
                                    <label htmlFor="lsiCpuLaptop"> CPU / Laptop</label>
                                    <input 
                                        type="radio" 
                                        className="" 
                                        name="lsi"
                                        checked={getTable === "lsi_inventory"}
                                        onChange={() => handleradioChange("lsi_inventory")}
                                        id="lsiCpuLaptop" 
                                    />
                                </div>
                                <div className="col-span-2 flex flex-col justify-start items-start">
                                    <label htmlFor="lsiMobile"> Cellphone</label>
                                    <input 
                                        type="radio" 
                                        className="" 
                                        name="lsi"
                                        checked={getTable === "lsi_mobile_inventory"}
                                        onChange={() => handleradioChange("lsi_mobile_inventory")}
                                        id="lsiMobile" 
                                    />
                                </div>
                                <div className="col-span-2 flex flex-col justify-start items-start">
                                    <label htmlFor="lsiPrinter"> Printer</label>
                                    <input 
                                        type="radio" 
                                        className="" 
                                        name="lsi"
                                        checked={getTable === "lsi_printer"}
                                        onChange={() => handleradioChange("lsi_printer")}
                                        id="lsiPrinter" 
                                    />
                                </div>
                                <div className="col-span-2 flex flex-col justify-start items-start">
                                    <label htmlFor="lsiAccounts"> Server Accounts</label>
                                    <input 
                                        type="radio" 
                                        className="" 
                                        name="lsi"
                                        checked={getTable === "lsi_accounts"}
                                        onChange={() => handleradioChange("lsi_accounts")}
                                        id="lsiAccounts" 
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="p-5 mt-2 col-span-4">
                            <h3 className="text-2xl">GSRC</h3>
                            <div className="border border-black p-5  grid sm:grid-cols-4 gap-2">
                                <div className="col-span-2 flex flex-col justify-start items-start">
                                    <label htmlFor="gsrcCpuLaptop"> CPU / Laptop</label>
                                    <input 
                                        type="radio" 
                                        className="" 
                                        name="gsrc"
                                        checked={getTable === "gsrc_inventory"}
                                        onChange={() => handleradioChange("gsrc_inventory")}
                                        id="gsrcCpuLaptop" 
                                    />
                                </div>
                                <div className="col-span-2 flex flex-col justify-start items-start">
                                    <label htmlFor="gsrcMobile"> Cellphone</label>
                                    <input 
                                        type="radio" 
                                        className="" 
                                        name="gsrc"
                                        checked={getTable === "gsrc_mobile_inventory"}
                                        onChange={() => handleradioChange("gsrc_mobile_inventory")}
                                        id="gsrcMobile" 
                                    />
                                </div>
                                <div className="col-span-2 flex flex-col justify-start items-start">
                                    <label htmlFor="gsrcPrinter"> Printer</label>
                                    <input 
                                        type="radio" 
                                        className="" 
                                        name="gsrc"
                                        checked={getTable === "gsrc_printer"}
                                        onChange={() => handleradioChange("gsrc_printer")}
                                        id="gsrcPrinter" 
                                    />
                                </div>
                                <div className="col-span-2 flex flex-col justify-start items-start">
                                    <label htmlFor="gsrcAccounts"> Server Accounts</label>
                                    <input 
                                        type="radio" 
                                        className="" 
                                        name="gsrc"
                                        checked={getTable === "gsrc_accounts"}
                                        onChange={() => handleradioChange("gsrc_accounts")}
                                        id="gsrcAccounts" 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <ExportInventory table={getTable} onClick={handleExport} />
                </div>
            </div>
        </Layout>
    )
}