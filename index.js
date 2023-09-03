const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();
const cors = require('cors');
const app = express();

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const server = http.createServer(app);

app.use(express.json());
app.use(cors({origin:'*'}));

mongoose.connect(process.env.DATABASE)
    .then(()=>{console.log('db connected');})
    .catch(()=>{console.log('error db');});

app.use('/api',authRoutes);
app.use('/api',productRoutes);

const port = process.env.PORT || 3004;

server.listen(port,()=>{
    console.log(`port is ${port}`);
});
