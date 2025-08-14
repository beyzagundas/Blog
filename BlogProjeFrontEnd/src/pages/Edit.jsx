import { useNavigate, useParams } from "react-router-dom"
import Navbar from "../components/Navbar"
import { useEffect, useState } from "react"
import axios from "axios"

const Edit = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [blog, setBlog] = useState({
    blogTitle: "",
    blogDescription: "",
    blogAuthor: "",
  })

  const fetchSingleBlog = async () => {
    try {
      const response = await axios.get("http://localhost:3000/blogs/" + id)
      setBlog(response.data.data)
    } catch (error) {
      console.error("Error fetching blog:", error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setBlog({
      ...blog,
      [name]: value,
    })
  }

  const editBlog = async (e) => {
    e.preventDefault()  

    try {
      const response = await axios.patch("http://localhost:3000/blogs/" + id, blog)



      alert("Blog edited successfully!")
      navigate("/")
    } catch (error) {
      console.error("Update failed:", error)
      alert("Update failed!")
    }
  }

  useEffect(() => {
    fetchSingleBlog()
  }, [])

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <form
          onSubmit={editBlog}
          className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Edit Blog</h2>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Blog Title</label>
            <input
              value={blog.blogTitle}
              onChange={handleChange}
              type="text"
              name="blogTitle"
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter blog title"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Blog Description</label>
            <textarea
              value={blog.blogDescription}
              onChange={handleChange}
              name="blogDescription"
              required
              rows={6}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your blog content..."
            ></textarea>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Author Name</label>
            <input
              value={blog.blogAuthor}
              onChange={handleChange}
              type="text"
              name="blogAuthor"
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter author name"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Edit Blog
          </button>
        </form>
      </div>
    </>
  )
}

export default Edit
