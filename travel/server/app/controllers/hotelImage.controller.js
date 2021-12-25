
const db = require("../models");
const hotelImage = db.hotelImage;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.img) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const hotelImage = {
        img: req.body.img,
        hotelId: req.body.hotelId,

    };
    hotelImage.create(hotelImage)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        });
};

exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { hotelId: { [Op.like]: `%${title}%` } } : null;

    hotelImage.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};
