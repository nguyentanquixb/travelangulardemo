module.exports = (sequelize, DataTypes) => {
    const hotelImage = sequelize.define("hotelImage", {
  
    img: {
        type: DataTypes.STRING
      }
    });
    return hotelImage;
  };