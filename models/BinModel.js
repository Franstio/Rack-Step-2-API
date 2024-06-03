import { Sequelize, Op } from "sequelize";
import db from "../config/db.js";
const { DataTypes } = Sequelize;
import Waste from "./WasteModel.js";

const Bin = db.define('bin', {
    name: {
        type: DataTypes.STRING,
    },
    clientId: {
        type: DataTypes.INTEGER,
    },
    weight: {
        type: DataTypes.DECIMAL,
    },
    max_weight: {
        type: DataTypes.DECIMAL,
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


Waste.hasMany(Bin, { foreignKey: 'IdWaste', as: 'bin' });
Bin.belongsTo(Waste, { foreignKey: 'IdWaste', as: 'waste' });

export default Bin;