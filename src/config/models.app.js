import sequelize from "./connect.db.js";
import PersonStatus from "../models/personStatus.model.js";
import Role from "../models/role.model.js";
import Person from "../models/person.model.js";

export const modelsApp = function initModels(select) {
    if (select) {
        PersonStatus.hasMany(Person,{foreignKey:{name : "personStatus_FK", field : "personStatus_FK", allowNull: true}});
        Person.belongsTo(PersonStatus,{
            foreignKey: {name : "personStatus_FK", field : "personStatus_FK", allowNull: true},
            constraints: true,
        });
        Role.hasMany(Person,{foreignKey:{name : "role_FK", field : "role_FK", allowNull: true}});
        Person.belongsTo(Role,{
            as: 'Current',
            foreignKey: {name : "role_FK", field : "role_FK", allowNull: true},
            constraints: true,
        });
        sequelize.sync();
    }
}