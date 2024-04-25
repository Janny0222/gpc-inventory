"use client"
import { useEffect, useState } from "react";
import  {branchName}  from "../../../lib/company";


interface DropdownProps {
    onCompanyChange: (value: string) => void,
    getCompany: string;
    
}

export default function GetBranch({onCompanyChange, getCompany}: DropdownProps){
    const [selectedCompany, setSelectedCompany] = useState<string>("")
    
    const handleCompanyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value
    setSelectedCompany(selectedValue)
    onCompanyChange(selectedValue);
   }

    const getBranch = branchName.find(company => company.company === getCompany)
   
    return (
       
        <select onChange={handleCompanyChange}>
            {/* {companyBranch.map(branch => (
            <option key={branch.name} value={branch.name}>{branch.name}</option>
            ))}        */}
            {getBranch?.branch.map(branch => (
            <option key={branch.name} value={branch.name}>{branch.name}</option>
            ))}
        </select>
          
    )
}