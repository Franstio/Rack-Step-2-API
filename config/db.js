
import { Sequelize } from "sequelize";

const db = new Sequelize('rack-pcs','root','',{
    host: "localhost",
    dialect: "mysql"
});

export default db;
