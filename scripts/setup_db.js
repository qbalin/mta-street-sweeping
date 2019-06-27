const Sequelize = require('sequelize');

const sequelize = new Sequelize('street-sweeping', process.env.PGUSER || process.env.USER || 'quentin.balin', process.env.PGPASSWORD || '', {
  host: process.env.DATABASE_URL || 'localhost',
  dialect: 'postgres'
});


sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


const Zones = sequelize.define('zone', {
  // attributes
  line: {
    type: Sequelize.GEOMETRY('LINESTRING'),
    allowNull: false
  },
}, {
  // options
});

sequelize.sync();