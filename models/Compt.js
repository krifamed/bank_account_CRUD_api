module.exports = (sequelize, DataTypes) => {
    const Compt = sequelize.define('compts', {
        code : {
            type: DataTypes.STRING
        },
        email: {
            type : DataTypes.STRING
        },
        name: {
            type: DataTypes.STRING
        }
    }, {
      timestamps: false
    });
    return Compt;
  };