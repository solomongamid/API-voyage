var express = require('express');
var request = require('request-promise');
var router = express.Router();

router.get('/', async (req, res, next) => {
	if(req.query && req.query.origin &&
     req.query.destination && req.query.date) {

    const _flights = await request('http://www.mocky.io/v2/5a9e6e603000007700234c11');
    const flights = JSON.parse(_flights)

    const results = flights.filter(flight => {
      return flight.origin === req.query.origin &&
        flight.destination === req.query.destination;
    })

		return res.send(results);
	}
	res.status(400).send('Missing data');
});

module.exports = router;