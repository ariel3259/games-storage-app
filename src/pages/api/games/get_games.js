import GamesModel from "../models/GamesModel";
import con from "../db/connection";

export default async function handler(req, res) {
    
    //start connection
    await con.sync();

    //get all games
    const games = await GamesModel.findAll();

    res.send(games);
}