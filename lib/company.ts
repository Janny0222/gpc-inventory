
export const tableName = [
        {name: 'gpc_inventory', company: 'Greenstone Packaging Corporation.', table: 'gpc_mobile_inventory', displayName: "GPC"},
        {name: 'gkc_inventory', company: 'Greenkraft Corporation.', table: 'gkc_mobile_inventory', displayName: "GKC"},
        {name: 'lsi_inventory', company: 'Lamitek Systems Incorporated.', table: 'lsi_mobile_inventory', displayName: "LSI"},
        {name: 'gsrc_inventory', company: 'Green Siam Resources Corporation.', table: 'gsrc_mobile_inventory', displayName: "GSRC"},
    ]

export const allTables = [
    {name: 'gpc_inventory'},
    {name: 'gpc_sq_inventory'},
    {name: 'lsi_inventory'},
    {name: 'lsi_can_inventory'},
    {name: 'gkc_inventory'},
    {name: 'gsrc_inventory'},
]


export const branchName = [
    {company: 'gpc_inventory', branch: [
        {name: 'Balintawak'}, {name: 'SQ'} 
    ]},
    {company: 'lsi_inventory', branch: [
        {name: 'Valenzuela'}, {name: 'Canlubang'}
    ]}
]
export const branchTableMap: { [key: string]: string } = {
    Balintawak: 'gpc_inventory',
    SQ: 'gpc_sq_inventory',
    Valenzuela: 'lsi_inventory',
    Canlubang: 'lsi_can_inventory'
};