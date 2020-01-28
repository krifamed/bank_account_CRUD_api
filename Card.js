const Sequelize = require('sequelize');
const db = require('./db');
const Compt = require('./Compt');

const Card = db.define('cards', {
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
    },
    compt_id: {
        type: Sequelize.UUIDV4
    }    
}, {timestamps : false});

Card.associate = (models)=>{
    Card.belongsTo(models.Compt, {foreignkey: 'compt_id', as : 'compt'});
}

module.exports = Compt; 