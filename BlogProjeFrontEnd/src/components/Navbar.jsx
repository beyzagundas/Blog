import { Link, NavLink } from "react-router-dom"

const Navbar = () => {
    return (
        <nav className="bg-white shadow-md px-4 md:px-8 py-4 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                
                <Link to="/" className="text-xl font-bold text-red-600">
                    BlogPlatform
                </Link>

                
                <div className="space-x-4 text-sm md:text-base">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive
                                ? "text-red-600 font-semibold"
                                : "text-gray-700 hover:text-red-500"
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/create"
                        className={({ isActive }) =>
                            isActive
                                ? "text-red-600 font-semibold"
                                : "text-gray-700 hover:text-red-500"
                        }
                    >
                        Create
                    </NavLink>
                </div>
            </div>
        </nav>
    )
}

export default Navbar