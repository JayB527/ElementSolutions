const express = require('express');
const pg = require('pg');
const path = require('path');
const cors = require('cors');
const { GetObjectCommand, S3Client } = require('@aws-sdk/client-s3');
require('dotenv').config();

// Initial setup for the server.
const PORT = 3001;
const app = express();
app.use(express.static(path.resolve(__dirname, '../build')));
app.use(cors())


/**
 * GET endpoint queries the S3 bucket with the results CSV file of the rules engine.
 * It returns an array with all of the rows found in the CSV file.
 */
app.get("/table", async (req, res) => {
    const client = new S3Client({})

    // Define the bucket and file to get from S3
    const command = new GetObjectCommand({
        Bucket: "test-fhir-data",
        Key: "results.csv"
    });

    try {
        const response = await client.send(command);
        const results = await response.Body.transformToString();
        
        // Get an array of each line in the CSV
        let rowData = results.split('\n');

        // Go through each line and create another array to store each comma-separated valued in its own index
        for (let i = 0; i < rowData.length; i++) {
            rowData[i] = rowData[i].split(',');
        }

        // Save the first index as it contains the header information
        let colData = rowData.shift();
       
        res.json({ 
            rowData: rowData,
            colData: colData
        });

    } catch (err) {
        console.error(err);
    }
});


/**
 * GET endpoint queries all the rows in the rules_data table in the RDS database and returns an array with
 * all of the values found within the database.
 */
app.get("/rules", async (req, res) => {
    let connection = `postgres://${process.env.RDS_USERNAME}:${process.env.RDS_PASSWORD}@${process.env.RDS_HOSTNAME}:${process.env.RDS_PORT}/${process.env.RDS_DBNAME}`;

    try {
        // Sets up the connection to the RDS database.
        let pgClient = new pg.Client(connection);
        await pgClient.connect();

        // Queries the database to select all values found in the table.
        let query = await pgClient.query("SELECT * from rules_data");

        // Close the database connection and return the data in JSON format.
        pgClient.end();
        res.json({ data: query['rows'] });

    } catch (err) {
        console.error(err);
    }
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
