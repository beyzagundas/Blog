import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { supabase } from "../supabaseClient";

const Create = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        blogTitle: '',
        blogDescription: '',
        blogAuthor: ''
    });

    // Kullanıcıyı çek
    useEffect(() => {
        supabase.auth.getUser().then(({ data: { user } }) => {
            setUser(user);
        });
    }, []);

    // Blog oluşturma
    const createBlog = (e) => {
        e.preventDefault();

        if (!user) {
            alert("Giriş yapmadan blog oluşturamazsınız!");
            return;
        }

        const blogData = {
            ...formData,
            user_id: user.id
        };

        axios
            .post('http://localhost:3000/blogs', blogData)
            .then(() => {
                alert("Blog başarıyla oluşturuldu!");
                navigate("/");
            })
            .catch((err) => {
                console.error('Blog oluşturulurken hata:', err);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <form onSubmit={createBlog} className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">
                        Create New Blog
                    </h2>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">
                            Blog Title
                        </label>
                        <input
                            onChange={handleChange}
                            type="text"
                            name="blogTitle"
                            required
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                            placeholder="Enter blog title"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">
                            Blog Description
                        </label>
                        <textarea
                            onChange={handleChange}
                            name="blogDescription"
                            required
                            rows={6}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                            placeholder="Write your blog content..."
                        ></textarea>
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">
                            Author Name
                        </label>
                        <input
                            onChange={handleChange}
                            type="text"
                            name="blogAuthor"
                            required
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                            placeholder="Enter author name"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
                    >
                        Create Blog
                    </button>
                </form>
            </div>
        </>
    );
};

export default Create;
