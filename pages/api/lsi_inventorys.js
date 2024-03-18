import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const data = 'SELECT * FROM lsi_inventory';
      const values = [];
      const inventory = await query(data, values);

      res.status(200).json({ results: inventory });
    } catch (error) {
      console.error('Error fetching inventory:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  if (req.method === 'POST') {
    try {
      const pc_name = req.body.pc_name;
      const mac_address = req.body.mac_address;
      const computer_type = req.body.computer_type;
      const specs = req.body.specs;
      const supplier = req.body.supplier;
      const date_purchased = req.body.date_purchased;
      if (!pc_name || !mac_address || !computer_type || !specs || !date_purchased) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
      const insertQuery = 'INSERT INTO lsi_inventory (pc_name, mac_address, computer_type, specs, supplier, date_purchased) VALUES (?, ?, ?, ?, ?, ?)'
      const addInventory = await query({
        query: insertQuery,
        values: [pc_name, mac_address, computer_type, specs, supplier, date_purchased],
      });
      console.log(addInventory.insertId);
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
  }
}
