import sequelize from "../config/connect.db.js";
import { Model,DataTypes } from "sequelize";

class Person extends Model{};
Person.init({
    person_id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true,
    },
    person_person:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
    },
    person_password:{
        type:DataTypes.STRING,
        allowNull:false,
    }
},{sequelize,modelName:"Person"});

export default Person;