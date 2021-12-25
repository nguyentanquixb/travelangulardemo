const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.hotel = require("./hotel.model")(sequelize, Sequelize);
db.hotelAmenities = require("./hotelAmenities.model")(sequelize, Sequelize);
db.hotelAssessment = require("./hotelAssessment.model.js")(sequelize, Sequelize);
db.imageAssess = require("./imageAssess.model")(sequelize, Sequelize);
db.kindOfRoom = require("./kindOfRoom.model")(sequelize, Sequelize);
db.roomAmenities = require("./roomAmenities.model")(sequelize, Sequelize);
db.hotelImage =require("./hotelImage.model")(sequelize, Sequelize);
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);



db.hotel.hasMany(db.hotelAssessment, { as: "hotelAssessment" });
db.hotelAssessment.belongsTo(db.hotel, {
  foreignKey: "hotelId",
  as: "hotels",
});

db.hotel.hasMany(db.hotelAmenities, { as: "hotelamenities" });
db.hotelAmenities.belongsTo(db.hotel, {
  foreignKey: "hotelId",
  as: "hotels",
});

db.hotel.hasMany(db.kindOfRoom, { as: "kindofrooms" });
db.kindOfRoom.belongsTo(db.hotel, {
  foreignKey: "hotelId",
  as: "hotels",
});

db.hotel.hasMany(db.roomAmenities, { as: "roomamenities" });
db.roomAmenities.belongsTo(db.hotel, {
  foreignKey: "hotelId",
  as: "hotels",
});

db.hotelAssessment.hasMany(db.imageAssess, { as: "imageAssess" });
db.imageAssess.belongsTo(db.hotelAssessment, {
  foreignKey: "hotelAssessmentId",
  as: "hotelAssessment",
});

db.hotel.hasMany(db.hotelImage, { as: "hotelImage" });
db.hotelImage.belongsTo(db.hotel, {
  foreignKey: "hotelId",
  as: "hotels",
});

db.user.hasOne(db.hotelAssessment, { foreignKey: 'fk_user', targetKey: 'id' });

//login
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.ROLES = ["user", "admin"];

module.exports = db;
