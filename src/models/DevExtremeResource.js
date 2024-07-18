import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const DevExtremeResource = sequelize.define(
  "DevExtremeResource",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "devextreme_resources",
    timestamps: false,
  }
);

export default DevExtremeResource;
