import { connPool } from "./connect.js";

/**
 * The function 'sleep' returns a promise that resolves after a specified number of milliseconds.
 * @param ms - the 'ms' parameter in the 'sleep' function represents the number of milliseconds for
 * which the function will pause execution before resolving the promise.
 * @returns The 'sleep' function is returning a Promise.
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * The function 'executeQuery' asynchronously executes a query using a connection from a pool, logs the
 * result, handles errors, and releases the connection after a delay.
 * @param pool - The 'pool' parameter in the 'executeQuery' function is typically an instance of a
 * connection pool provided by a database library such as 'mysql' or 'pg'. Connection pools are used to
 * manage and reuse database connections efficiently in applications. They help in improving
 * performance by reducing the overhead of creating and
 * @param query - The 'query' parameter in the 'executeQuery' function is a SQL query string that you
 * want to execute using the provided 'pool' connection pool. This query will be sent to the database
 * for execution, and the results will be logged to the console if the query is successful. If there is
 * an error, it will be caught and logged.
 */

async function executeQuery(pool, query) {
    let connection;
    try {
        connection = await pool.getConnection();
        const [result] = await connection.execute(query);
        console.log(result);
    } catch (error) {
        console.error('Error executing query:', error);
    } finally {
        await sleep(2000);
        if (connection) connection.release();
    }
}

// Function to create a new person
export const createPerson = async ({ personName, personLast_name, personNumber, documentTypedFk, statusFk }) => { // Añadir `statusFk`
    const sqlQuery = "INSERT INTO person (personName, personLast_name, personNumber, documentTypedFk, statusFk) VALUES (?, ?, ?, ?, ?)"; // Incluir `statusFk` en la consulta
    const [result] = await connPool.query(sqlQuery, [personName, personLast_name, personNumber, documentTypedFk, statusFk]); // Proporcionar `statusFk` como parámetro
    return result.insertId;
};

// Function to get all persons
export const getAllPersons = async () => {
    const [rows] = await connPool.query("SELECT * FROM person");
    return rows;
};

// Function to get a person by ID
export const getPersonById = async (id) => {
    const [rows] = await connPool.query("SELECT * FROM person WHERE personID = ?", [id]);
    return rows[0];
};

// Function to update a person
export const updatePerson = async ({ id, personName, personLast_name, personNumber, documentTypedFk }) => {
    const sqlQuery = "UPDATE person SET personName = ?, personLast_name = ?, personNumber = ?, documentTypedFk = ? WHERE personID = ?";
    const [result] = await connPool.query(sqlQuery, [personName, personLast_name, personNumber, documentTypedFk, id]);
    return result.affectedRows;
};

// Function to delete a person
export const deletePerson = async (id) => {
    const [result] = await connPool.query("DELETE FROM person WHERE personID = ?", [id]);
    return result.affectedRows;
};

// Function to get all statuses
export const getAllStatuses = async () => {
    const [rows] = await connPool.query("SELECT * FROM user_status");
    return rows;
};

// Function to get a status by ID
export const getStatusById = async (id) => {
    const [rows] = await connPool.query("SELECT * FROM user_status WHERE statusId = ?", [id]);
    return rows[0];
};

// List of queries to create the initial tables
const queries = [
    'CREATE TABLE IF NOT EXISTS document_type (documentTypedId INT(11) AUTO_INCREMENT PRIMARY KEY, documentTypedName VARCHAR(20) NOT NULL UNIQUE);',
    'CREATE TABLE IF NOT EXISTS user_status (statusId INT(11) AUTO_INCREMENT PRIMARY KEY, statusName VARCHAR(50) NOT NULL UNIQUE);',
    'CREATE TABLE IF NOT EXISTS person (personID INT(11) AUTO_INCREMENT PRIMARY KEY, personName VARCHAR(20) NOT NULL, personLast_name VARCHAR(20) NOT NULL, personNumber VARCHAR(10) NOT NULL, documentTypedFk INT(11) NOT NULL, statusFk INT(11), FOREIGN KEY (documentTypedFk) REFERENCES document_type(documentTypedId), FOREIGN KEY (statusFk) REFERENCES user_status(statusId));'
];

// Execute each query synchronously
(async () => {
    for (let query of queries) {
        await executeQuery(connPool, query);
    }
})();
