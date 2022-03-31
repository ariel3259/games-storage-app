import con from "../db/connection";
import GamesModel from "../models/GamesModel";

export default async function handler(req, res){
    
    //Incomplete data
    if(!req.body.name || !req.body.description || !req.body.yearRelease || !req.body.gender || !req.body.brand || !req.body.price)
        return res.status(400).json({ message: "Incomplete data" });
    
    //getting data
    const {name, description, yearRelease, gender, brand, price} = req.body;

    //start connection
    await con.sync();

    //create game
    const game = await GamesModel.create({
        name,
        description,
        year_release: yearRelease,
        gender,
        brand,
        price
    });

    //saves game
    await game.save();

    //return message
    res.send({ message: `${name} saved` });
}