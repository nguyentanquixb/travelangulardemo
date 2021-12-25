const db = require("../models");
const Hotel = db.hotel;
const Op = db.Sequelize.Op;


  exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Tutorial
    const hotel = {
      name: req.body.name,
      address: req.body.address,
      price: req.body.price,
      star: req.body.star,
      introduce: req.body.introduce,
      img: req.body.img,
    };
  
    // Save Tutorial in the database
    Hotel.create(hotel)
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
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  var condition1 = name ? {  [Op.or]: [ {name: { [Op.like]: `%${name}%` }}, {star: { [Op.like]: `%${name}%` }} ]} : null;

  Hotel.findAll({ where: condition1,include: ["hotelamenities"],include:["kindofrooms"], })
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
exports.findOne = (req, res) => {
  const id = req.params.id;

  Hotel.findByPk(id,{include: ["hotelamenities","roomamenities","kindofrooms"] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};

