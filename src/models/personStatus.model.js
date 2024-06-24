import sequelize from "../config/connect.db.js";
import { Model, DataTypes } from "sequelize";

class PersonStatus extends Model {}
PersonStatus.init({
    personStatus_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    personStatus_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    personStatus_description: { 
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    sequelize,
    modelName: "Person_Status",
    freezeTableName: true // Esto asegura que el nombre de la tabla no sea pluralizado
});

export default PersonStatus;
