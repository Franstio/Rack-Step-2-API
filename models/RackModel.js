import { Sequelize, Op } from "sequelize";
import db from "../config/db.js";
const { DataTypes } = Sequelize;
import Waste from "./WasteModel.js";

const Rack = db.define('bin', {
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
    IdWaste: {
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
    }

}, {
    freezeTableName: true
});


Waste.hasMany(Rack, { foreignKey: 'IdWaste', as: 'dataWaste' });
Rack.belongsTo(Waste, { foreignKey: 'IdWaste', as: 'dataWaste' });

export default Rack;