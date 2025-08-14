const { getBlogs, postBlog, updateBlog, deleteBlog, getSingleBlog } = require("../controllers/blogController")

const router = require("express").Router()

router.route("/blogs").post(postBlog).get(getBlogs)
router.route("/blogs/:id").patch(updateBlog).delete(deleteBlog).get(getSingleBlog)

module.exports=router