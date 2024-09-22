import pg from "pg"
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } from "./config.js"

export const pool = new pg.Pool({
    user:  DB_USER,
    host: DB_HOST,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    port: 5432,// El puerto por defecto de PostgreSQL
 })
//  console.log(DB_USER)
//  console.log(DB_HOST)
//  console.log(DB_PASSWORD)
//  console.log(DB_DATABASE)
//  console.log(DB_PORT)

//  pool.query('select now()').then(result =>{
//    console.log(result)
//    console.log("correcta conexion")
// }).catch(error => {
//    console.error('Error ejecutando la consulta:', error);
//    onsole.error('mala conexion br :(');
// });