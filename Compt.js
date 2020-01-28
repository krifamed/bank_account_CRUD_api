const Sequelize = require('sequelize');
const Card = require('./Card');
const db = require('./db');

const Compt = db.define('compts', {
    code : {
        type: Sequelize.STRING
    },
    email: {
        type : Sequelize.STRING
    },
    name: {
        type: Sequelize.STRING
    }
}, {timestamps : false});

Card.associate = (models)=>{
    Compt.hasMany(models.Card, {as : 'cards'});
}
// Compt.hasMany(Card, {as : 'cards'});


module.exports = Compt; 