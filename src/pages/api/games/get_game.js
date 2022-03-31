import GamesModel from "../models/GamesModel";
import con from "../db/connection";
import { Op } from "sequelize";

export default async function handler(req, res){
    
    //Incomplete data
    if(!req.headers.id)
        return res.status(400).json({ message: "Incomplete data"});

    //Start connection
    await con.sync();

    const { id } = req.headers;

    //Get game
    const game = await GamesModel.findOne({
        where: {
            id: {
                [Op.eq]: id
            }
        }
    });

    //Empty game
    if(!game.dataValues)
        return res.status(400).json({ message: "The game doesn't exits" });

    //return game
    res.json(game.dataValues);
}