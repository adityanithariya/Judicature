const User = require('../models/User.js');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

exports.signUp = async (req, res) => {
    const userDetails = req.body.variables.user;
    const newUser = await User.create({
        username: userDetails.username,
        password: userDetails.password,
    });

    const token = signToken(newUser._id);
    res.cookie('jwt', token, { httpOnly: false, secure: false });
    return {
        status: 'success',
        data: {
            username: newUser.username,
        },
        statusCode: 201,
    };
};

exports.logIn = async (req, res) => {
    const userDetails = req.body.variables.user;
    if (!userDetails.identity || !userDetails.password) {
        return {
            status: 'fail',
            message: 'Please provide email and password',
            statusCode: 400,
        };
    }
    let user = await User.findOne({ username: userDetails.identity }).select(
        '+password'
    );
    if (
        !user ||
        !(await user.authenticate(userDetails.password, user.password))
    ) {
        res.cookie('jwt', undefined, { httpOnly: false, secure: false });
        return {
            status: 'fail',
            message: 'Incorrect email and password',
            statusCode: 400,
        };
    }
    const token = signToken(user._id);
    req.user = user;
    res.cookie('jwt', token, { httpOnly: false, secure: false });

    return {
        status: 'success',
        data: {
            username: user.username,
        },
        statusCode: 200,
    };
};

exports.protect = async (req, res) => {
    let token;
    if (req.headers.cookie) {
        token = req.headers.cookie.split('jwt=')[1];
    }

    if (!token) {
        return {
            status: 'fail',
            message: 'You are not loged in please login',
            statusCode: 400,
        };
    }

    //2)Verfication token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    //3)Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        return {
            status: 'fail',
            message: 'No user exists',
            statusCode: 400,
        };
    }

    //4)Check if user changed password after jwt is issued
    // if (currentUser.changedPasswordAfter(decoded.iat)) {
    //   return {
    //     status: "fail",
    //     message: "Password Changed after token issued",
    //     statusCode: 400,
    //   };
    // }

    req.user = currentUser;
    return {
        status: 'success',
        statusCode: 200,
    };
};
