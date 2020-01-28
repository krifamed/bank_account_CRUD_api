const Sequelize = require('sequelize');
const db = require('./db');

const Card = db.define('cardss', {
    code : {
        type: Sequelize.STRING
    },
    email: {
        type : Sequelize.STRING
    },
    owner: {
        type: Sequelize.STRING
    },
    expires : {
        type: Sequelize.DATE
    }

}, {timestamps : false});

module.exports = Compt; 