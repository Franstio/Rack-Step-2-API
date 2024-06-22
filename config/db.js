
import { Sequelize } from "sequelize";

const db = new Sequelize('rack_pcs','pcs','123456',{
    host: "localhost",
    dialect: "mysql"
});

export default db;
