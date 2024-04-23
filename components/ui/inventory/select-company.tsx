"use client"
import { useEffect } from "react";
import  {companyBranch}  from "../../../lib/company";


interface DropdownProps {
    onCompanyChange: (value: string) => void,
    
}

export default function SelectCompany({onCompanyChange}: DropdownProps){
   
    const handleCompanyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const values = event.target.value
    onCompanyChange(values);
    // window.location.href = `/dashboard/inventory/${values}`;
   }
   
    return (
       
        <select onChange={handleCompanyChange}>
            <option value="Balintawak">Balintawak</option>
            <option value="SQ">SQ</option>            
        </select>
          
    )
}