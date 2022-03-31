import con from "../db/connection";
import GamesModel from "../models/GamesModel";
import { Op } from "sequelize";

export default async function handler(req, res){

    if(!req.headers.id)
        return res.status(400).json({ message: "Incomplete data" });

    const { id } = req.headers; 

    await con.sync();

     await GamesModel.destroy({
         where:{
             id: {
                [Op.eq]: id
             }
         }
     });
    
    res.json({ message: "Game deleted" });
}