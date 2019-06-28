const Sequelize = require('sequelize');

let sequelize;
if (process.env.ENVIRONMENT === 'production') {
  sequelize = new Sequelize(process.env.DATABASE_URL);
} else {
  sequelize = new Sequelize('street-sweeping', 'quentin.balin', '', {
    host: process.env.DATABASE_URL || 'localhost',
    dialect: 'postgres'
  });
}

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
  geometry: {
    type: Sequelize.GEOMETRY('LINESTRING'),
    allowNull: false
  },
  blockside: {
    type: Sequelize.STRING,
    allowNull: false
  },
  blocksweep: {
    type: Sequelize.STRING,
    allowNull: false
  },
  cnn: {
    type: Sequelize.STRING,
    allowNull: false
  },
  cnnrightle: {
    type: Sequelize.STRING,
    allowNull: false
  },
  corridor: {
    type: Sequelize.STRING,
    allowNull: false
  },
  district: {
    type: Sequelize.STRING,
    allowNull: false
  },
  fromhour: {
    type: Sequelize.STRING,
    allowNull: false
  },
  holidays: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lf_fadd: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lf_toadd: {
    type: Sequelize.STRING,
    allowNull: false
  },
  nhood: {
    type: Sequelize.STRING,
    allowNull: false
  },
  rt_fadd: {
    type: Sequelize.STRING,
    allowNull: false
  },
  rt_toadd: {
    type: Sequelize.STRING,
    allowNull: false
  },
  streetname: {
    type: Sequelize.STRING,
    allowNull: false
  },
  tohour: {
    type: Sequelize.STRING,
    allowNull: false
  },
  week1ofmon: {
    type: Sequelize.STRING,
    allowNull: false
  },
  week2ofmon: {
    type: Sequelize.STRING,
    allowNull: false
  },
  week3ofmon: {
    type: Sequelize.STRING,
    allowNull: false
  },
  week4ofmon: {
    type: Sequelize.STRING,
    allowNull: false
  },
  week5ofmon: {
    type: Sequelize.STRING,
    allowNull: false
  },
  weekday: {
    type: Sequelize.STRING,
    allowNull: false
  },
  zip_code: {
    type: Sequelize.STRING,
    allowNull: false
  },
  weekday: {
    type: Sequelize.STRING,
    allowNull: false
  },
  multigeom: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
}, {
  // options
});

module.exports = {
  sequelize,
  Zones
}
