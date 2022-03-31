import con from "../db/connection";
import { Model, DataTypes} from "sequelize";

class GamesModel extends Model { }

GamesModel.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    year_release: DataTypes.STRING,
    gender: DataTypes.STRING,
    brand: DataTypes.STRING,
    price: DataTypes.DOUBLE
},{
    modelName: "games",
    sequelize: con,
});

export default GamesModel;