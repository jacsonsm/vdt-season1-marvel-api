describe('POST /characters', function () {

  before(function () {

    cy.back2ThePast();
    cy.setToken()

    cy.request({
      method: 'DELETE',
      url: '/back2thepast/629813936791aa00161c9b5c'
    }).then(function (response) {
      expect(response.status).to.eql(200);
      cy.log(response.body.message)
    })
  })

  it('Cadastrar um personagem', function () {
    const character = {

      name: 'Wanda Maximoff',
      alias: 'Feiticeira Escarlate',
      team: ['Vingadores'],
      active: true
    }
    cy.request({
      method: 'POST',
      url: '/characters',
      body: character,
      headers: {
        Authorization: Cypress.env('token')
      }
    }).then(function (response) {
      expect(response.status).to.eql(201)
    });
  });
})

Cypress.Comands.add('setToken', function () {
  cy.request({
    method: 'POST',
    url: '/sessions',
    body: {
      email: 'jacsonmedeiros@gmail.com',
      password: 'qa-cademy'
    }
  }).then(function (response) {
    expect(response.status).to.eql(200);
    cy.log(response.body.token);
    Cypress.env('token', response.body.token);

  })
})

Cypress.Comands.add('back2Thepast', function () {

})