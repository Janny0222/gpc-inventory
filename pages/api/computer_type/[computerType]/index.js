import { query } from '@/lib/db';

export default async function handler(req, res) {
    const computerType = req.query.computerType
  try {
    const values = [`%${computerType}%`]
    const gpcresult = await query('SELECT COUNT(*) AS count FROM gpc_inventory WHERE computer_type LIKE ?', values);
    const lsiresult = await query('SELECT COUNT(*) AS count FROM lsi_inventory WHERE computer_type LIKE ?', values);
    
    const count = gpcresult[0].count + lsiresult[0].count
    res.status(200).json({ count });
  } catch (error) {
    console.error('Error fetching count data:', error);
    res.status(500).json({ error: 'Failed to fetch count datas' });
  }
}