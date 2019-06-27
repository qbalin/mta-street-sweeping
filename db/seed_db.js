const Zones = require('./schema.js').Zones;
const fs = require('fs');
const parse = require('csv-parse');

fs.readFile( __dirname + '/schedules.csv', function (err, data) {
  if (err) {
    throw err; 
  }

  const input = data.toString();

  parse(input, function(err, output) {
  	if (err) {
   	  throw err; 
  	}

  	const header = ['blockside','blocksweep','cnn','cnnrightle','corridor','district','fromhour','holidays','lf_fadd','lf_toadd','nhood','rt_fadd','rt_toadd','streetname','tohour','week1ofmon','week2ofmon','week3ofmon','week4ofmon','week5ofmon','weekday','zip_code','geometry','multigeom'];
  	const colCount = header.length;

  	output.forEach(row => {
  		const record = {};
  		for (let i = 0; i < colCount; i++) {
  			record[header[i]] = row[i];
  		}

  		record.geometry = parseLineString(record.geometry);
  		Zones.upsert(record);
  	});
  })
});

/*
* Transform "LINESTRING (-122.38946668820094 37.76975714301086, -122.38938718057578 37.76892532052666, -122.38930771587732 37.76881993751931)"
* into {
*  coordinates: [[-122.38946668820094, 37.76975714301086], [-122.38938718057578, 37.76892532052666], [-122.38930771587732, 37.76881993751931]],
*  type: "LineString"
* }
*/
function parseLineString(text) {
	return text.
		split('LINESTRING ').
		pop().
		slice(1, -1).
		split(', ').
		reduce((memo, val) => {
  			memo.coordinates.push(val.split(' ').map(parseFloat));
  			return memo;
		}, {type: 'LineString', 'coordinates':[]});
}
