const Sequelize = require('sequelize');
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

module.exports = Compt; 