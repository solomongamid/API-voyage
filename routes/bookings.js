var _ = require('lodash');
var express = require('express');
var data = require('../database');
var router = express.Router();

router.post('/', async (req, res) => {
	const {body} = req;

	const authentification = req.get('authentification');
	if (!authentification) {
		return res.status(401).send({message: 'Il faut envoyer le token'});
	}

	if (_.isEmpty(body)) {
		return res.status(400).send({message: 'Il manque de données'});
	}

	if (!body.id_user || !body.id_flight) {
		return res.status(400).send({message: 'Il manque de données'});
	}

	const reference = _.uniqueId('LPDW-VOL-');
	const {id_user, id_flight} = body;
	const booking = await data.Bookings.create({
		reference, id_flight, id_user
	});

	return res.status(201).send(booking);
});

router.get('/:reference', async (req, res) => {
	const authentification = req.get('authentification');
	if (!authentification) {
		return res.status(401).send({message: 'Il faut envoyer le token'});
	}

	const {reference} = req.params;
	const booking = await data.Bookings.findOne({ where: {reference} });
  if (!booking) {
		return res.status(404).send({message: 'La ref n\'existe pas'});
	}
	return res.send(booking.dataValues);
});

module.exports = router;