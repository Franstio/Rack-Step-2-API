import { Sequelize, Op } from "sequelize";
import db from "../config/db.js";
const { DataTypes } = Sequelize;
import Waste from "./WasteModel.js";

const Rack = db.define('rack', {
    name: {
        type: DataTypes.STRING,
    },
    clientId: {
        type: DataTypes.INTEGER,
    },
    weight: {
        type: DataTypes.INTEGER,
    },
    weightbin: {
        type: DataTypes.INTEGER,
    },
    wasteId: {
        type: DataTypes.INTEGER,
    },
    rackId: {
        type: DataTypes.INTEGER,
        primaryKey:true
    },
    address: {
        type: DataTypes.INTEGER,
    },
    value: {
        type: DataTypes.INTEGER
    },
    
}, {
    freezeTableName: true,
    timestamps:false
});


Waste.hasMany(Rack, { foreignKey: 'wasteId', as: 'rack' });
Rack.belongsTo(Waste, { foreignKey: 'wasteId', as: 'waste' });

export default Rack;