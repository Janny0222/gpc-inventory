import mysql from 'mysql2/promise'

export async function query(query, values = []) {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    });
    
    try {
        const [results] = await connection.query(query, values);
        connection.end();
        return results;
    } catch (error) {
        throw new Error(error.message);
    }
}