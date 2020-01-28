module.exports = (sequelize, DataTypes) => {
    const Card = sequelize.define('cards', {
        code : {
            type: DataTypes.STRING
        },
        email: {
            type : DataTypes.STRING
        },
        owner: {
            type: DataTypes.STRING
        },
        expires : {
            type: DataTypes.DATE
        },
        comptId: {
            type: DataTypes.UUIDV4
        }    
    }, {timestamps : false});
    return Card;
  };