import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import DevExtremeAppointment from "./DevExtremeAppointment.js";
import DevExtremeResource from "./DevExtremeResource.js";

const DevExtremeAssignment = sequelize.define(
  "DevExtremeAssignment",
  {
    appointmentId: {
      type: DataTypes.INTEGER,
      references: {
        model: DevExtremeAppointment,
        key: "id",
      },
      allowNull: false,
    },
    resourceId: {
      type: DataTypes.INTEGER,
      references: {
        model: DevExtremeResource,
        key: "id",
      },
      allowNull: false,
    },
  },
  {
    tableName: "devextreme_appointment_resources",
    timestamps: false,
  }
);

DevExtremeAppointment.belongsToMany(DevExtremeResource, {
  through: DevExtremeAssignment,
  foreignKey: "appointmentId",
  otherKey: "resourceId",
});
DevExtremeResource.belongsToMany(DevExtremeAppointment, {
  through: DevExtremeAssignment,
  foreignKey: "resourceId",
  otherKey: "appointmentId",
});

export default DevExtremeAssignment;
