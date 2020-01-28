const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const db = {};

const sequelize = new Sequelize(process.env.DB_URL_test);
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.compts = require('../models/Compt')(sequelize, Sequelize);
db.cards = require('../models/Card')(sequelize, Sequelize);

db.compts.hasMany(db.cards);
// db.compts.hasMany(db.cards, {onDelete: 'cascade', hooks: true, constraints: false});
db.cards.belongsTo(db.compts, {onDelete: 'cascade'});

module.exports = db;