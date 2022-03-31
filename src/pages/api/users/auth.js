import con from "../db/connection";
import UsersModel from "../models/UsersModel";
import { Op } from "sequelize";
import { genToken } from "../utils/tokens";

export default async function handler(req, res){
    
    const bcrypt = await import("bcrypt");

    //Invalid request method
    if(req.method !== "POST")
        return res.json({ message: "Invalid method" });
    
    //Incomplete data
    if(!req.body.email || !req.body.password)
        return res.status(400).json({ message: "Incomplete data" });
    
    //Invalid email
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(req.body.email))
        return res.status(400).json({ message: "Invalid email" });

    //Getting email and password from req.body
    const { email, password } = req.body;

    //start db connection
    await con.sync();

    //find user by id
    const user = await UsersModel.findOne({
        where: {
            email: {
                [Op.eq]: email
            }
        }
    });

    
    //The user doesn't exits
    if(!user)
        return res.status(401).json({ message: "The user doesn't exits" });
    
    const { dataValues } = user;

    //Verify password
    const result = await bcrypt.compare(password, dataValues.password);

    //Wrong password
    if(!result)
        return res.status(401).json({ message: "Wrong password" });

    const subject = dataValues.name + dataValues.last_name + dataValues.id;

    const token = await genToken(subject);
    
    res.json({
        message: `Welcome ${user.name} ${user.last_name}`,
        access_token: token,
        subject: subject
    });
    
}