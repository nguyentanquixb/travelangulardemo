
const db = require("../models");
const HotelAssessment = db.hotelAssessment;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.comment) {
      res.status(400).send({
          message: "Content can not be empty!"
      });
      return;
  }
  const hotelAssessment = {
    star: req.body.star,
    comment: req.body.comment,
    fk_user: req.body.fk_user,
    hotelId: req.body.hotelId,
    
    
  };
  HotelAssessment.create(hotelAssessment)
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

  HotelAssessment.findAll({ where: condition })
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
