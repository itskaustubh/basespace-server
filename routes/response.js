const pool = require("../database/db_connect")
const schema = require("../database/schema")

const GET_ALL_WAREHOUSES = async (req,res) => {
  try{
    const allWares = await pool.query('SELECT * from warehouses')
    console.log(allWares.rows)
    res.json(allWares.rows)
  }catch(err){
    console.error(err.message)
    res.status(500).json(err)
  }
}

const GET_WAREHOUSE = async (req,res) => {
  try{
    console.log(req.params)
    const {code} = req.params
    console.log(code)
    const warehouse = await 
        pool.query("SELECT * from warehouses where code = $1",[code])
    console.log(warehouse.rows)
    res.json(warehouse.rows[0])
  }catch(err){
    console.error(err.message)
    res.status(500).json(err)
  }
}

// https://stackoverflow.com/a/21763631
const UPDATE_WAREHOUSE = async (req,res) => {
  try{
    console.log(req.params)
    const query = req.query
    const {code} = req.params
    console.log(code)
    let columnsToUpdate = []
    let sqlQuery = "update warehouses set "
    let sqlValues = []
    Object.entries(query).forEach(([column,value],index) => {
      switch(schema[column]){
        case Boolean:
          sqlValues.push(value === 'true' ? true : false)
          break;
        case Number:
          sqlValues.push(parseInt(value))
          break;
        case String:
          sqlValues.push(value)
          break;
        default:
          throw Error('Unrecognized Column value')
      }
      columnsToUpdate.push(`${column}=$${index+1}`)
    })
    columnsToUpdate = columnsToUpdate.join(', ')
    sqlQuery = sqlQuery.concat(columnsToUpdate,` where code = '${code}' returning *`)
    console.log(sqlQuery,sqlValues)
    const update = await 
        pool.query(sqlQuery,sqlValues)
    console.log(update.rows)
    res.json(update.rows[0])
  }catch(err){
    console.error(err.message)
    res.status(500).json(err.message)
  }
}

// const DELETE_WAREHOUSE = {
  
// }
 
module.exports = {
  GET_ALL_WAREHOUSES,
  GET_WAREHOUSE,
  UPDATE_WAREHOUSE
}