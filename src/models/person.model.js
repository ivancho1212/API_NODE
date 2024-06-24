import sequelize from "../config/connect.db.js";
import { Model, DataTypes } from "sequelize";
import PersonStatus from './personStatus.model.js';  // Importa el modelo PersonStatus

class Person extends Model {}
Person.init({
    person_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    person_person: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    person_password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    personStatus_FK: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: PersonStatus, // Hace referencia al modelo PersonStatus
            key: 'personStatus_id',
        }
    },
    role_FK: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // Define también la referencia para el modelo `Role` si existe
        // references: {
        //     model: Role,
        //     key: 'role_id',
        // }
    }
}, {
    sequelize,
    modelName: "Person",
});

Person.belongsTo(PersonStatus, { foreignKey: 'personStatus_FK' });
// Define también la relación con el modelo `Role` si existe
// Person.belongsTo(Role, { foreignKey: 'role_FK' });

export default Person;
