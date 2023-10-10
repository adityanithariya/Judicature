const authController = require('../controllers/authController');
const User = require('../models/User.js');
const { GraphQLError } = require('graphql');

exports.Query = {
    users: async (parent, args, context) => {
        const response = await authController.protect(context.req, context.res);
        if (response.status == 'fail') {
            throw new GraphQLError(response.message, {
                extensions: {
                    code: 'NOT_FOUND',
                    http: { status: response.statuscode }
                },
            });
        }
        return 'Hello protect is working';
    },
};
