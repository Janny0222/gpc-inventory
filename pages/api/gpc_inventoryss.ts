import mysql from 'mysql2/promise';
import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/lib/db';



export default async (req: NextApiRequest, res: NextApiResponse) => {
  
    try {
        const getData = "SELECT * FROM gpc_inventory";
        const values = [];
        const data = await query(getData);

        
      res.json({ results: data })
      
    } catch (error) {
        console.error('Error fetching data:', error);
        res.json({ error: 'Internal server error' }); // Return an error response
    }
};