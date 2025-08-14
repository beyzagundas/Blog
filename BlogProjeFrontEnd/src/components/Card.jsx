import { Link } from "react-router-dom"

const Card = ({data}) => {
    return (
        <>
        <Link to={`/single/${data.id}`}>
        <div
            className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-all duration-300">
            <h3 className="text-xl font-semibold mb-2">{data.blogTitle}</h3>
            <p className="text-gray-600 mb-3">{data.blogDescription}</p>
            <p className="text-sm text-gray-500">Author: <span className="font-medium">{data.blogAuthor}</span></p>
        </div>
        </Link>
        </>
    )
}

export default Card