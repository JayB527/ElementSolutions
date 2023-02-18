const express = require('express');
const cors = require('cors');

const PORT = 3001;
const app = express();
app.use(cors());

// Testing GET endpoint for receiving messages from server.
app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});