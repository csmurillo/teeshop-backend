const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();
const cors = require('cors');
const app = express();



const server = http.createServer(app);

app.use(express.json());
app.use(cors({origin:'*'}));

mongoose.connect(process.env.DATABASE)
            .then(()=>{console.log('db connected')})
            .catch(()=>{console.log('error db');});

//app.use();
const port = process.env.PORT || 3004;

server.listen(port,()=>{
    console.log(`port is ${port}`);
});

