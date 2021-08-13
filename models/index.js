const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');


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