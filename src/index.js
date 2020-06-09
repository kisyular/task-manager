const express = require('express');
require('../config/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require("multer");
const connectDB = require('../config/mongoose.js');


const app = express();
const port = process.env.PORT || 3000;


// Connect Database
connectDB();


// UNCOMMENT FOR SITE DURING MAINTENANCE
// app.use((req, res, next) => {
//     console.log(req.method, req.path);
//     res.status(503).send("Site is currently under maintenance mode");
//     //next();
// });

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

// const bcryptFunction = async () => {
//     const password = 'Red12345!';
//     const hashedPassword = await bcrypt.hash(password, 8);
//
//     console.log(password);
//     console.log(hashedPassword);
//
//     const isMatch = await bcrypt.compare('red12345!', hashedPassword);
//     console.log(isMatch)
// };
// bcryptFunction();
//
// const jwtFunction = async () => {
//     const token = jwt.sign({_id: "1236yt"}, "thisismynewcourse", {expiresIn: 3600});
//     console.log(token)
//     const data = jwt.verify(token, "thisismynewcourse");
//     console.log(data)
// };
//
// jwtFunction();

// const Task = require("./models/task");
// const User = require("./models/user");

// const main = async () => {
//     const task = await Task.findById('5e6a36d5b4e50f2d68aecef2');
//     await task.populate('owner').execPopulate();
//     // console.log(task)
//
//     const user = await User.findById('5e6a36bfb4e50f2d68aecef0');
//     await user.populate('tasks').execPopulate();
//     // console.log(user.tasks);
// };
//
// main();

const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(doc|docx)$/)) {
            return cb(new Error('Please upload a Word document'))
        }

        cb(undefined, true)
    }
});

app.post('/upload', upload.single('upload'), (req, res) => {
    res.send()
}, (error, req, res, next) => {
    res.status(400).send(error.message)
});


app.listen(port, () => {
    console.log('Server is up on port ' + port)
});