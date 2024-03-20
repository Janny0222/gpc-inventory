import mysql from 'mysql2/promise'

export async function query(query, values = []) {
    // if (!query) {
    //     throw new Error('SQL query string is required');
    // }

    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    });
    
    try {
        const [results] = await connection.query(query, values);
        
        return results;
    } catch (error) {
        throw new Error(error.message);
    } finally {
        connection.end();
    }
}