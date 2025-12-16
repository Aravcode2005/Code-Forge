const express = require('express');
const path = require('path');
const app = express();
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/homepage.html'));
});
app.listen(3005, () => {
    console.log('Server: http://localhost:3005');
});