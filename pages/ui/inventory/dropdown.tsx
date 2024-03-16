import { useState, useEffect } from "react";
import { tableName } from "../../lib/company";
import { lusitana } from "../font";

interface DropdownProps {
    onCompanyChange: (value: string) => void,
    
}

export default function Dropdown({onCompanyChange}: DropdownProps){
   
    const handleCompanyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const values = event.target.value
    onCompanyChange(values);
    // window.location.href = `/dashboard/inventory/${values}`;
   }
   
    return (
       
        <select onChange={handleCompanyChange}>
            <option value="">Select</option>
            {tableName.map(company => (
                
            <option key={company.name} value={company.name}>{company.name}</option>
            
            ))}
        </select>
          
    )
}