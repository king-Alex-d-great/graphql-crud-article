const { Land, Owner } = require("./database");

const owners = [{
    name: "Ada Doe",
    _id: "ada@mail.com"
}, {
    name: "Ozioma Doe",
    _id: "ozioma@mail.com"
}];

const lands = [
    {
        _id: 1,
        location: "Uyo",
        sizeInFeet: "100",
        ownerId: "ozioma@mail.com",
    },
    {
        _id: 2,
        location: "Lagos",
        sizeInFeet: "200",
        ownerId: "ozioma@mail.com",
    }, {
        _id: 3,
        location: "Enugu",
        sizeInFeet: "300",
        ownerId: "ozioma@mail.com",
    }, {
        _id: 4,
        location: "Imo",
        sizeInFeet: "400",
        ownerId: "ada@mail.com",
    },
    {
        _id: 5,
        location: "Oyo",
        sizeInFeet: "500",
        ownerId: "ada@mail.com",
    },
]

exports.seedData = async () => {
    const ONE = 1;
    if ((await Owner.find()).length < ONE) {
        owners.forEach(async owner => {
            await (await Owner.create(owner)).save();
        });
    }

    if ((await Land.find()).length < ONE) {
        lands.forEach(async land => {
            await (await Land.create(land)).save();
        });
    }
}