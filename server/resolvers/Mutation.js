exports.Mutation = {
    addUser: (parent, args, context) => {
        return {
            id: 1,
            name: args.name,
            email: args.email,
        };
    },
};
