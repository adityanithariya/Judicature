const { ApolloServer } = require('apollo-server');
const { loadFilesSync } = require('@graphql-tools/load-files');
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');
const path = require('path');
const { connect } = require('./app');
const { connectFabric, executeTransaction } = require('./fabric');

const typeDefsArray = loadFilesSync(path.join(__dirname, './**/*.gql'));
const typeDefs = mergeTypeDefs(typeDefsArray);
const resolversArray = loadFilesSync(
    path.join(__dirname, './resolvers/**/*.js')
);
const resolvers = mergeResolvers(resolversArray);

const server = new ApolloServer({
    cors: {
        origin: '*',
        credentials: true,
    },
    typeDefs,
    resolvers,
    context: ({ req, res }) => {
        return { req, res };
    },
});

connect();
(async () => {
    await connectFabric();
    await executeTransaction();
})();

const port = process.env.PORT || 4000;
server.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
});
