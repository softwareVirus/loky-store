const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));

// Handle all other routes by serving the index.html file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


console.log(path.join(__dirname, 'dist', 'index.html'), app)
// Start the server on port 80
const PORT = 80;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
