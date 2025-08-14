import { Link, useNavigate, useParams } from "react-router-dom"
import Navbar from "../components/Navbar"
import { useEffect, useState } from "react"
import axios from "axios"
import { supabase } from "../supabaseClient"

const Single = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [blog, setBlog] = useState({})
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState("")
  const [user, setUser] = useState(null)


const fetchSingleBlog = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/blogs/${id}`)

    console.log("Fetched blog:", response.data.data)
    setBlog(response.data.data)
  } catch (error) {
    console.error("Error fetching blog:", error)
  }
}

useEffect(() => {
  supabase.auth.getUser().then(({ data: { user } }) => {
    console.log("Current user:", user) 
    setUser(user)
  })

  fetchSingleBlog()
  fetchComments()
}, [id])

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from("Comments")
        .select("*")
        .eq("blog_id", parseInt(id))
      console.log("Fetched comments:", data)

      if (error) throw error
      setComments(data)
    } catch (error) {
      console.error("Error fetching comments:", error)
    }
  }

  const handleCommentChange = (e) => {
    setNewComment(e.target.value)
  }

  const handleAddComment = async (e) => {
    e.preventDefault()
    if (!user) {
      alert("You have to logged in to make a comment!")
      return
    }
    if (!newComment.trim()) return

    try {
      const { error } = await supabase.from("Comments").insert([
        {
          blog_id: id,
          comment: newComment,
          owner: user.id,
        },
      ])

      if (error) {
        console.error("Insert comment error:", error)
        throw error
      }

      setNewComment("")
      fetchComments()
    } catch (error) {
      console.error("Error adding comment:", error)
    }
  }

  const deleteSingleBlog = async () => {
    try {
      await axios.delete(`http://localhost:3000/blogs/${id}`)
      alert("Blog Deleted Successfully!")
      navigate("/")
    } catch (error) {
      console.error("Error deleting blog:", error)
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 text-gray-800 p-4 md:p-12">
        <div className="max-w-4xl mx-auto bg-white p-6 md:p-10 rounded-2xl shadow-md">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{blog.blogTitle}</h1>
          <p className="text-gray-700 text-lg whitespace-pre-line mb-6">{blog.blogDescription}</p>
          <div className="text-right text-sm text-gray-500">
            — <span className="font-medium">{blog.blogAuthor}</span>
          </div>

         
            <div className="flex gap-4 pt-6">
              <Link
                to={`/edit/${id}`}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                Update
              </Link>
              <button
                onClick={deleteSingleBlog}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                Delete
              </button>
            </div>
          
        </div>

        <div className="mt-12 max-w-2xl mx-auto bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold mb-4">Comments</h3>
          {comments.length > 0 ? (
            comments.map((c) => (
              <div key={c.id} className="border-b py-2">
                <p>{c.comment}</p>
              </div>
            ))
          ) : (
            <p>No comments yet.</p>
          )}

          {user ? (
            <form className="mt-4" onSubmit={handleAddComment}>
              <textarea
                value={newComment}
                onChange={handleCommentChange}
                className="w-full p-2 border rounded"
                placeholder="Write a comment..."
                required
              />
              <button
                type="submit"
                className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
              >
                Add Comment
              </button>
            </form>
          ) : (
            <div className="mt-4">
              <p className="mb-2 text-red-600 font-semibold">
                You must be logged in to add a comment.
              </p>
              <button
                onClick={() => navigate("/login")}
                className="bg-red-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Single
