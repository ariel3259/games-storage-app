import { Sequelize } from "sequelize";

const con = new Sequelize(process.env.DATABASE, process.env.USER_NAME, process.env.PASSWORD, {
    host: process.env.HOST,
    port: process.env.PORT,
    dialect: "mysql"  
});

export default con;