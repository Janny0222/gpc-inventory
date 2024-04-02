import { query } from '@/lib/db';
import { tableName } from '../lib/company';

export default async function handler(req, res) {
    const page = req.query.page || 1;
    const itemPerPage = 2;

    if (req.method === 'GET') {
        try {
            let inventory = [];
            let totalCount = 0;

            for (const table of tableName) {
                const [tableInventory, tableTotalCountRows] = await Promise.all([
                    query(`SELECT *, '${table.displayName}' AS source_table FROM ${table.table} WHERE date_issued <= DATE_SUB(NOW(), INTERVAL 5 YEAR) ORDER BY date_issued DESC LIMIT ? OFFSET ?`, [itemPerPage, (page - 1) * itemPerPage]),
                    query(`SELECT COUNT(*) AS total FROM ${table.table} WHERE date_issued <= DATE_SUB(NOW(), INTERVAL 5 YEAR)`)
                ]);
                console.log("result for tableInventory Query:", tableInventory)
                inventory = inventory.concat(tableInventory);
                totalCount += tableTotalCountRows[0].total;
            }

            const totalPages = Math.ceil(totalCount / (tableName.length * itemPerPage));
            console.log("cellphone length: ", inventory.length);
            res.status(200).json({ results: inventory, totalPages });
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
