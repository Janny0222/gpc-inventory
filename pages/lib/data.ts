import mysql from 'mysql2/promise';
import  {InventoryList}  from './definition';
import {z} from 'zod';


const pool = mysql.createPool({
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
})

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string({
        invalid_type_error: 'Please select a customer',
    }),
    amount: z.coerce.number().gt(0, {message: 'Please enter an amount greater than $0.'}),
    status: z.enum(['pending', 'paid'], {
        invalid_type_error: 'Please select an invoice status',
    }),
    date: z.string(),
});


export async function fetchInventoryList(tableName: string): Promise<InventoryList[]> {
    let connection;
    try{
        connection = await pool.getConnection();
        console.log(`successful ${connection}`)
        const  query =  `SELECT * FROM ${tableName}`;
        const [rows] = await connection.query(query);
        return rows as InventoryList[];
        
    } catch (error){
        console.log("Error fetching data", error)
        return []
    } finally {
        if (connection) {
            connection.release();
        }
    }
}


export async function fetchGPCInventoryList() {
    let connection;
    try{
        connection = await pool.getConnection();
        console.log(`successful ${connection}`)
        const  query =  `SELECT * FROM gpc_inventory`;
        const [rows] = await connection.query(query, []);
        return rows as InventoryList[];
    } catch (error){
        console.log("Error fetching data", error)
        return []
    } finally {
        if (connection) {
            connection.release();
        }
    }
}

export async function fetchLSIInventoryList(){
    
    let connection;
    try{
        connection = await pool.getConnection(); 
        const query =  `SELECT * FROM lsi_inventory`;
        const [rows] = await connection.query(query);
        return rows as InventoryList[];
        
    } catch (error){
        console.log("Error fetching data", error)
        return []
    } finally {
        if (connection) {
            connection.release();
        }
    }
}



export async function deleteData(id: string){
  
    
}

const CreateInventory = FormSchema.omit({id: true, date: true});
const UpdateInventory = FormSchema.omit({id: true, date: true});
export type State = {
    errors?: {
        customerId?: string[];
        amount?: string[];
        status?: string[];
    };
    message?: string | null;
};

export async function createData(prevState: State, formData: FormData){
  
    
}

