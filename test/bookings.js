'use strict';
const {expect} = require('chai');
const supertest = require('supertest');
const request = supertest('http://localhost:3000');

describe('Test des endpoints /bookings', function() {
	describe('création de reservation, POST /reservations', function() {
		it('si la requete ne content pas les identifiants de l\'utilisateur, on reçoit un 401', function() {
      return request
				.post('/bookings')
				.send({id_user: '123', id_flight: 'AF-444'})
				.expect(401);
    });

		it('avec un user identifié, mais pas de body, on reçoit un 400', function() {
      return request
				.post('/bookings')
				.set('authentification', 'MY_TOKEN')
				.send()
				.expect(400);
    });

    it('si la requete a toutes les infos, on reçoit un 201 et la reference', function() {
      return request
				.post('/bookings')
				.set('authentification', 'MY_TOKEN')
				.send({id_user: '123', id_flight: 'AF-123'})
				.expect(201)
				.then(response => {
					const body = response.body;
					expect(body).to.have.property('reference');
				});
    });
	});

  describe('consultation de reservation, GET /reservations/{id}', function() {
    it('si la reservation n\'existe pas, on reçoit un 404');

    it('si la requete ne content pas les identifiants de l\'utilisateur, on reçoit un 401');

    it('si la reservation existe et appartient à l\'utilisateur, on reçoit un 200');
	});

  describe('annulation de reservation, DELETE /reservations/{id}', function() {
		it('si la reservation n\'existe pas, on reçoit un 404');
    //etc etc etc
	});
});