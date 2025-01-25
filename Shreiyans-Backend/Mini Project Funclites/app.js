const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const app = express();
const cookieParser = require('cookie-parser');
const userModel = require('./models/user');
const postModel = require('./models/post');
const bcrypt = require('bcrypt');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.render("index");
});

app.post('/register', async (req, res) => {
    let { email, password, username, name, age } = req.body;
    let user = await userModel.findOne({ email: email });
    if (user) return res.status(500).send("User Already Registered");

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            let user = await userModel.create({ username, email, age, name, password: hash });
            let token = jwt.sign({ email: email, userid: user._id }, "secret", { expiresIn: '1h' });
            res.cookie("token", token, { httpOnly: true, secure: false, sameSite: 'lax' });
            res.send("Registered");
        });
    });
});

app.get('/login', (req, res) => {
    res.render("login");
});

app.post('/login', async (req, res) => {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email: email });
    if (!user) return res.status(500).send("Invalid credentials. Please create an account.");

    bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
            let token = jwt.sign({ email: email, userid: user._id }, "secret", { expiresIn: '1h' });
            res.cookie("token", token, { httpOnly: true, secure: false, sameSite: 'lax' });
            res.redirect('/profile');
        } else {
            res.redirect("/login");
        }
    });
});

app.get('/logout', (req, res) => {
    res.cookie("token", "", { expires: new Date(0), httpOnly: true });
    res.redirect("/");
});



let isLoggedin = (req, res, next) => {
    let token = req.cookies?.token;
    if (!token) return res.redirect('/login');

    jwt.verify(token, "secret", (err, decoded) => {
        if (err) return res.status(401).send("Invalid or expired token");
        req.user = decoded;
        next();
    });
};

app.get('/profile', isLoggedin, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email }).populate({
        path: 'posts',
        select: 'content likesCount' // Make sure likesCount is included
    });

    res.render('profile', { user });
});


app.get('/like/:id', isLoggedin, async (req, res) => {
    // Find the post by ID
    let post = await postModel.findOne({ _id: req.params.id });

    // Check if the user has already liked the post
    if (post.likes.indexOf(req.user.userid) === -1) {
        // Add user to the likes array
        post.likes.push(req.user.userid);
        post.likesCount += 1;  // Increment the like count
    } else {
        // Remove user from the likes array
        post.likes = post.likes.filter(like => like.toString() !== req.user.userid.toString());
        post.likesCount -= 1;  // Decrement the like count
    }

    // Save the post with the updated likes and like count
    await post.save();

    // Redirect back to the profile page
    res.redirect('/profile');
});


// ✅ FIXED: Change from GET to POST to handle form submission
app.post('/post', isLoggedin, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email });
    let { post_content } = req.body;

    let post = await postModel.create({
        user: user._id,
        content: post_content,
    });

    user.posts.push(post._id);
    await user.save();
    res.redirect('/profile');
});



app.listen(3000, () => {
    console.log("Server running on port 3000");
});
