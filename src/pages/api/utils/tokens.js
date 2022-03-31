import * as jwt from "jsonwebtoken";

export const genToken = async (subject) => { 

    const token = await new Promise((resolve, reject) => {
        jwt.sign({
            issue: process.env.ISSUER,
            sub: subject
        }, process.env.SECRET_KEY, {
            algorithm: "HS256",
            expiresIn: "1h"
        }, function(err, token){
            if(err){
                console.log(err);
                return reject(null)
            }
            resolve(token);
        });
    });

    return token;
}

export const verifyToken = async (token, subject) => {

    const result = await new Promise((resolve, reject) => {
        jwt.verify(token, process.env.SECRET_KEY, {
            algorithms: "HS256",
        }, (err, decode) => {
            if(err)
                return reject(false);
            resolve(decode.sub === subject);
        });
    });

    return result
}