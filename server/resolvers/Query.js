const authController = require('../controllers/authController');
const User = require('../models/User.js');
const { GraphQLError } = require('graphql');
const codeMap = require('./statusCodes');

exports.Query = {
    users: async (parent, args, context) => {
        const response = await authController.protect(context.req, context.res);
        if (response.status == 'fail') {
            throw new GraphQLError(response.message, {
                extensions: {
                    code: codeMap[response.statusCode]
                        ? codeMap[response.statusCode]
                        : 'ERROR',
                    http: { status: response.statusCode },
                },
            });
        }
        return 'Hello protect is working';
    },
};
