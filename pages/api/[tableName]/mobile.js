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
    }
}