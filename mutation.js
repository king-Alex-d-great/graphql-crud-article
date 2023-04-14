const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInputObjectType
} = require("graphql");
const { OwnerType } = require("./queries");
const { Owner } = require("./database");

const OwnerInputType = new GraphQLInputObjectType({
    name: 'OwnerInput',
    description: 'Fields required to create a new owner',
    fields: () => ({
        name: { type: new GraphQLNonNull(GraphQLString) },
        _id: { type: new GraphQLNonNull(GraphQLString) }
    })
});

const AddOwnerMutation = {
    type: OwnerType,
    args: {
        input: { type: new GraphQLNonNull(OwnerInputType) }
    },
    resolve: async (_, { input }) => {
        return await Owner.create(input);
    }
};

const updateOwner = async (id, name) => {
    let owner = await Owner.findById(id);

    if (!owner) {
        throw new Error(`Could not find owner with id: ${id}`);
    }

    owner.name = name;
    return await owner.save();
};

const UpdateOwnerMutation = {
    type: OwnerType,
    args: {
        input: { type: new GraphQLNonNull(OwnerInputType) }
    },
    resolve: async (_, { input }) => {
        return await updateOwner(input._id, input.name);
    },
};

const DeleteOwnerMutation = {
    type: OwnerType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve: async (_, { id }) => {
        return await Owner.findByIdAndDelete(id);
    }
}

exports.RootMutation = new GraphQLObjectType({
    name: 'RootMutation',
    description: 'The root mutation',
    fields: () => ({
        addOwner: AddOwnerMutation,
        updateOwner: UpdateOwnerMutation,
        deleteOwner: DeleteOwnerMutation
    })
});