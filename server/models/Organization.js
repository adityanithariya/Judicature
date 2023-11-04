const mongoose = require('mongoose');

const Category = {
    eVault: 'evault',
    forum: 'forum',
};

const orgSchema = mongoose.Schema({
    msp: {
        type: String,
        unique: true,
        required: true,
    },
    orgUrl: {
        type: String,
        unique: true,
        required: true,
    },
    orgName: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: Object.values(Category),
        required: true,
    },
    parent: {
        type: Object,
        default: null,
    },
    channelName: {
        type: String,
        default: null,
    },
});
const Org = mongoose.model('Org', orgSchema);
module.exports = Org;
module.exports.Category = Category;
