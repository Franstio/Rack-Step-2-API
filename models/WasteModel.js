import { Sequelize } from "sequelize";
import db from "../config/db.js";


const {DataTypes} = Sequelize;

const Waste = db.define('waste',{
    wasteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey:true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    }
},{
    freezeTableName: true
});





export default Waste;