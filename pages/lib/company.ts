import { NextApiRequest, NextApiResponse } from "next";
import { fetchGPCInventoryList } from "./data";


export let tableName = [
        {name: 'gpc_inventory', company: 'Greenstone Packaging Corporation.', table: 'gpc_mobile_inventory', displayName: "GPC"},
        {name: 'gkc_inventory', company: 'Greenkraft Corporation.', table: 'gkc_mobile_inventory', displayName: "GKC"},
        {name: 'lsi_inventory', company: 'Lamitek Systems Incorporated.', table: 'lsi_mobile_inventory', displayName: "LSI"},
        {name: 'gsrc_inventory', company: 'Green Siam Resources Corporation.', table: 'gsrc_mobile_inventory', displayName: "GSRC"},
    ]


// export let mobileTableName = [
//     {name: 'gpc_inventory', table: 'gpc_mobile_inventory', displayName: "GPC"},
//     {name: 'gkc_inventory', table: 'gkc_mobile_inventory', displayName: "GKC"},
//     {name: 'lsi_inventory', table: 'lsi_mobile_inventory', displayName: "LSI"},
//     {name: 'gsrc_inventory', table:'gsrc_mobile_inventory', displayName: "GSRC"},
// ]