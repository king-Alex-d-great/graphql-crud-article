const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { connectDB } = require("./database");
const { RootQuery, RootMutation } = require("./queries");
const { GraphQLSchema } = require("graphql");
const { seedData } = require("./seeddata");

const app = express();

//Conect to mongoDB
connectDB();
seedData();

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation,
})

//pass the schema to our GraphQL middleware:
app.use(
    "/graphql",
    graphqlHTTP({
        graphiql: true,
        schema
    })
);

app.get("/", (_, res) =>
    res.status(200).send({
        message: "Welcome, graphQL genius!",
    })
);

app.listen(7010, () => {
    console.log("Listening on 7010");
});