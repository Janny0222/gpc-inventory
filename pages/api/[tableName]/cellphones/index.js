import { query } from '@/lib/db';


export default async function handler (req, res) {
    const tableName = req.query.tableName;
    if (req.method === 'GET') {
        try {
            const values = []
            const data = `SELECT * FROM ${tableName}`
            const mobile = await query(data, values)

            res.status(200).json({ results: mobile})
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