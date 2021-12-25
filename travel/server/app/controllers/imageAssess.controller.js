
const db = require("../models");
const ImageAssess = db.imageAssess;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.img) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const imageAssess = {
        img: req.body.img,
        hotelAssessmentId: req.body.hotelAssessmentId,

    };
    ImageAssess.create(imageAssess)
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
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    ImageAssess.findAll({ where: condition })
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
