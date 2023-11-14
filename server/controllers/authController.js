const User = require('../models/User.js');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const sendEmail = require('../utils/email');
const welcomeMsg = require('../utils/welcomeMsg.json');

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

exports.signUp = async (req, res) => {
    const { username, email, password, role } = req.body.variables.user;
    let user = await User.findOne({ username });
    if (!user) {
        user = await User.findOne({ email });
    }
    if (user) {
        return {
            status: 'fail',
            message: 'email already exists',
            statusCode: 400,
        };
    }

    const { username: newusername, _id } = await User.create({
        username: username,
        email: email,
        password: password,
        role: `${role}contract`,
    });

    const message = `Dear ${newusername},\n${JSON.stringify(welcomeMsg)}`;
    if (process.env.NODE_ENV == 'prod') {
        await sendEmail({
            email: email,
            subject: 'Welcome to Judicature - Administration of Justice!',
            message,
        });
    } else {
        console.log(`user: ${newusername} created!`);
    }

    const token = signToken(_id);
    res.cookie('jwt', token, { httpOnly: false, secure: false });

    return {
        status: 'success',
        data: {
            username: newusername,
        },
        statusCode: 201,
    };
};

exports.logIn = async (req, res) => {
    const { identity, password } = req.body.variables.user;
    if (!password) {
        return {
            status: 'fail',
            message: 'Please provide email and password',
            statusCode: 400,
        };
    }
    let user = await User.findOne({ username: identity }).select('+password');
    if (!user) {
        user = await User.findOne({ email: identity }).select('+password');
    }
    if (!user || !(await user.authenticate(password, user.password))) {
        res.cookie('jwt', undefined, { httpOnly: false, secure: false });
        return {
            status: 'fail',
            message: 'Incorrect credentials',
            statusCode: 400,
        };
    }
    const token = signToken(user._id);
    req.user = user;
    console.log(token);
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

    req.user = currentUser;
    return {
        status: 'success',
        statusCode: 200,
    };
};

exports.forgotPassword = async (req, res) => {
    const { identity } = req.body.variables.user;

    // 1)Get user based on post email
    let user = await User.findOne({ username: identity });
    if (!user) {
        user = await User.findOne({ email: identity });
    }
    if (!user) {
        return {
            status: 'fail',
            message: `Email dosen't exists`,
            statusCode: 400,
        };
    }
    // 2)Generate random reset token
    const resetToken = user.createPasswordResetToken();
    await user.save();

    // 3)Send it to the user
    const message = `Forgot your password? Reset your password with token: http://localhost:3000/auth/forgot-password/${resetToken}, If not than ignore`;
    console.log(message);
    if (process.env.NODE_ENV == 'prod') {
        try {
            await sendEmail({
                email: user.email,
                subject: 'Your password reset token is valid for 20mins',
                message,
            });
            return {
                status: 'success',
                message: 'Token send to email',
                statusCode: 200,
            };
        } catch (err) {
            user.passwordResetToken = undefined;
            user.passwordResetExpires = undefined;
            await user.save({ validateBeforeSave: false });
            return {
                status: 'fail',
                message: `There was error sending email try again later ${err}`,
                statusCode: 400,
            };
        }
    } else {
        console.log(message);
        return {
            status: 'success',
            message: 'Token send to email',
            statusCode: 200,
        };
    }
};

exports.resetPassword = async (req, res, next) => {
    // 1)Get user based on user
    const { resetToken, password } = req.body.variables.user;
    const user = await User.findOne({
        passwordResetToken: resetToken,
        passwordResetExpires: { $gt: Date.now() },
    });

    // 2)If token as not expired and user is there than set new password
    if (!user) {
        return {
            status: 'fail',
            message: 'Token is invalid or expired',
            statusCode: 400,
        };
    }

    // 3)Update changed password porperty for user
    user.password = password;
    user.passwordResetToken = '';
    user.passwordResetExpires = 0;
    user.passwordChangedAt = Date.now();
    await user.save();

    // 4)Log the user and send jwt
    const token = signToken(user._id);
    req.user = user;
    res.cookie('jwt', token, { httpOnly: false, secure: false });

    return {
        status: 'success',
        message: 'Password has Changed',
        statusCode: 200,
    };
};

exports.updatePassword = async (req, res, next) => {
    const { currentPassword, newPassword } = req.body.variables.user;
    //1) Get user from collection
    const user = await User.findById(req.user.id).select('+password');

    //2)Check if entered current pass is correct
    if (!(await user.correctPassword(currentPassword, user.password))) {
        return {
            status: 'fail',
            message: 'Password entered is incorrect',
            statusCode: 400,
        };
    }

    //3)Update pass
    user.password = newPassword;
    user.passwordChangedAt = Date.now();
    await user.save();

    //4)sent jwt and logged in
    const token = signToken(user._id);
    res.cookie('jwt', token, { httpOnly: false, secure: false });

    return {
        status: 'success',
        message: 'Password has Changed',
        statusCode: 200,
    };
};
