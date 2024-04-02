import { query } from '@/lib/db';


export default async function handler (req, res) {
    const tableName = req.query.tableName;
    const searchQuery = req.query.query;
    const page = req.query.page || 1
    const itemPerPage = 7;

    if (req.method === 'GET') {
        try {
          let data;
          let values = []
            if(searchQuery) {
              data = `SELECT * FROM ${tableName}
              WHERE assigned_to LIKE ? OR imei LIKE ? OR brand LIKE ? LIMIT 7`;
              values = [`%${searchQuery}%`, `%${searchQuery}%`, `%${searchQuery}%`, itemPerPage, (page - 1) * itemPerPage]
            
            } else {
              data = `SELECT * FROM ${tableName} LIMIT ? OFFSET ?`;
              values = [itemPerPage, (page - 1) * itemPerPage]
              }
            const [inventory, totalCountRows] = await Promise.all([
              query(data, values),
              query(`SELECT COUNT(*) as total FROM ${tableName}`)
            ]);
            const totalCount = totalCountRows[0].total;
            const totalPages = Math.ceil(totalCount / itemPerPage)
            console.log(console.log("cellphone length: ", inventory.length))
            res.status(200).json({ results: inventory, totalPages})
        } catch ( error ) {
            res.status(500).json({ error: 'Internal Server Errors' });
        }
    } else if (req.method === 'POST') {
        try {
          const assigned_to = req.body.assigned_to;
          const id = req.body.id
          const department = req.body.department;
          const brand = req.body.brand;
          const model_specs = req.body.model_specs;
          const imei = req.body.imei
          const serial_number = req.body.imei
          const inclusion = req.body.inclusion
          const date_issued = req.body.date_issued
          if (!assigned_to || !department) {
            return res.status(400).json({ error: 'Missing required fields' });
          }
          const addInventory = await query(`INSERT INTO ${tableName} 
          (assigned_to, department, brand, model_specs, imei, serial_number, inclusion, date_issued) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, 
          [assigned_to, department, brand, model_specs, imei, serial_number, inclusion, date_issued],);
          let message;
          console.log(addInventory.insertId)
          if (addInventory.insertId) {
            message = 'success';
          } else {
            message = 'failed';
          }
          let mobileinventory = {
            id: addInventory.insertId,
            assigned_to: assigned_to,
            department: department,
            brand: brand,
            imei: imei,
            serial_number: serial_number,
            inclusion: inclusion,
            date_issued: date_issued,
          };
    
          res.status(200).json({ response: { message: message, results: mobileinventory } });
        } catch (error) {
          console.error('Error adding inventory:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }
}