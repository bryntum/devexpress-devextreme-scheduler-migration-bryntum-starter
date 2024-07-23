import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const DevExtremeAppointment = sequelize.define(
    'DevExtremeAppointment',
    {
        id : {
            type          : DataTypes.INTEGER,
            primaryKey    : true,
            autoIncrement : true
        },
        allDay : {
            type         : DataTypes.BOOLEAN,
            defaultValue : false
        },
        description : {
            type      : DataTypes.STRING,
            allowNull : true
        },
        disabled : {
            type         : DataTypes.BOOLEAN,
            defaultValue : false
        },
        endDate : {
            type      : DataTypes.DATE,
            allowNull : false
        },
        endDateTimeZone : {
            type      : DataTypes.STRING,
            allowNull : true
        },
        recurrenceException : {
            type      : DataTypes.STRING,
            allowNull : true
        },
        recurrenceRule : {
            type      : DataTypes.STRING,
            allowNull : true
        },
        startDate : {
            type      : DataTypes.DATE,
            allowNull : false
        },
        startDateTimeZone : {
            type      : DataTypes.STRING,
            allowNull : true
        },
        template : {
            type      : DataTypes.STRING,
            allowNull : true
        },
        text : {
            type      : DataTypes.STRING,
            allowNull : true
        },
        visible : {
            type         : DataTypes.BOOLEAN,
            defaultValue : true
        }
    },
    {
        tableName  : 'devextreme_appointments',
        timestamps : false
    }
);

export default DevExtremeAppointment;
