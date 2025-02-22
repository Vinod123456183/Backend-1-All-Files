const express = require("express");
const mongoose = require("mongoose");
const userModel = require("./models/userModel"); // Corrected import
const postModel = require("./models/postModel"); // Corrected import

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Main");
});

mongoose
  .connect("mongodb://127.0.0.1:27017/testDDb")
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error("Database connection error", err);
  });

app.post("/create", async (req, res) => {
  try {
    const createdUser = await userModel.create({
      name: req.body.name,
      age: req.body.age,
      email: req.body.email,
    });
    res.send(createdUser);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ error: "Error creating user", details: err.message });
  }
});

app.post("/:username/create/post", async (req, res) => {
  try {
    let user = await userModel.findOne({ name: req.params.username }); // Changed 'userName' to 'name'

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    let createdPost = await postModel.create({
      title: req.body.title || "Default title", // Added title to create post
      content: req.body.content || "Default content for the post",
      author: user._id,
    });

    // Add the post to the user's posts array
    user.posts.push(createdPost._id);
    await user.save();

    console.log({ user, createdPost });
    res.send({ user, createdPost }); // Send response with user and post data
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ error: "Error creating post", details: err.message });
  }
});

app.get("/posts", async (req, res) => {
  let posts = await postModel.find().populate("author"); // Corrected field name from 'user' to 'author'
  res.send(posts);
});

app.get("/users", async (req, res) => {
  let users = await userModel.find().populate("posts");
  res.send(users);
});

// .
// .
// .

// .

// .

// .

// .

// .

// .
// .

// .
// .

// .

// .
// Main Today Lecture ->

// Method 1 to find USER
app.get("/test", async (req, res) => {
  let findUser = await userModel.find({ name: "A1" });
  res.send(findUser);
});

// we can pass n query
//INTERVIW -  har query ek obj hogi
// INTERVIW - RECIEVES AN ARRAY
// INTERVIW - special operator - $match:{}

// query
// q1 sare bhopal k logo ko find kro
// q2 do query1 ka data neeche mil jaega and say
// sare usme se males ko nikalo
// usme se sarae gmail wale user ko nikalo
// essi query krte rahnege
// .
// .
// .
// .

// app.get("/test", async (req, res) => {
//   let findUserByAggregrate = await userModel.aggregrate([query1, query2, query3]);
//   res.send(findUserByAggregrate);
// });

app.get("/test_aggregate", async (req, res) => {
  let findUserByAggregrate = await userModel.aggregate([
    { $match: { name: "A2" } },
  ]);
  res.send(findUserByAggregrate);
});

// group ese hi kaam nahi krta it is little different
// y vo id nahi h
app.get("/group_aggregate", async (req, res) => {
  let findUserByAggregrate = await userModel.aggregate([
    // schema ki koi si bhi feild
    { $group: { _id: "$age", userData: { $push: "$name" } } },
    //y bracket k andar voh filed jinki age same h toh sath aa jaenfe
  ]);
  res.send(findUserByAggregrate);
});

/*
[
    {
        "_id": 500,
        "userData": [
            "A5"
        ]
    },
    {
        "_id": 300,
        "userData": [
            "A3"
        ]
    },
    {
        "_id": null,
        "userData": []
    },
    {
        "_id": 100,
        "userData": [
            "asds",
            "asds",
            "A1"
        ]
    },
    {
        "_id": 600,
        "userData": [
            "A6"
        ]
    },
    {
        "_id": 700,
        "userData": [
            "A7"
        ]
    },
    {
        "_id": 1000,
        "userData": [
            "asds",
            "vinod",
            "A10"
        ]
    },
    {
        "_id": 200,
        "userData": [
            "A2"
        ]
    },
    {
        "_id": 400,
        "userData": [
            "A4"
        ]
    },
    {
        "_id": 800,
        "userData": [
            "A8"
        ]
    },
    {
        "_id": 900,
        "userData": [
            "A9"
        ]
    }
]
*/

/*
[
    {
        "_id": 900
    },
    {
        "_id": 500
    },
    {
        "_id": 400
    },
    {
        "_id": 200
    },
    
]
*/

app.get("/group_aggregate_all", async (req, res) => {
  let findUserByAggregrate = await userModel.aggregate([
    // jinki age kuch hogi toh wese similar sare value aa jange ek saath with full detail

    { $group: { _id: "$age", userData: { $push: "$$ROOT" } } },
  ]);

  /*
  [
    {
        "_id": 900,
        "userData": [
            {
                "_id": "67b995680c61e573305d4758",
                "name": "A9",
                "age": 900,
                "email": "A9@gmail.com",
                "posts": [],
                "createdAt": "2025-02-22T09:14:16.930Z",
                "__v": 0
            }
        ]
    },
    {
        "_id": 500,
        "userData": [
            {
                "_id": "67b995390c61e573305d4750",
                "name": "A5",
                "age": 500,
                "email": "A5@gmail.com",
                "posts": [
                    "67b996075fb615df79baf3e7",
                    "67b996125fb615df79baf3eb"
                ],
                "createdAt": "2025-02-22T09:13:29.948Z",
                "__v": 2
            }
        ]
    },
    {
        "_id": 1000,
        "userData": [
            {
                "_id": "67b96ea399cfc307e88e8306",
                "name": "asds",
                "age": 1000,
                "email": "asas@gmail.com",
                "posts": [],
                "createdAt": "2025-02-22T06:28:51.606Z",
                "__v": 0
            },
            {
                "_id": "67b98f7ac6b3112894f9a947",
                "name": "vinod",
                "age": 1000,
                "email": "vinod@gmail.com",
                "posts": [
                    "67b98ffdc6b3112894f9a94c"
                ],
                "createdAt": "2025-02-22T08:48:58.264Z",
                "__v": 1
            },
            {
                "_id": "67b995740c61e573305d475a",
                "name": "A10",
                "age": 1000,
                "email": "A10@gmail.com",
                "posts": [],
                "createdAt": "2025-02-22T09:14:28.690Z",
                "__v": 0
            }
        ]
    },
    {
        "_id": 200,
        "userData": [
            {
                "_id": "67b995110c61e573305d474a",
                "name": "A2",
                "age": 200,
                "email": "A2@gmail.com",
                "posts": [
                    "67b995ca5fb615df79baf3d7"
                ],
                "createdAt": "2025-02-22T09:12:49.389Z",
                "__v": 1
            }
        ]
    },
    {
        "_id": 400,
        "userData": [
            {
                "_id": "67b9952f0c61e573305d474e",
                "name": "A4",
                "age": 400,
                "email": "A4@gmail.com",
                "posts": [
                    "67b995f45fb615df79baf3df",
                    "67b995fe5fb615df79baf3e3"
                ],
                "createdAt": "2025-02-22T09:13:19.856Z",
                "__v": 2
            }
        ]
    },
    {
        "_id": null,
        "userData": [
            {
                "_id": "67b98e1c77d0ce6b6064aaf9",
                "posts": [],
                "createdAt": "2025-02-22T08:43:08.493Z",
                "__v": 0
            }
        ]
    },
    {
        "_id": 100,
        "userData": [
            {
                "_id": "67b96e6199cfc307e88e8301",
                "name": "asds",
                "age": 100,
                "email": "asas@gmail.com",
                "posts": [],
                "createdAt": "2025-02-22T06:27:45.144Z",
                "__v": 0
            },
            {
                "_id": "67b96e9b99cfc307e88e8304",
                "name": "asds",
                "age": 100,
                "email": "asas@gmail.com",
                "posts": [],
                "createdAt": "2025-02-22T06:28:43.721Z",
                "__v": 0
            },
            {
                "_id": "67b995050c61e573305d4748",
                "name": "A1",
                "age": 100,
                "email": "A1@gmail.com",
                "posts": [
                    "67b995b75fb615df79baf3d3"
                ],
                "createdAt": "2025-02-22T09:12:37.886Z",
                "__v": 1
            }
        ]
    },
    {
        "_id": 600,
        "userData": [
            {
                "_id": "67b995430c61e573305d4752",
                "name": "A6",
                "age": 600,
                "email": "A6@gmail.com",
                "posts": [
                    "67b9961b5fb615df79baf3ef"
                ],
                "createdAt": "2025-02-22T09:13:39.026Z",
                "__v": 1
            }
        ]
    },
    {
        "_id": 700,
        "userData": [
            {
                "_id": "67b995500c61e573305d4754",
                "name": "A7",
                "age": 700,
                "email": "A7@gmail.com",
                "posts": [
                    "67b9962a5fb615df79baf3f3"
                ],
                "createdAt": "2025-02-22T09:13:52.044Z",
                "__v": 1
            }
        ]
    },
    {
        "_id": 800,
        "userData": [
            {
                "_id": "67b9955e0c61e573305d4756",
                "name": "A8",
                "age": 800,
                "email": "A8@gmail.com",
                "posts": [],
                "createdAt": "2025-02-22T09:14:06.302Z",
                "__v": 0
            }
        ]
    },
    {
        "_id": 300,
        "userData": [
            {
                "_id": "67b9951e0c61e573305d474c",
                "name": "A3",
                "age": 300,
                "email": "A3@gmail.com",
                "posts": [
                    "67b995e05fb615df79baf3db"
                ],
                "createdAt": "2025-02-22T09:13:02.535Z",
                "__v": 1
            }
        ]
    }
]
  */
  res.send(findUserByAggregrate);
});

// Lookup
// kisi bhi collection  me agarkoi dataek id hai toh aap uska datafill kr skte hbilkul populate ki tarah with = lookup
// app.get("/lookup", async (req, res) => {
//   let findUserByAggregrate = await postModel.find().populate("author");
//   res.send(findUserByAggregrate);
// });

app.get("/lookup_aggregate", async (req, res) => {
  try {
    let findUserByAggregrate = await postModel.aggregate([
      {
        $lookup: {
          from: "users", // Collection to join
          localField: "author", // Field in the "post" document (which references the "User")
          foreignField: "_id", // Field in the "users" collection that we're matching to
          as: "authordata", // The alias for the resulting array of joined data
        },
      },
    ]);
    res.send(findUserByAggregrate);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ error: "Error during lookup aggregation", details: err.message });
  }
  /*
  [
    {
        "_id": "67b98ffdc6b3112894f9a94c",
        "title": "title",
        "content": "content",
        "author": "67b98f7ac6b3112894f9a947",
        "createdAt": "2025-02-22T08:51:09.973Z",
        "__v": 0,
        "authordata": [
            {
                "_id": "67b98f7ac6b3112894f9a947",
                "name": "vinod",
                "age": 1000,
                "email": "vinod@gmail.com",
                "posts": [
                    "67b98ffdc6b3112894f9a94c"
                ],
                "createdAt": "2025-02-22T08:48:58.264Z",
                "__v": 1
            }
        ]
    },
    {
        "_id": "67b995b75fb615df79baf3d3",
        "title": "t10",
        "content": "t100",
        "author": "67b995050c61e573305d4748",
        "createdAt": "2025-02-22T09:15:35.446Z",
        "__v": 0,
        "authordata": [
            {
                "_id": "67b995050c61e573305d4748",
                "name": "A1",
                "age": 100,
                "email": "A1@gmail.com",
                "posts": [
                    "67b995b75fb615df79baf3d3"
                ],
                "createdAt": "2025-02-22T09:12:37.886Z",
                "__v": 1
            }
        ]
    },
    {
        "_id": "67b995ca5fb615df79baf3d7",
        "title": "t20",
        "content": "t200",
        "author": "67b995110c61e573305d474a",
        "createdAt": "2025-02-22T09:15:54.971Z",
        "__v": 0,
        "authordata": [
            {
                "_id": "67b995110c61e573305d474a",
                "name": "A2",
                "age": 200,
                "email": "A2@gmail.com",
                "posts": [
                    "67b995ca5fb615df79baf3d7"
                ],
                "createdAt": "2025-02-22T09:12:49.389Z",
                "__v": 1
            }
        ]
    },
    {
        "_id": "67b995e05fb615df79baf3db",
        "title": "t30",
        "content": "t300",
        "author": "67b9951e0c61e573305d474c",
        "createdAt": "2025-02-22T09:16:16.762Z",
        "__v": 0,
        "authordata": [
            {
                "_id": "67b9951e0c61e573305d474c",
                "name": "A3",
                "age": 300,
                "email": "A3@gmail.com",
                "posts": [
                    "67b995e05fb615df79baf3db"
                ],
                "createdAt": "2025-02-22T09:13:02.535Z",
                "__v": 1
            }
        ]
    },
    {
        "_id": "67b995f45fb615df79baf3df",
        "title": "t40",
        "content": "t4000",
        "author": "67b9952f0c61e573305d474e",
        "createdAt": "2025-02-22T09:16:36.915Z",
        "__v": 0,
        "authordata": [
            {
                "_id": "67b9952f0c61e573305d474e",
                "name": "A4",
                "age": 400,
                "email": "A4@gmail.com",
                "posts": [
                    "67b995f45fb615df79baf3df",
                    "67b995fe5fb615df79baf3e3"
                ],
                "createdAt": "2025-02-22T09:13:19.856Z",
                "__v": 2
            }
        ]
    },
    {
        "_id": "67b995fe5fb615df79baf3e3",
        "title": "t50",
        "content": "t5000",
        "author": "67b9952f0c61e573305d474e",
        "createdAt": "2025-02-22T09:16:46.915Z",
        "__v": 0,
        "authordata": [
            {
                "_id": "67b9952f0c61e573305d474e",
                "name": "A4",
                "age": 400,
                "email": "A4@gmail.com",
                "posts": [
                    "67b995f45fb615df79baf3df",
                    "67b995fe5fb615df79baf3e3"
                ],
                "createdAt": "2025-02-22T09:13:19.856Z",
                "__v": 2
            }
        ]
    },
    {
        "_id": "67b996075fb615df79baf3e7",
        "title": "t50",
        "content": "t5000",
        "author": "67b995390c61e573305d4750",
        "createdAt": "2025-02-22T09:16:55.003Z",
        "__v": 0,
        "authordata": [
            {
                "_id": "67b995390c61e573305d4750",
                "name": "A5",
                "age": 500,
                "email": "A5@gmail.com",
                "posts": [
                    "67b996075fb615df79baf3e7",
                    "67b996125fb615df79baf3eb"
                ],
                "createdAt": "2025-02-22T09:13:29.948Z",
                "__v": 2
            }
        ]
    },
    {
        "_id": "67b996125fb615df79baf3eb",
        "title": "t60",
        "content": "t600",
        "author": "67b995390c61e573305d4750",
        "createdAt": "2025-02-22T09:17:06.699Z",
        "__v": 0,
        "authordata": [
            {
                "_id": "67b995390c61e573305d4750",
                "name": "A5",
                "age": 500,
                "email": "A5@gmail.com",
                "posts": [
                    "67b996075fb615df79baf3e7",
                    "67b996125fb615df79baf3eb"
                ],
                "createdAt": "2025-02-22T09:13:29.948Z",
                "__v": 2
            }
        ]
    },
    {
        "_id": "67b9961b5fb615df79baf3ef",
        "title": "t60",
        "content": "t600",
        "author": "67b995430c61e573305d4752",
        "createdAt": "2025-02-22T09:17:15.537Z",
        "__v": 0,
        "authordata": [
            {
                "_id": "67b995430c61e573305d4752",
                "name": "A6",
                "age": 600,
                "email": "A6@gmail.com",
                "posts": [
                    "67b9961b5fb615df79baf3ef"
                ],
                "createdAt": "2025-02-22T09:13:39.026Z",
                "__v": 1
            }
        ]
    },
    {
        "_id": "67b9962a5fb615df79baf3f3",
        "title": "t70",
        "content": "t700",
        "author": "67b995500c61e573305d4754",
        "createdAt": "2025-02-22T09:17:30.582Z",
        "__v": 0,
        "authordata": [
            {
                "_id": "67b995500c61e573305d4754",
                "name": "A7",
                "age": 700,
                "email": "A7@gmail.com",
                "posts": [
                    "67b9962a5fb615df79baf3f3"
                ],
                "createdAt": "2025-02-22T09:13:52.044Z",
                "__v": 1
            }
        ]
    }
]
  */
});

app.get("/project", async (req, res) => {
  let findUserByAggregrate = await userModel.aggregate([
    // { $project: { name: 1, age: 1 } }, //jo chaiye uske aage 1 wrna kuch mt likho
    { $project: { fullname: "$name" } }, //name ko fullname
  ]);
  /*
[
    {
        "_id": "67b96e6199cfc307e88e8301",
        "name": "asds",
        "age": 100
    },
    {
        "_id": "67b96e9b99cfc307e88e8304",
        "name": "asds",
        "age": 100
    },
    {
        "_id": "67b96ea399cfc307e88e8306",
        "name": "asds",
        "age": 1000
    },
    {
        "_id": "67b98e1c77d0ce6b6064aaf9"
    },
    {
        "_id": "67b98f7ac6b3112894f9a947",
        "name": "vinod",
        "age": 1000
    },
    {
        "_id": "67b995050c61e573305d4748",
        "name": "A1",
        "age": 100
    },
    {
        "_id": "67b995110c61e573305d474a",
        "name": "A2",
        "age": 200
    },
    {
        "_id": "67b9951e0c61e573305d474c",
        "name": "A3",
        "age": 300
    },
    {
        "_id": "67b9952f0c61e573305d474e",
        "name": "A4",
        "age": 400
    },
    {
        "_id": "67b995390c61e573305d4750",
        "name": "A5",
        "age": 500
    },
    {
        "_id": "67b995430c61e573305d4752",
        "name": "A6",
        "age": 600
    },
    {
        "_id": "67b995500c61e573305d4754",
        "name": "A7",
        "age": 700
    },
    {
        "_id": "67b9955e0c61e573305d4756",
        "name": "A8",
        "age": 800
    },
    {
        "_id": "67b995680c61e573305d4758",
        "name": "A9",
        "age": 900
    },
    {
        "_id": "67b995740c61e573305d475a",
        "name": "A10",
        "age": 1000
    },
    {
        "_id": "67b9a829dd798520aaf99da3"
    }
]
*/
  res.send(findUserByAggregrate);
});

// unwind me agar a[1,2]
// toh pura database ek baar 1 ko lekr print then 2 ko lekark print hoga

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
