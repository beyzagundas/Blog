import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import axios from "axios"
import Card from "../components/Card" 

const Home = () => {
    const [blogs, setBlogs] = useState([])

    const fetchBlogs = async () => {
        const response = await axios.get("http://localhost:3000/blogs")
        setBlogs(response.data.data)
    }

    useEffect(() => {
        fetchBlogs()
    }, [])
    
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 text-gray-800">
                
                <section className="bg-white py-16 px-4 md:px-12 text-center shadow">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to the Blog Management System</h1>
                    <p className="text-lg md:text-xl text-gray-600">Create, manage and read your favorite blogs</p>
                </section>

           
                <section className="py-10 px-4 md:px-12">
                    <h2 className="text-3xl font-semibold mb-8 text-center">All Blogs</h2>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {blogs.map((blog) => (
                            <Card data={blog} key={blog.id} />
                        ))}
                    </div>
                </section>
            </div>
        </>
    )
}

export default Home