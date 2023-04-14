const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLInt
} = require("graphql");
const { Land, Owner } = require("./database");

const LandType = new GraphQLObjectType({
    name: "Land",
    description: "A property owned by a landlord",
    fields: () => ({
        id: { type: GraphQLID },
        location: { type: GraphQLString },
        sizeInFeet: { type: GraphQLInt },
        ownerId: { type: GraphQLID },
        owner: {
            type: OwnerType,
            resolve: (land) => {
                return Owner.findById(land.ownerId);
            },
        },
    }),
});

const OwnerType = new GraphQLObjectType({
    name: "Owner",
    description: "An owner of a property",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        lands:
        {
            type: new GraphQLList(LandType),
            resolve: async (owner) => {
                return Land.find({}).then(lands => {
                    return lands.filter(land => land.ownerId === owner.id);
                });
            }
        },
    }),
});

exports.RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    description: "The Root Query",
    fields: () => ({
        lands: {
            type: new GraphQLList(LandType),
            description: "A list of lands",
            resolve: async () => {
                return await Land.find();
            },
        },
        owners: {
            type: new GraphQLList(OwnerType),
            description: "A list of owners",
            resolve: async () => {
                return await Owner.find();
            },
        },
        land: {
            type: LandType,
            description: "A single land",
            args: {
                id: {
                    type: GraphQLID,
                },
            },
            resolve: async (_, args) => {
                return await Land.findById(args.id);
            },
        },
        owner: {
            type: OwnerType,
            description: "A single owner",
            args: {
                id: {
                    type: GraphQLID,
                },
            },
            resolve: async (_, args) => {
                return await Owner.findById(args.id);
            },
        }
    }),
});