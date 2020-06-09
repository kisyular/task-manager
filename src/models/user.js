const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('../models/task.js');
const config = require('config');
// const SECRET_OR_PUBLIC_KEY = config.get('SECRET_OR_PUBLIC_KEY');
const SECRET_OR_PUBLIC_KEY = process.env.SECRET_OR_PUBLIC_KEY

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        match: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    },
    tokens: [{
        token: {
            required: true,
            type: String
        }
    }],
    avatar: { type: Buffer }
}, {
    timestamps: true
});

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
});

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
};

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Unable to verify login details')
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Unable to verify login details')
    }
    return user
};


userSchema.statics.findUserByEmail = async (email) => {
    const user = await User.findOne({ email });
    if (user) {
        throw new Error('User already exists')
    }
    return user
};

userSchema.methods.generateAuthToken = async function (){
    const user = this;
    const token =jwt.sign({_id: user._id.toString()}, SECRET_OR_PUBLIC_KEY);
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token
};

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
});


// userSchema.pre('validate', function(next) {
//     const user = this;
//     const string = "foo hello";
//     const substring = "o1";
//
//     console.log((substring.indexOf(substring) !== -1 && substring.indexOf(substring) !== -1));
//     // console.log(user.password.toLowerCase().indexOf(user.name) > -1)
//
//     if (user.password.toLowerCase().contain(user.name)) {
//         this.invalidate('password', 'Password cannot contain your name');
//     }
//
//     next();
// });

userSchema.pre('remove', async function (next) {
    const user = this;
    await Task.deleteMany({owner: user._id});
    next();
});
const User = mongoose.model('User', userSchema);

module.exports = User;