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