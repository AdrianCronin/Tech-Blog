const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// User has many posts
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// User has many comments
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

// Post has many Comments
Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
});

// Post belongs to a User
Post.belongsTo(User, {
    foreignKey: 'user_id',
});

// Comment belongs to a Post
Comment.belongsTo(Post, {
    foreignKey: 'post_id',
});

// Comment belongs to a User
Comment.belongsTo(User, {
    foreignKey: 'user_id',
});

module.exports = {User, Post, Comment}

// User model
// - ID
// - Username
// - Password
// 

// Post Model
// - ID 
// - title
// - contents
// - post creator foreign key to (user_id: one user have many posts)
// - Date created

// Comment Model
// - ID
// - content
// - Post ID foreign key to post.id one post have many comments
// - comment creator (user_id: one user has many posts)
// - Date created

// Views
// - Homepage
// - single blog post page
// - dashboard page
// - add post page
// - edit post page