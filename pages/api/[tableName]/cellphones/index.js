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
              data = `SELECT * FROM ${tableName} ORDER BY date_created desc LIMIT ? OFFSET ?`;
              values = [itemPerPage, (page - 1) * itemPerPage]
              }
            const [inventory, totalCountRows] = await Promise.all([
              query(data, values),
              query(`SELECT COUNT(*) as total FROM ${tableName}`)
            ]);
            const totalCount = totalCountRows[0].total;
            const totalPages = Math.ceil(totalCount / itemPerPage)
            res.status(200).json({ results: inventory, totalPages})
        } catch ( error ) {
            res.status(500).json({ error: 'Internal Server Errors' });
        }
    } else if (req.method === 'POST') {
      try {
        const assigned_to = req.body.assigned_to;
        const department = req.body.department
        const brand = req.body.brand;
        const model_specs = req.body.model_specs;
        const imei = req.body.imei;
        const number = req.body.number;
        const email_password = req.body.email_password;
        const serial_number = req.body.serial_number
        const inclusion = req.body.inclusion
        const date_issued = req.body.date_issued
        const date_purchased = req.body.date_purchased
        if (!assigned_to || !brand) {
          return res.status(400).json({ error: 'Missing required fields' });
        }
        const addInventory = await query(`INSERT INTO ${tableName} (assigned_to, department, brand, model_specs, serial_number, imei, number, email_password, inclusion, date_issued, date_purchased) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [assigned_to, department, brand, model_specs, serial_number, imei, number, email_password, inclusion, date_issued, date_purchased],);
        let message;
        if (addInventory.insertId) {
          message = 'success';
        } else {
          message = 'failed';
        }
  
        let inventory = {
          id: addInventory.insertId,
          assigned_to: assigned_to,
          department: department,
          brand: brand,
          model_specs: model_specs,
          imei: imei,
          number: number,
          email_password: email_password,
          serial_number: serial_number,
          inclusion: inclusion,
          date_issued: date_issued,
          date_purchased: date_purchased
        };
  
        res.status(200).json({ response: { message: message, results: inventory } });
      } catch (error) {
        console.error('Error adding inventory:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
}