const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const { Zones, sequelize } = require('./db/schema.js');

// Force https on prod
if (process.env.ENVIRONMENT === 'production') {
  app.use(function(req, res, next) {
    if ((req.get('X-Forwarded-Proto') !== 'https')) {
      res.redirect('https://' + req.get('Host') + req.url);
    } else {
      next();
    }
  });
}

app.use(express.static('public'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.get('/get-sweeping-info', function (req, res) {
	const { latitude, longitude } = req.query;
	const location = sequelize.literal(`ST_GeomFromText('POINT(${latitude} ${longitude})')`);
	Zones.findAll(
		{
			attributes: {
				include: [[sequelize.fn('ST_Distance', sequelize.col('geometry'), location), 'distance']]
			},
			limit: 2,
			order: [sequelize.fn('ST_Distance', sequelize.col('geometry'), location)]
		}
	).then(results =>
		res.send(JSON.stringify(results))
	);
})