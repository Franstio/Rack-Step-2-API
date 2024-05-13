import { Sequelize } from "sequelize";
import db from "../config/db.js";
import Rack from "./RackModel.js";


const {DataTypes} = Sequelize;

const Waste = db.define('waste',{
   wasteId: {
    type : DataTypes.INTEGER,
    primaryKey:true
   },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
},{
    freezeTableName: true
});





export default Waste;