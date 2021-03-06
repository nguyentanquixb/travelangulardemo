const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); 

const app = express();

var corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync();
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/hotel.routes")(app);
require("./app/routes/hotelAmenities.routes")(app);
require("./app/routes/hotelAssessment.routes")(app);
require("./app/routes/imageAssess.routes")(app);
require("./app/routes/kindOfRoom.routes")(app);
require("./app/routes/roomAmenities.routes")(app);
require("./app/routes/hotelImage.routes")(app);
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);




// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
