import { Sequelize, Op } from "sequelize";
import db from "../config/db.js";

const { DataTypes } = Sequelize;

const employee = db.define('employee', {
    badgeId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
    },
    active: {
        type: DataTypes.INTEGER
    }
}, {
    freezeTableName: true
});

export default employee;