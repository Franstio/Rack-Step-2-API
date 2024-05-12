import { Sequelize, Op } from "sequelize";
import db from "../config/db.js";
const { DataTypes } = Sequelize;

const Rack = db.define('rack', {
    rackId: {
        type: DataTypes.INTEGER,
    },
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
}, {
    freezeTableName: true
});

export default Rack;