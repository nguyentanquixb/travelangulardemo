module.exports = app => {
    const hotelAssessment = require("../controllers/hotelAssessment.controller.js");

    var router = require("express").Router();

    router.get("/", hotelAssessment.findAll);
     router.post("/", hotelAssessment.create);

    app.use('/api/hotelAssessment', router);
};