
import { query } from '@/lib/db';

export default async function handler(req, res) {
    const tableName = req.query.tableName;
    const searchQuery = req.query.query
  if (req.method === 'GET') {
    try {
      let data;
      let values = [];
      if(searchQuery){
        data = `SELECT * FROM ${tableName} 
        WHERE pc_name LIKE ? OR computer_type LIKE ?`;
        values = [`%${searchQuery}%`, `%${searchQuery}%`]
      } else {
        data = `SELECT * FROM ${tableName}`
      }
      const inventory = await query(data, values);

      res.status(200).json({ results: inventory });
    } catch (error) {
      console.error('Error fetching inventory:', error);
      res.status(500).json({ error: 'Internal Server Errors' });
    }
  } else if (req.method === 'POST') {
    try {
      const pc_name = req.body.pc_name;
      const id = req.body.id
      const mac_address = req.body.mac_address;
      const computer_type = req.body.computer_type;
      const specs = req.body.specs;
      const supplier = req.body.supplier
      const date_purchased = req.body.date_purchased
      if (!pc_name || !mac_address) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
      const addInventory = await query(`INSERT INTO ${tableName} (pc_name, mac_address, computer_type, specs, supplier, date_purchased) VALUES (?, ?, ?, ?, ?, ?)`, [pc_name, mac_address, computer_type, specs, supplier, date_purchased],);
      let message;
      if (addInventory.insertId) {
        message = 'success';
      } else {
        message = 'failed';
      }

      let inventory = {
        id: addInventory.insertId,
        pc_name: pc_name,
        computer_type: computer_type,
        specs: specs,
        supplier: supplier,
        date_purchased: date_purchased,
      };

      res.status(200).json({ response: { message: message, results: inventory } });
    } catch (error) {
      console.error('Error adding inventory:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (method === 'PUT'){

    try {
      const {id} = req.query;
      const {pc_name, mac_address, computer_type, specs, supplier, date_purchased} = req.body

      if(!id || !pc_name || !mac_address){
        return res.status(400).json({ error: 'Missing required fields' })
      }
      const updateResult = await query
      (`UPDATE ${tableName} SET pc_name=?, mac_address=?, computer_type=?, specs=?, supplier=?, date_purchase=? WHERE id=?`,
      [pc_name, mac_address, computer_type, specs, supplier, date_purchased, id]);

      if(updateResult.affectedRows > 0){
        res.status(200).json({ message: 'success', updatedItem: id })
      } else {
        res.status(404).json({ error: 'Item not found or not updated '});
      }
    } catch (error){
      console.error('Error updating inventory: ', error);
      res.status(500).json({ error: 'Internal Server Error'})
    }
  } else {
    res.status(405).json({ error: 'Method not allowed '})
  }
}