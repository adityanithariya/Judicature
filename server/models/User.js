const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, 'Username is required'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 4,
        select: false,
    },
    passwordChangedAt: {
        default: 0,
        type: Number,
    },
    passwordResetToken: {
        default: '',
        type: String,
    },
    passwordResetExpires: {
        default: 0,
        type: Number,
    },
    active: {
        type: Boolean,
        default: true,
        select: false,
    },
});

userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.authenticate = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = resetToken;
    this.passwordResetExpires = Date.now() + 20 * 60 * 1000;
    return resetToken;
};

userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
