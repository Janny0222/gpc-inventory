import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/lib/db';

export default async function handler(req, res) {
    const tableName = req.query.tableName;
    const {id} = req.query
    if (req.method === 'GET') {
      try {
          if (id) { // If ID is provided, fetch specific data
              const data = `SELECT * FROM ${tableName} WHERE id = ?`;
              const values = [id];
              const inventory = await query(data, values);

              if (inventory.length === 0) {
                  return res.status(404).json({ error: 'Inventory not found' });
              }

              res.status(200).json({ results: inventory });
            //   console.log(id)
            //   console.log({results: inventory})
          }
      } catch (error) {
          
          res.status(500).json({ error: 'Internal Server Error' });
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
  } else if (req.method === 'PUT'){

    try {
      const {id} = req.query;
      const {pc_name, mac_address, computer_type, specs, supplier, date_purchased} = req.body

      if(!id || !pc_name || !mac_address){
        return res.status(400).json({ error: 'Missing required fields' })
      }
      const updateResult = await query
      (`UPDATE ${tableName} SET pc_name=?, mac_address=?, computer_type=?, specs=?, supplier=?, date_purchased=? WHERE id=?`,
      [pc_name, mac_address, computer_type, specs, supplier, date_purchased, id]);
      
      if(updateResult.affectedRows > 0){
        res.status(200).json({response: { message: 'success', updatedItem: id }})
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