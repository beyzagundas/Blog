const blogModel = (sequelize, DataTypes) => {
   const Blog = sequelize.define("blogs", {
        blogTitle: {
            type: DataTypes.STRING,
            allowNull: false
        },
        blogDescription: {
            type: DataTypes.STRING,
            allowNull: false
        },
        blogAuthor: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return Blog
}

module.exports = blogModel