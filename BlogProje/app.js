const express = require("express")
const app = express()
const cors = require("cors")

const { postBlog, getBlogs, deleteBlog, getSingleBlog, updateBlog} = require("./controllers/blogController")
require("./db")
const blogRoute = require("./routes/blogRoutes")


app.use(express.json())
app.use(cors({
  origin: "http://localhost:5173", 
  methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
  credentials: true
}))

app.use("", blogRoute)


app.listen(3000,() => {
    console.log("Project started successfully")
})