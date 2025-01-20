const express = require('express');
const app = express();
const userModel = require('./views/user');
const postModel = require('./views/posts');

app.get('/', (req, res) => {
    res.send("con");
});

app.get('/create', async (req, res) => {
    let user = await userModel.create({
        name: "VV",
        email: "SD@g",
        age: 10
    });
    res.send(user);
});

app.get('/post/create', async (req, res) => {
    let post = await postModel.create({
        postdata: "hrlo",
        user: "678e05270917ddb45ae3b355",
    });

    let user = await userModel.findOne({ _id: "678e05270917ddb45ae3b355" });
    user.post.push(post._id);
    await user.save();
    res.send({ post, user });
});

app.listen(3000);


// user k paas ek dusre ki posts h
// user k paas post ki id    and vice versa
