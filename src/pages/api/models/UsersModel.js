import { Model, DataTypes } from "sequelize";
import con from "../db/connection";

class UsersModel extends Model { }

UsersModel.init({
    name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    dni: {
        unique: true,
        type: DataTypes.STRING
    },
    email: {
        unique: true,
        type: DataTypes.STRING
    },
    password: DataTypes.STRING
},{
    sequelize: con,
    modelName: "users"
});

export default UsersModel;