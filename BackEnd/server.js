const app = require('./src/app')
const express = require('express');
const connectDB = require('./src/db/db')

connectDB();

const PORT = process.env.PORT || 3000 ;
app.listen(PORT , ()=>{
    console.log(`server connection is established in ${PORT}`);
})