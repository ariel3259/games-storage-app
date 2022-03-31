import con from "../db/connection";
import GamesModel from "../models/GamesModel";
import { Op } from "sequelize";

export default async function handler(req, res){
    
    //Incomplete data
    if(!req.body.name || !req.body.description || !req.body.yearRelease || !req.body.gender || !req.body.brand || !req.body.price || !req.body.id)
        return res.status(400).json({ message: "Incomplete data" });
    
    //getting data
    const {name, description, yearRelease, gender, brand, price, id} = req.body;

    await con.sync();

    await GamesModel.update({
        name,
        description,
        year_release: yearRelease,
        gender,
        brand,
        price
    }, {
        where: {
            id: {
                [Op.eq]: id
            }
        }
    }
    );

    return res.json({ message: `${name} updated` });
}
