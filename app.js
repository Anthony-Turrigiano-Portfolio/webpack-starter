const path = require('path')
const express = require('express');

const app = express();

app.use(express.static(path.join(__dirname, "dist")));

app.get("/", (req, res)=>{
    path.send(path.join(__dirname, "dist", "index.js"))
});

app.listen(3000, '0.0.0.0', (err)=>{
    if(err) throw err;
    
    console.log('Server listening on port 3000');
})