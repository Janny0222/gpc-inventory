
import { NextApiRequest, NextApiResponse } from 'next';
import {query} from '@/lib/db'


export default async function handler (req, res) {
    
    if(req.method === "GET"){
        const data = "SELECT * FROM lsi_inventory"
        const values = []
        const inventory = await query(data, values); 

     res.status(200).json({results: inventory});
    }

    if(req.method === "POST"){
        const pc_name = req.body.pc_name;
        const mac_address = req.body.mac_address;
        const computer_type = req.body.computer_type;
        const specs = req.body.specs;
        const supplier = req.body.supplier;
        const date_purchased = req.body.date_purchased;

        const addInventory = await query({
            query: "INSERT INTO lsi_inventory (pc_name, mac_address, computer_type, specs, supplier, date_purchased) VALUES (?)",
            values:[ pc_name, mac_address, computer_type, specs, supplier, date_purchased],
        });
        if(addInventory.insertId){
            message= "success"
        }else {
            message="failed"
        }
        res.status(200).json({results: inventory});
    }

};