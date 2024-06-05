

const mysql = require('mysql2/promise')
require('dotenv').config();

async function createDatabase(){
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    });
    try {
        await connection.execute(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_DATABASE}`)
        
        console.log("Successfully created a Database")
        
    } catch (error) {
        console.error("Error Creating Database: ", error)
    } finally {
        await connection.end()
    }
}

async function seedDatabase(){
    const db = await mysql.createConnection({
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    });
    try {
        

        // await db.changeUser({database: process.env.DB_DATABASE})

        // Creating table for GPC CCP Inventory
        const queries = [`
        CREATE TABLE IF NOT EXISTS gpc_inventory (
            id INT AUTO_INCREMENT PRIMARY KEY,
            pc_name VARCHAR(255),
            name VARCHAR(255),
            ip_address VARCHAR(255),
            mac_address VARCHAR(255),
            computer_type VARCHAR(255),
            monitor VARCHAR(255),
            specs VARCHAR(255),
            department VARCHAR(255),
            anydesk VARCHAR(255),
            supplier VARCHAR(255),
            comment VARCHAR(255),
            date_purchased VARCHAR(255),
            date_installed VARCHAR(255),
            date_created TIMESTAMP
        )
        `,
        // Creating table for GPC SQ Inventory
        `
        CREATE TABLE IF NOT EXISTS gpc_sq_inventory (
            id INT AUTO_INCREMENT PRIMARY KEY,
            pc_name VARCHAR(255),
            name VARCHAR(255),
            ip_address VARCHAR(255),
            mac_address VARCHAR(255),
            computer_type VARCHAR(255),
            monitor VARCHAR(255),
            specs VARCHAR(255),
            department VARCHAR(255),
            anydesk VARCHAR(255),
            supplier VARCHAR(255),
            comment VARCHAR(255),
            date_purchased VARCHAR(255),
            date_installed VARCHAR(255),
            date_created TIMESTAMP
        )
        `,
        // Creating table for LSI Valenzuela Inventory
        `
        CREATE TABLE IF NOT EXISTS lsi_inventory (
            id INT AUTO_INCREMENT PRIMARY KEY,
            pc_name VARCHAR(255),
            name VARCHAR(255),
            ip_address VARCHAR(255),
            mac_address VARCHAR(255),
            computer_type VARCHAR(255),
            monitor VARCHAR(255),
            specs VARCHAR(255),
            department VARCHAR(255),
            anydesk VARCHAR(255),
            supplier VARCHAR(255),
            comment VARCHAR(255),
            date_purchased VARCHAR(255),
            date_installed VARCHAR(255),
            date_created TIMESTAMP
        )
        `,
        // Creating table for LSI Canlubang Inventory
        `
        CREATE TABLE IF NOT EXISTS lsi_can_inventory (
            id INT AUTO_INCREMENT PRIMARY KEY,
            pc_name VARCHAR(255),
            name VARCHAR(255),
            ip_address VARCHAR(255),
            mac_address VARCHAR(255),
            computer_type VARCHAR(255),
            monitor VARCHAR(255),
            specs VARCHAR(255),
            department VARCHAR(255),
            anydesk VARCHAR(255),
            supplier VARCHAR(255),
            comment VARCHAR(255),
            date_purchased VARCHAR(255),
            date_installed VARCHAR(255),
            date_created TIMESTAMP
        )
        `,
        // Creating table for GKC Inventory
        `
        CREATE TABLE IF NOT EXISTS gkc_inventory (
            id INT AUTO_INCREMENT PRIMARY KEY,
            pc_name VARCHAR(255),
            name VARCHAR(255),
            ip_address VARCHAR(255),
            mac_address VARCHAR(255),
            computer_type VARCHAR(255),
            monitor VARCHAR(255),
            specs VARCHAR(255),
            department VARCHAR(255),
            anydesk VARCHAR(255),
            supplier VARCHAR(255),
            comment VARCHAR(255),
            date_purchased VARCHAR(255),
            date_installed VARCHAR(255),
            date_created TIMESTAMP
        )
        `,
        // Creating table for GSRC Inventory
        `
        CREATE TABLE IF NOT EXISTS gsrc_inventory (
            id INT AUTO_INCREMENT PRIMARY KEY,
            pc_name VARCHAR(255),
            name VARCHAR(255),
            ip_address VARCHAR(255),
            mac_address VARCHAR(255),
            computer_type VARCHAR(255),
            monitor VARCHAR(255),
            specs VARCHAR(255),
            department VARCHAR(255),
            anydesk VARCHAR(255),
            supplier VARCHAR(255),
            comment VARCHAR(255),
            date_purchased VARCHAR(255),
            date_installed VARCHAR(255),
            date_created TIMESTAMP
        )
        `,
        // Creating table for GPC Mobile
        `
        CREATE TABLE IF NOT EXISTS gpc_mobile_inventory (
            id INT AUTO_INCREMENT PRIMARY KEY,
            assigned_to VARCHAR(255),
            department VARCHAR(255),
            brand VARCHAR(255),
            model_specs VARCHAR(255),
            serial_number VARCHAR(255),
            imei VARCHAR(255),
            number VARCHAR(255),
            email_password VARCHAR(255),
            inclusion VARCHAR(255),
            date_issued VARCHAR(255),
            date_purchased VARCHAR(255),
            date_created TIMESTAMP
        )
        `,
        // Creating table for GKC Mobile
        `
        CREATE TABLE IF NOT EXISTS gkc_mobile_inventory (
            id INT AUTO_INCREMENT PRIMARY KEY,
            assigned_to VARCHAR(255),
            department VARCHAR(255),
            brand VARCHAR(255),
            model_specs VARCHAR(255),
            serial_number VARCHAR(255),
            imei VARCHAR(255),
            number VARCHAR(255),
            email_password VARCHAR(255),
            inclusion VARCHAR(255),
            date_issued VARCHAR(255),
            date_purchased VARCHAR(255),
            date_created TIMESTAMP
        )
        `,
        // Creating table for LSI Mobile
        `
        CREATE TABLE IF NOT EXISTS lsi_mobile_inventory (
            id INT AUTO_INCREMENT PRIMARY KEY,
            assigned_to VARCHAR(255),
            department VARCHAR(255),
            brand VARCHAR(255),
            model_specs VARCHAR(255),
            serial_number VARCHAR(255),
            imei VARCHAR(255),
            number VARCHAR(255),
            email_password VARCHAR(255),
            inclusion VARCHAR(255),
            date_issued VARCHAR(255),
            date_purchased VARCHAR(255),
            date_created TIMESTAMP
        )
        `,
        // Creating table for GSRC Mobile
        `
        CREATE TABLE IF NOT EXISTS gsrc_mobile_inventory (
            id INT AUTO_INCREMENT PRIMARY KEY,
            assigned_to VARCHAR(255),
            department VARCHAR(255),
            brand VARCHAR(255),
            model_specs VARCHAR(255),
            serial_number VARCHAR(255),
            imei VARCHAR(255),
            number VARCHAR(255),
            email_password VARCHAR(255),
            inclusion VARCHAR(255),
            date_issued VARCHAR(255),
            date_purchased VARCHAR(255),
            date_created TIMESTAMP
        )
        `,
        // Creating table for "Users"
        `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255),
            email VARCHAR(255),
            password VARCHAR(255),
            date_created TIMESTAMP
        )
        `,
        // Creating table for "Users"
        `
        CREATE TABLE IF NOT EXISTS statuses (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255)
        )
        `,
        // Creating table for GPC CCP Server Accounts
        `
        CREATE TABLE IF NOT EXISTS gpc_accounts (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255),
            department VARCHAR(255),
            username VARCHAR(255),
            password VARCHAR(255),
            notes VARCHAR(255),
            is_active_id INT(11),
            CONSTRAINT fk_is_active_id_gpc_ccp
                FOREIGN KEY(is_active_id) REFERENCES statuses(id)
                ON UPDATE CASCADE
                ON DELETE RESTRICT,
            date_created TIMESTAMP
        )   
        `,
        // Creating table for GPC SQ Server Accounts
        `
        CREATE TABLE IF NOT EXISTS gpc_sq_accounts (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255),
            department VARCHAR(255),
            username VARCHAR(255),
            password VARCHAR(255),
            notes VARCHAR(255),
            is_active_id INT,
            CONSTRAINT fk_is_active_id_gpc_sq
                FOREIGN KEY(is_active_id) REFERENCES statuses(id)
                ON UPDATE CASCADE
                ON DELETE RESTRICT,
            date_created TIMESTAMP
        )
        `,
        // Creating table for LSI Valenzuela Server Accounts
        `
        CREATE TABLE IF NOT EXISTS lsi_accounts (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255),
            department VARCHAR(255),
            username VARCHAR(255),
            password VARCHAR(255),
            notes VARCHAR(255),
            is_active_id INT,
            CONSTRAINT fk_is_active_id_lsi_val
                FOREIGN KEY(is_active_id) REFERENCES statuses(id)
                ON UPDATE CASCADE
                ON DELETE RESTRICT,
            date_created TIMESTAMP
        )
        `,
        // Creating table for LSI Canlubang Server Accounts
        `
        CREATE TABLE IF NOT EXISTS lsi_can_accounts (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255),
            department VARCHAR(255),
            username VARCHAR(255),
            password VARCHAR(255),
            notes VARCHAR(255),
            is_active_id INT,
            CONSTRAINT fk_is_active_id_lsi_can
                FOREIGN KEY(is_active_id) REFERENCES statuses(id)
                ON UPDATE CASCADE
                ON DELETE RESTRICT,
            date_created TIMESTAMP
        )
        `,
        // Creating table for GKC Server Accounts
        `
        CREATE TABLE IF NOT EXISTS gkc_accounts (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255),
            department VARCHAR(255),
            username VARCHAR(255),
            password VARCHAR(255),
            notes VARCHAR(255),
            is_active_id INT,
            CONSTRAINT fk_is_active_id_gkc
                FOREIGN KEY(is_active_id) REFERENCES statuses(id)
                ON UPDATE CASCADE
                ON DELETE RESTRICT,
            date_created TIMESTAMP
        )
        `,
        // Creating table for GSRC Server Accounts
        `
        CREATE TABLE IF NOT EXISTS gsrc_accounts (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255),
            department VARCHAR(255),
            username VARCHAR(255),
            password VARCHAR(255),
            notes VARCHAR(255),
            is_active_id INT,
            CONSTRAINT fk_is_active_id_gsrc
                FOREIGN KEY(is_active_id) REFERENCES statuses(id)
                ON UPDATE CASCADE
                ON DELETE RESTRICT,
            date_created TIMESTAMP
        )
        `,
        // Creating table for GPC Printer
        `
        CREATE TABLE IF NOT EXISTS gpc_printer (
            id INT AUTO_INCREMENT PRIMARY KEY,
            printer_name VARCHAR(255),
            assigned_to VARCHAR(255),
            manufacturer VARCHAR(255),
            model VARCHAR(255),
            ink_type VARCHAR(255),
            serial_number VARCHAR(255),
            description VARCHAR(255),
            department VARCHAR(255),
            comment VARCHAR(255),
            is_active_id INT,
            date_installed VARCHAR(255),
            date_pullout VARCHAR(255),
            date_purchased VARCHAR(255),
            CONSTRAINT fk_gpc_printer_status
                FOREIGN KEY(is_active_id) REFERENCES statuses(id)
                ON UPDATE CASCADE
                ON DELETE RESTRICT,
            date_created TIMESTAMP
        )
        `,
        `
        CREATE TABLE IF NOT EXISTS gpc_sq_printer (
            id INT AUTO_INCREMENT PRIMARY KEY,
            printer_name VARCHAR(255),
            assigned_to VARCHAR(255),
            manufacturer VARCHAR(255),
            model VARCHAR(255),
            ink_type VARCHAR(255),
            serial_number VARCHAR(255),
            description VARCHAR(255),
            department VARCHAR(255),
            comment VARCHAR(255),
            is_active_id INT,
            date_installed VARCHAR(255),
            date_pullout VARCHAR(255),
            date_purchased VARCHAR(255),
            CONSTRAINT fk_gpcsq_printer_status
                FOREIGN KEY(is_active_id) REFERENCES statuses(id)
                ON UPDATE CASCADE
                ON DELETE RESTRICT,
            date_created TIMESTAMP
        )
        `,
        `
        CREATE TABLE IF NOT EXISTS lsi_printer (
            id INT AUTO_INCREMENT PRIMARY KEY,
            printer_name VARCHAR(255),
            assigned_to VARCHAR(255),
            manufacturer VARCHAR(255),
            model VARCHAR(255),
            ink_type VARCHAR(255),
            serial_number VARCHAR(255),
            description VARCHAR(255),
            department VARCHAR(255),
            comment VARCHAR(255),
            is_active_id INT,
            date_installed VARCHAR(255),
            date_pullout VARCHAR(255),
            date_purchased VARCHAR(255),
            CONSTRAINT fk_lsi_printer_status
                FOREIGN KEY(is_active_id) REFERENCES statuses(id)
                ON UPDATE CASCADE
                ON DELETE RESTRICT,
            date_created TIMESTAMP
        )
        `,
        `
        CREATE TABLE IF NOT EXISTS lsi_can_printer (
            id INT AUTO_INCREMENT PRIMARY KEY,
            printer_name VARCHAR(255),
            assigned_to VARCHAR(255),
            manufacturer VARCHAR(255),
            model VARCHAR(255),
            ink_type VARCHAR(255),
            serial_number VARCHAR(255),
            description VARCHAR(255),
            department VARCHAR(255),
            comment VARCHAR(255),
            is_active_id INT,
            date_installed VARCHAR(255),
            date_pullout VARCHAR(255),
            date_purchased VARCHAR(255),
            CONSTRAINT fk_gpccan_printer_status
                FOREIGN KEY(is_active_id) REFERENCES statuses(id)
                ON UPDATE CASCADE
                ON DELETE RESTRICT,
            date_created TIMESTAMP
        )
        `,
        `
        CREATE TABLE IF NOT EXISTS gkc_printer (
            id INT AUTO_INCREMENT PRIMARY KEY,
            printer_name VARCHAR(255),
            assigned_to VARCHAR(255),
            manufacturer VARCHAR(255),
            model VARCHAR(255),
            ink_type VARCHAR(255),
            serial_number VARCHAR(255),
            description VARCHAR(255),
            department VARCHAR(255),
            comment VARCHAR(255),
            is_active_id INT,
            date_installed VARCHAR(255),
            date_pullout VARCHAR(255),
            date_purchased VARCHAR(255),
            CONSTRAINT fk_gkc_printer_status
                FOREIGN KEY(is_active_id) REFERENCES statuses(id)
                ON UPDATE CASCADE
                ON DELETE RESTRICT,
            date_created TIMESTAMP
        )
        `,
        `
        CREATE TABLE IF NOT EXISTS gsrc_printer (
            id INT AUTO_INCREMENT PRIMARY KEY,
            printer_name VARCHAR(255),
            assigned_to VARCHAR(255),
            manufacturer VARCHAR(255),
            model VARCHAR(255),
            ink_type VARCHAR(255),
            serial_number VARCHAR(255),
            description VARCHAR(255),
            department VARCHAR(255),
            comment VARCHAR(255),
            is_active_id INT,
            date_installed VARCHAR(255),
            date_pullout VARCHAR(255),
            date_purchased VARCHAR(255),
            CONSTRAINT fk_gsrc_printer_status
                FOREIGN KEY(is_active_id) REFERENCES statuses(id)
                ON UPDATE CASCADE
                ON DELETE RESTRICT,
            date_created TIMESTAMP
        )
        `,
        `
        CREATE TABLE IF NOT EXISTS deliver (
            id INT AUTO_INCREMENT PRIMARY KEY,
            quantity INT(11),
            description VARCHAR(255),
            location VARCHAR(255),
            name VARCHAR(255),
            date_acquired VARCHAR(255),
            date_created TIMESTAMP
        )
        `
        ]
        for(const query of queries){
            await db.query(query);
        }
        
        console.log("Table created Successfully");
    } catch (error){
        console.log("Error creating table", error)
    } finally {
        await db.end();
    }
}

async function handler(){
    await createDatabase()
    await seedDatabase() 
}
handler();