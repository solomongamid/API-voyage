var express = require('express');
var request = require('request-promise');
var _ = require('lodash');

var router = express.Router();

router.post('/', async (req, res, next) => {
	const {body} = req;

	const authentification = req.get('authentification');
	if(!authentification) {
		return res.status(401).send({message: 'Il faut envoyer le token'});
	}
	
	if(!body.id_user || !body.id_flight){
		return res.status(400).send({message: 'Il manque des données'});
	}

	return res.status(201).send({reference: '123'});
});

module.exports = router;