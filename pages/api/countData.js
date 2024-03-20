import { query } from '@/lib/db';

export default async function handler(req, res) {
  try {
    const values = ['%laptop%']
    const result = await query('SELECT COUNT(*) AS count FROM gpc_inventory WHERE computer_type LIKE ?', values);
    
    const count = result[0].count;
    res.status(200).json({ count });
  } catch (error) {
    console.error('Error fetching count data:', error);
    res.status(500).json({ error: 'Failed to fetch count datas' });
  }
}