const authController = require('../controllers/authController');
const User = require('../models/User.js');
const { GraphQLError } = require('graphql');
const codes = require('./statusCodes');
const codeMap = codes.code;

exports.Query = {
    users: async (parent, args, context) => {
        const response = await authController.protect(context.req, context.res);
        if (response.status == 'fail') {
            throw new GraphQLError(response.message, {
                extensions: {
                    code: codeMap[response.statuscode]
                        ? codeMap[response.statuscode]
                        : 'ERROR',
                    http: { status: response.statuscode },
                },
            });
        }
        return 'Hello protect is working';
    },
};
