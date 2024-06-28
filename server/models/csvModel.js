const mysql = require('mysql2/promise');

async function connect() {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'your_username',
            password: 'your_password',
            database: 'your_database_name'
        });
        return connection;
    } catch (error) {
        console.error('Error connecting to MySQL database: ' + error.stack);
        throw error;
    }
}

async function insertData(data) {
    const connection = await connect();
    try {
        // Assuming your table structure matches the fields in your Excel sheet
        const sql = 'INSERT INTO student_biodata (first_name, middle_name, last_name, email, phone, gender, unique_id, jamb_number, level, department, faculty,) VALUES ?';
        const values = data.map(obj => [obj.student_number, obj.password, obj.email, obj.level, obj.department, obj.faculty, obj.hostel, obj.date_of_birth]);

        const [results, fields] = await connection.query(sql, [values]);
        return results;
    } catch (error) {
        console.error('Error inserting data into MySQL: ' + error.stack);
        throw error;
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

module.exports = {
    insertData
};
