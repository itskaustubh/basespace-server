require("dotenv").config();
const express = require('express')
const cors = require('cors')

const pg = require('pg');
const pool = require("./database/db_connect")

const {GET_ALL_WAREHOUSES, GET_WAREHOUSE, UPDATE_WAREHOUSE}  
        = require('./routes/response.js')


const app = express()
app.use(cors())
app.use(express.json())
 
app.listen(5000, () => {
  console.log(`Server started on port 5000`)
})


app.get('/warehouses', GET_ALL_WAREHOUSES)
app.get('/warehouses/:code', GET_WAREHOUSE)
app.put('/warehouses/:code',UPDATE_WAREHOUSE)