const {Sequelize, DataTypes, Model} = require("sequelize")

//const sequelize = new Sequelize("postgresql://postgres.umjbhkrjnunmwevsxzik:[password]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres")
const blogModel = require("./models/blogModel")

sequelize.authenticate()
.then(()=>{
    console.log("Database connection successfully")
})
.catch((e)=>{
    console.log("error", e)
})

const db ={}
db.Sequelize = Sequelize
db.sequelize = sequelize
db.blogs = blogModel(sequelize, DataTypes) 
module.exports = db


sequelize.sync({alter: false}).then(()=>{
    console.log("Migration successfully")
})