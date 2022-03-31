import con from "../db/connection";
import UsersModel from "../models/UsersModel";

export default async function handler(req, res){

    const bcrypt = await import("bcrypt");

    //Invalid method
    if(req.method !== "POST")
        return res.status(400).json({ message: "Invalid method" });
    
    //Incomplete data
    if(!req.body.email || !req.body.password || !req.body.name || !req.body.lastName || !req.body.dni)
        return res.status(400).json({ message: "Incomplete data" });

    //Invalid email
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(req.body.email))
        return res.status(400).json({ message: "Invalid email"});

    //Get all users data
    const {email, password, name, lastName, dni} = req.body;

    //Generates salt
    const salt = await bcrypt.genSalt(12);

    //hashing password
    const passwordHashed = await bcrypt.hash(password, salt);

    //Try to register an user
    try{
        //Start db connectino
        await con.sync();
        
        //Register an user
        const user = await UsersModel.create({
            name: name,
            last_name: lastName,
            dni: dni,
            email: email,
            password: passwordHashed
        });

        await user.save();

        //response
        res.json({ message: "Your account has been registered" });
    } catch(err){
        //Response if the user already exits
        res.status(400).json({ message: "The account already exits" });
    }   
}