import { NextApiRequest, NextApiResponse } from "next";
import { fetchGPCInventoryList } from "./data";


export let tableName = [
        {name: 'gpc_inventory', displayName: "GPC"},
        {name: 'gkc_inventory', displayName: "GKC"},
        {name: 'lsi_inventory', displayName: "LSI"},
        {name: 'gsrc_inventory', displayName: "GSRC"},
    ]
