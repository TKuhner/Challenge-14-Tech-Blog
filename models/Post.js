const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

// Abstracts Post model from sequelize
class Post extends Model {}

// Creates Post model
Post.init(
    {
        // Creates id column
        id: {
            // Integer type
            type: DataTypes.INTEGER,
            // Doesn't allow null values
            allowNull: false,
            // Set as primary key
            primaryKey:true,
            // Uses auto increment
            autoIncrement: true
        },
        // Creates title column
        title: {
            // String type
            type: DataTypes.STRING,
            // Doesn't allow null values
            allowNull: false
        },
        // Creates post_content column
        post_content: {
            // Text type
            type: DataTypes.STRING,
            // Doesn't allow null values
            allowNull: false,
            // Validates that the value is at least one character long
            validate: {
                // len is a sequelize object that checks the length of the input value
                len: [1]
            }
        },
        // Creates user_id column
        user_id: {
            // Integer type
            type:DataTypes.INTEGER,
            // References the user model's id
            references: {
                // references the user model specifically
                model: 'user',
                // references the primary key of the referenced model
                key: 'id'
            }
        }
    },
    {
        // Passes in imported sequelize connection
        sequelize,
        // Don't automatically create createdAt/updatedAt timestamp fields
        freezeTableName:true,
        // Uses underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
        underscored:true,
        // Make it so our model name stays lowercase in the database
        modelName:'post'
    }
);

module.exports = Post;