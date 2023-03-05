const express = require('express');
const pg = require('pg');
const path = require("path");
const cors = require('cors')
require('dotenv').config();


// Initial setup for the server.
const PORT = 3001;
const app = express();
app.use(express.static(path.resolve(__dirname, '../build')));
app.use(cors())


/**
 * GET endpoint queries all rows in the RDS database and returns an array with all of the values
 * found within the database.
 */
app.get("/data", async (req, res) => {
    let connection = `postgres://${process.env.RDS_USERNAME}:${process.env.RDS_PASSWORD}@${process.env.RDS_HOSTNAME}:${process.env.RDS_PORT}/${process.env.RDS_DBNAME}`;
   
    // Sets up the connection to the RDS database.
    let pgClient = new pg.Client(connection);
    await pgClient.connect();

    // Queries the database to select all values found in the table.
    let query = await pgClient.query("SELECT * from patient_data");

    // Close the database connection and return the data in JSON format.
    pgClient.end();
    res.json({ data: query['rows'] });
});

/**
 * GET endpoint that renders the React build for the user.
 */
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});


/**
 * Default listener for the Node server.
 */
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
