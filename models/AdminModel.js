import { Sequelize } from "sequelize";
import db from "../config/db.js";


const {DataTypes} = Sequelize;

const Admin = db.define('admin',{
   id: {
    type : DataTypes.INTEGER,
    primaryKey:true
   },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    password:{
        type : DataTypes.STRING,
    }
},{
    freezeTableName: true
});





export default Admin;