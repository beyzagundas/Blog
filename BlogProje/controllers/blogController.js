const { blogs } = require("../db")
exports.postBlog = async (req, res) => {
    const { blogTitle, blogDescription, blogAuthor } = req.body

    try {
        await blogs.create({
            blogTitle,
            blogDescription,
            blogAuthor
        })
        res.json({
            message: "blog created successfully"
        })
    } catch (error) {
        console.log("Something went wrong")
    }
}

exports.getBlogs = async (req, res) => {
    try {
        const data = await blogs.findAll() 
        res.json({
            data,
            message: "Blogs fetch successfully"
        })
    } catch (error) {
        console.log("Something went wrong")
    }
}

exports.deleteBlog = async (req, res) => {
    const id = req.params.id
    try {
        await blogs.destroy({ where: { id: id } })
        res.json({
            message: "blogs deleted successfylly"
        })
    } catch (error) {
        console.log("Something went wrong")
    }
}

exports.getSingleBlog = async (req, res) => {
    const id = req.params.id
    try {
        const data = await blogs.findByPk(id)
        res.json({
            message: "single blog fetched successfully",
            data
        })
    } catch (error) {
        console.log("Something went wrong")
    }
}

exports.updateBlog = async (req, res) => {
    const id = req.params.id
    const { blogTitle, blogDescription, blogAuthor } = req.body
    try {
        await blogs.update({
            blogTitle,
            blogDescription,
            blogAuthor
        },
            {
                where: { id }
            })
        res.json({
            message: "Blogs updated successfully"
        })
    } catch (error) {
        console.log("Something went wrong")
    }
}