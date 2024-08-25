const express = require("express");
const path = require("path"); // Add this line to require the path module
const app = express();

app.use(express.json()); // To parse JSON requests
const port = process.env.PORT || 4000;
// Serve the frontend HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'exp.html')); // Ensure the path to index.html is correct
});

// POST method for /bfhl
app.post('/bfhl', (req, res) => {
    const { data } = req.body;

    // Hardcoded user details
    const fullName = "john_doe";
    const dob = "17091999"; // ddmmyyyy format
    const email = "john@xyz.com";
    const rollNumber = "ABCD123";

    const userId = `${fullName}_${dob}`;

    // Separate numbers and alphabets
    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));

    // Find the highest lowercase alphabet
    const highestLowercaseAlphabet = alphabets.filter(char => char === char.toLowerCase())
        .sort()
        .pop() || null;

    res.json({
        is_success: true,
        user_id: userId,
        email: email,
        roll_number: rollNumber,
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : []
    });
});

// GET method for /bfhl
app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

app.listen(port, () => {
    console.log("Listening on port 3000!");
});
